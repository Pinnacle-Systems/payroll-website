import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/constants.js";
import { sendMail } from "./mail.service.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const generateToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

const safeUser = (user) => ({
  id: user.id,
  name: user.name,
  companyName: user.companyName,
  gst: user.gst,
  email: user.email,
  mobile: user.mobile,
  role: user.role,
});

function validateEmail(email) {
  if (!email || !email.trim())
    throw Object.assign(new Error("Email is required"), { status: 400 });
  if (!EMAIL_RE.test(email.trim()))
    throw Object.assign(new Error("Invalid email format"), { status: 400 });
}

function validatePassword(password) {
  if (!password)
    throw Object.assign(new Error("Password is required"), { status: 400 });
  if (password.length < 8)
    throw Object.assign(new Error("Password must be at least 8 characters"), {
      status: 400,
    });
}

export const requestOtp = async (email) => {
  validateEmail(email);
  const normalizedEmail = email.trim().toLowerCase();
  
  const exists = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  
  if (exists) {
    throw Object.assign(new Error("Email already registered"), { status: 409 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.otp.upsert({
    where: { email: normalizedEmail },
    update: { otp, createdAt: new Date() },
    create: { email: normalizedEmail, otp },
  });

  const mailSent = await sendMail({
    to: normalizedEmail,
    OTP: otp
  });

  if (!mailSent) {
    throw Object.assign(new Error("Failed to send OTP email"), { status: 500 });
  }
  
  return { message: "OTP sent successfully" };
};

export const registerUser = async ({
  name,
  email,
  password,
  mobile,
  companyName,
  gst,
  otp,
}) => {
  if (!name || !name.trim())
    throw Object.assign(new Error("Name is required"), { status: 400 });
  validateEmail(email);
  validatePassword(password);
  
  if (!otp) {
    throw Object.assign(new Error("OTP is required"), { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const exists = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (exists)
    throw Object.assign(new Error("Email already registered"), { status: 409 });

  const otpRecord = await prisma.otp.findUnique({
    where: { email: normalizedEmail }
  });

  if (!otpRecord || otpRecord.otp !== otp.toString().trim()) {
    throw Object.assign(new Error("Invalid OTP"), { status: 400 });
  }

  // Optional: check OTP expiry (e.g., 10 minutes)
  const diffMins = (new Date() - new Date(otpRecord.createdAt)) / 60000;
  if (diffMins > 10) {
    throw Object.assign(new Error("OTP has expired"), { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      password: hashed,
      mobile: mobile || null,
      companyName: companyName?.trim() || null,
      gst: gst?.trim() || null,
    },
  });

  // Clear OTP
  await prisma.otp.delete({ where: { email: normalizedEmail } });

  return { token: generateToken(user), user: safeUser(user) };
};

export const loginUser = async ({ email, password }) => {
  validateEmail(email);
  if (!password)
    throw Object.assign(new Error("Password is required"), { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (!user)
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });

  return { token: generateToken(user), user: safeUser(user) };
};

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      companyName: true,
      gst: true,
      email: true,
      mobile: true,
      role: true,
      createdAt: true,
    },
  });
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return user;
};

export const updateUser = async (
  id,
  { name, companyName, email, gst, mobile, password },
) => {
  if (!name || !name.trim())
    throw Object.assign(new Error("Name is required"), { status: 400 });
  validateEmail(email);

  const existingUser = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  if (!existingUser)
    throw Object.assign(new Error("User not found"), { status: 404 });

  const emailConflict = await prisma.user.findFirst({
    where: { email: email.trim().toLowerCase(), NOT: { id: Number(id) } },
  });
  if (emailConflict)
    throw Object.assign(new Error("Email is already used by another account"), {
      status: 409,
    });

  const updateData = {
    name: name.trim(),
    companyName: companyName?.trim() || null,
    email: email.trim().toLowerCase(),
    mobile: mobile || null,
    gst: gst?.trim() || null,
  };

  if (password) {
    validatePassword(password);
    updateData.password = await bcrypt.hash(password, 10);
  }

  const updated = await prisma.user.update({
    where: { id: Number(id) },
    data: updateData,
  });
  return safeUser(updated);
};

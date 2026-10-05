import {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  requestOtp,
} from "../services/auth.service.js";

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await requestOtp(email);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const result = await updateUser(req.user.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

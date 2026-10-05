import prisma from "../config/db.js";

// Users
export const fetchUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      companyName: true,
    },
    orderBy: { id: "desc" },
  });
};

export const fetchUserPlan = async (userId) => {
  return await prisma.subscription.findMany({
    where: { userId: Number(userId) },
    include: {
      PayPeriod: true,
      PayPeriodPrice: {
        include: {
          payPeriodContents: true,
        },
      },
      Features: true,
      User: {
        select: {
          name: true,
          email: true,
          companyName: true,
        },
      },
    },
    orderBy: { id: "desc" },
  });
};

// PayPeriods
export const fetchPayperiods = async () => {
  return await prisma.payPeriod.findMany({
    include: {
      PayPeriodPrice: {
        include: {
          Features: true,
          payPeriodContents: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });
};

export const addPayperiod = async (data) => {
  const { name, status, userId, PayPeriodPrice, validityDays } = data;
  return await prisma.payPeriod.create({
    data: {
      name,
      validityDays: Number(validityDays) || 30,
      status: status === "Active" ? true : status === true,
      userId,
      PayPeriodPrice: {
        create: PayPeriodPrice.map((p) => ({
          price: Number(p.price),
          featureId: Number(p.featureId),
          status: p.status === "Active" ? true : p.status === true,
          payPeriodContents: {
            create:
              p.payPeriodContents
                ?.map((c) => ({
                  name: c.name,
                }))
                .filter((c) => c.name.trim() !== "") || [],
          },
        })),
      },
    },
  });
};

export const modifyPayperiod = async (id, data) => {
  const { name, status, PayPeriodPrice, validityDays } = data;
  return await prisma.payPeriod.update({
    where: { id: Number(id) },
    data: {
      name,
      validityDays: Number(validityDays) || 30,
      status: status === "Active" ? true : status === true,
      PayPeriodPrice: {
        deleteMany: {},
        create: PayPeriodPrice.map((p) => ({
          price: Number(p.price),
          featureId: Number(p.featureId),
          status: p.status === "Active" ? true : p.status === true,
          payPeriodContents: {
            create:
              p.payPeriodContents
                ?.map((c) => ({
                  name: c.name,
                }))
                .filter((c) => c.name.trim() !== "") || [],
          },
        })),
      },
    },
  });
};

export const removePayperiod = async (id) => {
  return await prisma.payPeriod.delete({
    where: { id: Number(id) },
  });
};

// Features
export const fetchFeatures = async () => {
  return await prisma.features.findMany({
    orderBy: { id: "asc" },
  });
};

export const addFeature = async (data) => {
  const { name, description, status, userId } = data;
  return await prisma.features.create({
    data: {
      name,
      description,
      status: status === "Active" ? true : status === true,
      userId,
    },
  });
};

export const modifyFeature = async (id, data) => {
  const { name, description, status } = data;
  return await prisma.features.update({
    where: { id: Number(id) },
    data: {
      name,
      description,
      status: status === "Active" ? true : status === true,
    },
  });
};

export const removeFeature = async (id) => {
  return await prisma.features.delete({
    where: { id: Number(id) },
  });
};

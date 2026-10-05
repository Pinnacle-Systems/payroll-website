import * as adminService from "../services/admin.service.js";

// Users
export const getUsers = async (req, res) => {
  try {
    const users = await adminService.fetchUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUserPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriptions = await adminService.fetchUserPlan(id);
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user plan" });
  }
};

// PayPeriods
export const getPayperiods = async (req, res) => {
  try {
    const payperiods = await adminService.fetchPayperiods();
    res.json(payperiods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payperiods" });
  }
};

export const createPayperiod = async (req, res) => {
  try {
    const { name, status, PayPeriodPrice } = req.body;
    const payperiod = await adminService.addPayperiod({
      name,
      status,
      PayPeriodPrice: PayPeriodPrice || [],
      userId: req.user.id
    });
    res.status(201).json(payperiod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create payperiod" });
  }
};

export const updatePayperiod = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, PayPeriodPrice } = req.body;
    const payperiod = await adminService.modifyPayperiod(id, {
      name,
      status,
      PayPeriodPrice: PayPeriodPrice || []
    });
    res.json(payperiod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update payperiod" });
  }
};

export const deletePayperiod = async (req, res) => {
  try {
    const { id } = req.params;
    await adminService.removePayperiod(id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete payperiod" });
  }
};

// Features
export const getFeatures = async (req, res) => {
  try {
    const features = await adminService.fetchFeatures();
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch features" });
  }
};

export const createFeature = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const feature = await adminService.addFeature({
      name,
      description,
      status,
      userId: req.user.id
    });
    res.status(201).json(feature);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create feature" });
  }
};

export const updateFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const feature = await adminService.modifyFeature(id, {
      name,
      description,
      status
    });
    res.json(feature);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update feature" });
  }
};

export const deleteFeature = async (req, res) => {
  try {
    const { id } = req.params;
    await adminService.removeFeature(id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete feature" });
  }
};

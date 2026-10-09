import Razorpay from "razorpay";
import crypto from "crypto";
import prisma from "../config/db.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_xxxx",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "xxxx",
});

export const createOrder = async (req, res) => {
  try {
    const { payPeriodId, payPeriodPriceId, featureId } = req.body;
    const userId = req.user.id;

    // Fetch the actual price from the database to prevent client-side manipulation
    const payPeriodPrice = await prisma.payPeriodPrice.findUnique({
      where: { id: payPeriodPriceId },
    });

    if (!payPeriodPrice) {
      return res.status(404).json({ message: "Invalid pricing plan selected" });
    }

    const amount = payPeriodPrice.price;

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        payPeriodId,
        payPeriodPriceId,
        featureId,
        amount,
        status: "Pending",
      },
    });

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_order_${subscription.id}`,
    };

    const order = await razorpay.orders.create(options);

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { razorpayOrderId: order.id },
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      subscriptionId: subscription.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, subscriptionId } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "xxxx")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Fetch the subscription to get the PayPeriod and its validityDays
      const subscription = await prisma.subscription.findUnique({
        where: { id: subscriptionId },
        include: { PayPeriod: true }
      });

      const validityDays = subscription?.PayPeriod?.validityDays || 30;
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + validityDays);

      await prisma.subscription.update({
        where: { id: subscriptionId },
        data: {
          razorpayPaymentId: razorpay_payment_id,
          status: "Success",
          startDate,
          endDate,
        },
      });
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      await prisma.subscription.update({
        where: { id: subscriptionId },
        data: { status: "Failed" },
      });
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getMyPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      include: {
        PayPeriod: true,
        PayPeriodPrice: {
          include: {
            payPeriodContents: true
          }
        },
        Features: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import prisma from "../config/db.js";

export const getPublicPricing = async (req, res) => {
  try {
    const payperiods = await prisma.payPeriod.findMany({
      where: { status: true },
      include: {
        PayPeriodPrice: {
          where: { 
            status: true,
            Features: {
              status: true
            }
          },
          include: {
            Features: true,
            payPeriodContents: true
          }
        }
      },
      orderBy: { id: 'asc' }
    });
    res.json(payperiods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch pricing data" });
  }
};

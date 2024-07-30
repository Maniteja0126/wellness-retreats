const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createBooking = async (req, res) => {
  try {
    const {
      userId,
      retreatId,
      userName,
      userEmail,
      userPhone,
      paymentDetails,
    } = req.body;
    if (
      !userId ||
      !retreatId ||
      !userName ||
      !userEmail ||
      !userPhone ||
      !paymentDetails
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingUser = await prisma.booking.findFirst({
      where: {
        AND: [
          { userId: userId },
          { retreatId: retreatId }
        ]
      }
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "The retreat has been booked by the User." });
    }
    const booking = await prisma.booking.create({
      data: {
        userId,
        retreatId,
        userName,
        userEmail,
        userPhone,
        paymentDetails: JSON.stringify(paymentDetails),
        bookingDate: new Date(Date.now()),
      },
    });
    return res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      
      return res.status(400).json({ message: "The retreat has already been booked by this user." });
    }
    console.log("Error from booking controller : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createBooking };

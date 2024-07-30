-- CreateTable
CREATE TABLE "Retreat" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "tag" TEXT[],

    CONSTRAINT "Retreat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPhone" TEXT NOT NULL,
    "retreatId" INTEGER NOT NULL,
    "paymentDetails" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_retreatId_key" ON "Booking"("userId", "retreatId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_retreatId_fkey" FOREIGN KEY ("retreatId") REFERENCES "Retreat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

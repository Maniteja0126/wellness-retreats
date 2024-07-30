/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  CalendarCheck,
  Euro,
  LocateIcon,
  MountainIcon,
} from "lucide-react";
import PaymentForm from "../components/PaymentForm";
import { Retreat } from "@/types";
import {  useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from "@/components/ui/";

const PaymentModal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const retreat = location.state?.retreat as Retreat;
  const BOOKING_URL = import.meta.env.VITE_BOOKING_API;

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);

  const handleDummyPaymentDetails = () => {
    setPaymentDetails({
      cardNumber: `4111 1111 1111 ${Math.floor(1000 + Math.random() * 9000)}`,
      expiryDate: `${Math.floor(Math.random() * 12 + 1)
        .toString()
        .padStart(2, "0")}/25`,
      cvv: Math.floor(100 + Math.random() * 900).toString(),
      name: "Mani Teja",
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      await axios.post(BOOKING_URL, {
        userId: 2,
        retreatId: retreat.id,
        userName,
        userEmail,
        userPhone,
        paymentDetails,
      });
      setIsPaymentSuccess(true);
      toast.success(`Booking successful!`);
    } catch (error) {
      toast.error("Booking Failed. Please try again");
    } finally {
      setLoading(false);
    }
  };
  const handleRedirect = () => {
    navigate("/");
  };

  const formattedDate = new Date(retreat.date * 1000).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="container gap-1">
      <div className="flex mt-5 gap-3">
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <img
                src={retreat.image}
                alt={retreat.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <CardTitle>{retreat.title}</CardTitle>
              <CardDescription>{retreat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex-col gap-1">
                <div className="flex gap-1">
                  <LocateIcon size={18} />
                  <p>{retreat.location}</p>
                </div>
                <div className="flex gap-1">
                  <CalendarCheck size={18} />
                  <p>{formattedDate}</p>
                </div>
                <div className="flex gap-1">
                  <MountainIcon size={18} />
                  <p>{retreat.type}</p>
                </div>
                <div className="flex gap-1">
                  <Euro size={18} />
                  <p>{retreat.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <form>
                <label>
                  Name:
                  <input
                    type="text"
                    className="border-b mb-2 bg-transparent ml-2 focus:outline-slate-300"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </label>{" "}
                <br />
                <label>
                  Email:
                  <input
                    type="email"
                    value={userEmail}
                    className="border-b mb-2 bg-transparent ml-2 focus:outline-slate-300"
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Phone:
                  <input
                    type="tel"
                    value={userPhone}
                    className="border-b mb-2 bg-transparent ml-2 focus:outline-slate-300"
                    onChange={(e) => setUserPhone(e.target.value)}
                  />
                </label>
                <br />
                <div>
                  <PaymentForm
                    paymentDetails={paymentDetails}
                    setPaymentDetails={setPaymentDetails}
                    handleDummyPaymentDetails={handleDummyPaymentDetails}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                onClick={isPaymentSuccess ? handleRedirect : handlePayment}
                disabled={loading}
                className="w-full"
              >
                {loading
                  ? "Processing..."
                  : isPaymentSuccess
                  ? "Continue To Home Page"
                  : "Buy"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

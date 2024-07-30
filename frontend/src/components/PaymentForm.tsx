import React, { useState, ChangeEvent, FocusEvent } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

interface PaymentFormProps {
  paymentDetails: PaymentDetails;
  setPaymentDetails: React.Dispatch<React.SetStateAction<PaymentDetails>>;
  handleDummyPaymentDetails: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentDetails,
  setPaymentDetails,
  handleDummyPaymentDetails,
}) => {
  const [focus, setFocus] = useState<Focused | undefined>(undefined);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    setFocus(evt.target.name as Focused);
  };

  return (
    <div>
      <div className="flex p-5">
        <Cards
          number={paymentDetails.cardNumber}
          expiry={paymentDetails.expiryDate}
          cvc={paymentDetails.cvv}
          name={paymentDetails.name}
          focused={focus}
        />
        <div>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="border-b mb-2 bg-transparent ml-2"
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            value={paymentDetails.expiryDate}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="border-b mb-2 bg-transparent ml-2"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVC"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="border-b mb-2 bg-transparent ml-2"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={paymentDetails.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="border-b mb-2 bg-transparent ml-2"
          />
          <button
            type="button"
            onClick={handleDummyPaymentDetails}
            className="ml-2 mt-0.5 bg-slate-500 rounded-md p-1.5"
          >
            Get Random Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;

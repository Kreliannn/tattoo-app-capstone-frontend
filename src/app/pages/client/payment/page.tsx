"use client";

import { useSearchParams } from "next/navigation";
import axiosInstance from "@/app/utils/axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { accountInterface } from "@/app/types/accounts.type";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  

  const sender = searchParams.get("sender");
  const receiver = searchParams.get("receiver");
  const bookingId = searchParams.get("bookingId");
  const amount = searchParams.get("amount");
  const refId = searchParams.get("refId");

  const { data: receiverInfo } = useQuery({
    queryKey: ['receiver_info'],
    queryFn: async (): Promise<accountInterface> => {
      const response = await axiosInstance.get(`/account/${receiver}`);
      return response.data;
    }
  });



 
  const paymentMutation = useMutation({
    mutationFn : (data : { sender : string, receiver : string, bookingId : string, amount : number, refId : string}) => axiosInstance.post("/booking/payment", data),
    onSuccess : (response) => {
      console.log("sucesssss")
    }, 
  })

  const [hasCalled, setHasCalled] = useState(false);

  useEffect(() => {
    if(sender && receiver && bookingId &&  amount  && !hasCalled && refId){
      paymentMutation.mutate({sender, receiver, bookingId,  amount : Number(amount), refId  })
      setHasCalled(true);
    }
  }, [])

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        
        {/* Success Icon */}
        <CheckCircle className="w-20 h-20 text-green-600 mb-6" />
  
        {/* Main message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully.
        </p>
  
        {/* Receiver info */}
        <p className="text-gray-500 mb-2 text-lg">You have sent money to:</p>
        <div className="flex flex-col items-center mb-6">
          <img
            src={receiverInfo?.profile || "/default-avatar.png"}
            alt={receiverInfo?.name || "Receiver"}
            className="w-24 h-24 rounded-full mb-3 object-cover"
          />
          <h2 className="text-xl font-semibold text-gray-800">{receiverInfo?.name}</h2>
          <p className="text-gray-700 mt-1 text-lg">
            Amount Sent: <span className="font-bold">₱{amount}</span>
          </p>
        </div>
  
        {/* Additional text */}
        <p className="text-gray-500 mb-6 px-4">
          Thank you for your payment. The receiver has been notified and your transaction is complete.
        </p>
  
        {/* Black button */}
        <button
          onClick={() => window.location.href = "/pages/client/bookings"}
          className="w-full max-w-xs bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Go to Bookings
        </button>
      </div>
  );
}

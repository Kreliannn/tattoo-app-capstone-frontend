"use client";

import axiosInstance from "@/app/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { transactionInterface } from "@/app/types/transaction.type";
import useUserStore from "@/app/store/useUserStore";

export default function Page() {

  const {user} = useUserStore()

  const { data: transactionsData } = useQuery({
    queryKey: ["transactions_sender"],
    queryFn: async (): Promise<transactionInterface[]> => {
      const response = await axiosInstance.get(`/account/transaction/sender/${user?._id}`);
      return response.data;
    },
  });

  console.log(transactionsData)

  return (
    <div className="w-full h-dvh p-4 space-y-4 overflow-auto">
      <h1 className="text-lg font-semibold">Payment History</h1>

      <div className="space-y-3">
        {transactionsData?.map((tx) => (
          <div
            key={tx._id}
            className="flex items-center justify-between border-b pb-3"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <img
                src={tx.receiver.profile}
                alt={tx.receiver.name}
                width={44}
                height={44}
                className="rounded-full object-cover"
              />

              <div>
                <p className="text-sm">
                  You sent money to{" "}
                  <span className="font-medium">{tx.receiver.name}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {tx.date} • {tx.time}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-1 text-sm font-semibold">
              <ArrowUpRight className="w-4 h-4" />
              ₱{tx.amount.toLocaleString()}
            </div>
          </div>
        ))}

        {!transactionsData?.length && (
          <p className="text-sm text-gray-500 text-center mt-10">
            No transactions yet
          </p>
        )}
      </div>
    </div>
  );
}

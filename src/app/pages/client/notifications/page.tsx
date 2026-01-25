"use client";

import axiosInstance from "@/app/utils/axios";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@/app/store/useUserStore";
import { notificationInterface } from "@/app/types/notification.type";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function Page() {
  const { user } = useUserStore();

  const { data: notificationData } = useQuery({
    queryKey: ["notifications", user?._id],
    enabled: !!user?._id,
    queryFn: async (): Promise<notificationInterface[]> => {
      const response = await axiosInstance.get(
        `/account/notifications/${user?._id}`
      );
      return response.data;
    },
  });

  return (
    <div className="w-full h-dvh p-4 space-y-4 overflow-auto">
      <h1 className="text-lg font-semibold">Notifications</h1>

      <div className="space-y-3">
        {notificationData?.map((notif, index) => {
          const isSuccess = notif.type === "success";

          return (
            <div
              key={index}
              className={`flex gap-3 items-start border-l-4 p-3 rounded-sm shadow ${
                isSuccess
                  ? "border-green-500 "
                  : "border-red-500 "
              }`}
            >
              {/* Icon */}
              {isSuccess ? (
                <CheckCircle className="text-green-600 w-5 h-5 mt-0.5" />
              ) : (
                <AlertTriangle className="text-red-600 w-5 h-5 mt-0.5" />
              )}

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {notif.date} • {notif.time}
                </p>
              </div>
            </div>
          );
        })}

        {!notificationData?.length && (
          <p className="text-sm text-gray-500 text-center mt-10">
            No notifications
          </p>
        )}
      </div>
    </div>
  );
}

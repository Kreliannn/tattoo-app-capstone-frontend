"use client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios";
import useUserStore from "@/app/store/useUserStore";
import { bookingInterface } from "@/app/types/booking.type";
import { convertToAmPm } from "@/app/utils/customFunction";
import {
  User,
  Calendar,
  Clock,
  Image as ImageIcon,
  Layers,
  DollarSign
} from "lucide-react";
import { ReviewModal } from "./components/reviews";
import { Button } from "@/components/ui/button";
import { OnlinePayment } from "./components/onlinePayment";

export default function Page() {
  const { user } = useUserStore();
  const [bookings, setBookings] = useState<bookingInterface[]>([]);

  const { data } = useQuery({
    queryKey: ["client_booking"],
    queryFn: () => axiosInstance.get(`/booking/client/${user?._id}`),
  });

  const [type, setType] = useState("active");

  useEffect(() => {
    if (data?.data){
        setBookings(data.data.filter((e : bookingInterface) => e.status == type ).reverse())
    } 
  }, [data, type]);


  return (
    <div className="w-full h-dvh space-y-6 p-4  overflow-auto"> 

    <div className="w-full grid grid-cols-2">
          <div className="w-auto flex gap-3 mb-5 ">
              <div className={`p-3 border shadow ${type == "active" && "text-white bg-stone-900"}`} onClick={() => setType("active")}>
                  Active
              </div>

              <div className={`p-3 border shadow ${type == "pending" && "text-white bg-stone-900"}`} onClick={() => setType("pending")}>
                  Pending 
              </div>

              <div className={`p-3 border shadow ${type == "completed" && "text-white bg-stone-900"}`} onClick={() => setType("completed")}>
                  Completed
              </div>
          </div>

  
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">

            {bookings.map((booking) => (
            <div
                key={booking._id}
                className="rounded-lg border p-3 shadow-sm space-y-2"
            >
                {/* Header */}
                <div className="flex items-center gap-2 justify-between">

                                    
                    <div className="flex gap-2">
                        <img
                            src={booking.artist.profile}
                            className="h-9 w-9 rounded-full object-cover"
                        />

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">
                            {booking.artist.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Artist
                            </p>
                        </div>

                    </div>


                    {booking.bussiness && (
                            <div className="flex items-center gap-2">
                            <img
                                src={booking.bussiness.profile}
                                className="h-9 w-9 rounded-full object-cover"
                            />

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">
                                {booking.bussiness.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Bussiness
                                </p>
                            </div>

                            
                        </div>
                    )}


                    <span
                        className={`text-xs font-semibold  px-2 py-0.5 rounded-full capitalize
                        ${booking.status === "pending" && "bg-yellow-100 text-yellow-700 border-2 border-yellow-500"}
                        ${booking.status === "completed" && "bg-green-100 text-green-700 border-2 border-green-500"}
                        ${booking.status === "rejected" && "bg-red-100 text-red-700 border-2 border-red-500" }
                        ${booking.status === "active" && "bg-blue-100 text-blue-700 border-2 border-blue-500" }
                        `}
                    >
                        {booking.status}
                    </span>
                    </div>

                <div className="flex gap-2 mt-5">
                    <img
                    src={booking.tattooImg}
                    className="w-52 h-62 rounded-md object-cover border"
                    />

                    <div className="text-sm p-2">

                            <div className="space-y-1">
                                <p className="flex items-center gap-2 font-medium text-xs ">
                                    <DollarSign size={16} />
                                    Balance
                                </p>
                                {booking.balance <= 0 ?
                                    <span className={`bg-green-100 text-green-700 border-2 border-green-500 text-xs font-semibold  px-2 py-0.5 rounded capitalize`}> Fully Paid </span>
                                :
                                    <p className=" text-xs text-green-500 font-bold">₱ {booking.balance.toLocaleString()}</p>
                                }
                            </div>

                            <div className="space-y-1 mt-4">
                                <p className="flex items-center gap-2 font-medium text-xs">
                                    <Calendar size={16} />
                                    Booking Date
                                </p>
                                <p className="text-muted-foreground text-xs">{booking.date}</p>
                            </div>


                            <div className="space-y-1 mt-4">
                                <p className="flex items-center gap-2 font-medium text-xs">
                                    <Clock size={16} />
                                    Duration
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    {booking.duration} {booking.duration != 1 ? "hrs" : "hr"}
                                </p>
                            </div>

                            <div className="space-y-1 mt-4">
                                <p className="flex items-center gap-2 font-medium text-xs">
                                    <Clock size={16} />
                                    Time Slot
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    {convertToAmPm(booking.time[0])} –{" "}
                                    {convertToAmPm(booking.time[booking.time.length - 1])}
                                </p>
                            </div>

                        

                            <div className="space-y-1 mt-4">
                                <p className="flex items-center gap-2 font-medium text-xs">
                                    <Layers size={16} />
                                    Session Progress
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    Session {booking.session} of {booking.sessions.length}
                                </p>
                            </div>
                    </div>

                </div>

                <div className="w-full flex gap-3">
                    {booking.status == "completed" && !booking.isReviewed && (
                        <div className="w-full">
                            <ReviewModal key={booking._id} booking={booking} setBookings={setBookings}  />
                        </div>
                    )}

                    {booking.balance != 0 && (
                        <div className="w-full">
                            <OnlinePayment key={booking._id} booking={booking}   />
                        </div>
                    )}
                </div>
                        
               

              


            </div>
            ))}

        </div>
        
    </div>
  );
}

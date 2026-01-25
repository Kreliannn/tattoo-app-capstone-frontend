"use client";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useContext } from "react";
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
  DollarSign,
  Check
} from "lucide-react";
import { BookNextSession } from "./nextSessionBooking";
import { Session } from "inspector/promises";
import { Button } from "@/components/ui/button";
import { successAlert, confirmAlert, errorAlert } from "@/app/utils/alert";
import { CashPayment } from "./cashPayment";


export default function ActiveBookings({ bookings, setBookings } : {bookings : bookingInterface[], setBookings : (data : bookingInterface[]) => void}) {

    const updateStatusMutation = useMutation({
        mutationFn : (data :  {id  :string , status : string}) => axiosInstance.put(`/booking/status`, data),
        onSuccess : (response) => {
            setBookings(response.data)
            successAlert("status updated")
        },
        onError : () => errorAlert("ERROR ACCOUR")
      })

      const handleComplete = (id : string) => {
        confirmAlert("this session is complete?", "complete", () => {
            updateStatusMutation.mutate({id, status : "completed"})
        })
      }

  return (
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
                        src={booking.client.profile}
                        className="h-9 w-9 rounded-full object-cover"
                    />

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">
                        {booking.client.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Client
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

            <div className="w-full flex gap-2 mt-5">
               {booking.session != booking.sessions.length 
                ?  <BookNextSession booking={booking} setBookings={setBookings} />
                :   <Button  className="text-green-500  bg-white border border-green-500 hover:bg-green-50  " onClick={() => handleComplete(booking._id)}> <Check /> Mark as Complete </Button>
               }

               {booking.balance != 0 && <CashPayment booking={booking}  />}
                    
            </div>

        </div>
        ))}

    </div>
  );
}

"use client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axios";
import useUserStore from "@/app/store/useUserStore";
import { bookingInterface } from "@/app/types/booking.type";
import ActiveBookings from "./components/activeBooking";
import CompletedBookings from "./components/completedBooking";
import PendingBookings from "./components/pendingBooking";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const { user } = useUserStore();
  const [bookings, setBookings] = useState<bookingInterface[]>([]);
  const [type, setType] = useState('active');
  

  const { data } = useQuery({
    queryKey: ["artist_booking"],
    queryFn: () => axiosInstance.get(`/booking/artist/${user?._id}`),
  });

  useEffect(() => {
    if (data?.data) setBookings(data.data);
  }, [data]);

  return (
    <div className="w-full h-dvh space-y-6 p-4  overflow-auto">

        <div className="w-full grid grid-cols-2">
          <div className="w-auto flex gap-3 mb-5 ">
              <div className={`p-3 border shadow ${type == "active" && "text-white bg-stone-900"}`} onClick={() => setType("active")}>
                  Active
              </div>

              <div className={`p-3 border shadow ${type == "pending" && "text-white bg-stone-900"}`} onClick={() => setType("pending")}>
                  Pending (<span className="font-bold text-green-500"> {bookings.filter((item) => item.status == "pending").length}  </span>)
              </div>


              <div className={`p-3 border shadow ${type == "completed" && "text-white bg-stone-900"}`} onClick={() => setType("completed")}>
                  Completed
              </div>
          </div>

          <div className="flex justify-end ">
            <Link href={"/pages/artist/addBooking/new"}>
              <div className={`p-3 border shadow text-white bg-stone-900 hover:bg-stone-700 flex gap-2`} >
                 <Plus />  Add Booking
              </div>
            </Link>
          </div>
        </div>

        

        {type == "active" && <ActiveBookings setBookings={setBookings} bookings={bookings.filter((item) => item.status == "active")} />}
        {type == "pending" && <PendingBookings setBookings={setBookings} bookings={bookings.filter((item) => item.status == "pending")} />}
        {type == "completed" && <CompletedBookings setBookings={setBookings} bookings={bookings.filter((item) => item.status == "completed")} />}
    

    </div>
  );
}

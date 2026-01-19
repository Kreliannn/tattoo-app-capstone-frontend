"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { convertToAmPm } from "@/app/utils/customFunction"
import { postInterface } from "@/app/types/post.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import axiosInstance from "@/app/utils/axios"
import { errorAlert, successAlert } from "@/app/utils/alert"
import { bookingInterfaceInput } from "@/app/types/booking.type"
import useUserStore from "@/app/store/useUserStore"
import { bookingInterface } from "@/app/types/booking.type"
import { LockIcon } from "lucide-react"

export function ArtistCalendar({artistId} : {artistId : string}) {

   const times = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00"
  ]
  


  const [date, setDate] = useState<Date | undefined>(new Date())





  const [artistBookings, setArtistBookings] = useState<bookingInterface[]>([]);
 
  const { data } = useQuery({
    queryKey: ["artist_booking"],
    queryFn: () => axiosInstance.get(`/booking/artist/${artistId}`),
  });

  useEffect(() => {
    if (data?.data && date) setArtistBookings(data.data.filter((e : bookingInterface) => e.status == "active" && e.date == date.toLocaleDateString("en-US").toString() ));
  }, [data, date]);


  const checkIfTimeBooked = (time : string) => {
    if(!date) return 
    let isBooked = false
    if(artistBookings.length == 0) return isBooked
    artistBookings.forEach((item) => {
      if(item.time.includes(time)) isBooked = true
    })
    return isBooked
  }
  

    
  return (
    <div className=" gap-6 mb-6 flex w-full mt-8 ">
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow-lg"
            captionLayout="dropdown"
        />

        {date ? (
            <div className="w-full rounded shadow-lg border p-5">
                <div className="space-y-3">
                    <p className="text-sm font-bold  text-stone-600 ">
                        Date : {date.toLocaleDateString("en-US").toString()}
                    </p>

                    <div className="grid grid-cols-4 gap-2">
                        {times.map((item, index) => (
                            <Button
                                key={item}
                                variant={(checkIfTimeBooked(item)) ? "default" : "outline"}
                                disabled={checkIfTimeBooked(item)}
                            >
                            {checkIfTimeBooked(item) && <LockIcon />}  {convertToAmPm(item)}
                            </Button>
                        ))}
                    </div>

        
                </div>
            </div>
        ) : (
            <div className="w-full rounded shadow-lg border flex justify-center items-center">
                <h1 className="text-lg font-bold text-stone-500">  Select Date First</h1>
            </div>
        )}

        

    </div>
  )
}
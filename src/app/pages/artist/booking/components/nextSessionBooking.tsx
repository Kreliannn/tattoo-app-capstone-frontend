"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { convertToAmPm } from "@/app/utils/customFunction"
import { postInterface } from "@/app/types/post.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import axiosInstance from "@/app/utils/axios"
import { errorAlert, successAlert } from "@/app/utils/alert"
import { bookingInterfaceInput } from "@/app/types/booking.type"
import useUserStore from "@/app/store/useUserStore"
import { bookingInterface } from "@/app/types/booking.type"

export function BookNextSession({ booking, setBookings } : {booking : bookingInterface,  setBookings : (data : bookingInterface[]) => void}) {

   const [times, setTimes] = useState([
    { time: "07:00", isAvailable: true },
    { time: "08:00", isAvailable: true },
    { time: "09:00", isAvailable: true },
    { time: "10:00", isAvailable: true },
    { time: "11:00", isAvailable: true },
    { time: "12:00", isAvailable: true },
    { time: "13:00", isAvailable: true },
    { time: "14:00", isAvailable: true },
    { time: "15:00", isAvailable: true },
    { time: "16:00", isAvailable: true },
    { time: "17:00", isAvailable: true },
    { time: "18:00", isAvailable: true },
    { time: "19:00", isAvailable: true },
    { time: "20:00", isAvailable: true },
    { time: "21:00", isAvailable: true },
    { time: "22:00", isAvailable: true },
  ])

  const {user} = useUserStore()

  const sessionTime = (booking.sessions[booking.session])

  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>(undefined)

  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)

  
  const [selectedtime, setSelectedTime] = useState<string[]>([])

  const bookMutation = useMutation({
    mutationFn : (data : {newTime  :string[], newDate : string, id : string}) => axiosInstance.post("/booking/bookNextSession",data),
    onSuccess : (response) => {
      setBookings(response.data)
      successAlert("booking submited")
    }, 
    onError : () => errorAlert("error accour")
  })

  const bookHandler = () => {
    if(!date || !selectStartTime || !user) return errorAlert("empty date or time")
    setOpen(false)

    bookMutation.mutate({
        id : booking._id,
        newDate : date.toLocaleDateString("en-US").toString(),
        newTime : selectedtime
      }) 

  }

  
  const selectStartTime = (index : number) => {

    const selectedItem = []
    
    for(let i = index; i <= (sessionTime + index); i++){
        try{
          selectedItem.push(times[i].time)
        } catch(e){
          errorAlert("invalid")
          return
        }
       
    }

    setStartTime(times[index].time)
    setEndTime(times[index + sessionTime].time)
    setSelectedTime(selectedItem)
  }
  

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
            <Button className="flex items-center gap-2  bg-green-500 text-white hover:bg-green-600"  onClick={() => setOpen(true)}>
                Book next Session
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Book a Tattoo Session</DialogTitle>
          <DialogDescription>   
            Fill in the details below to request an appointment with your chosen artist.
          </DialogDescription>
        </DialogHeader>

    
        <div className=" gap-6 mb-6 flex">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm"
                captionLayout="dropdown"
            />

            {date ? (
                <div className="w-full rounded shadow-lg border p-5">
                     <div className="space-y-3">
                        <p className="text-sm font-bold  text-stone-600 ">
                            {startTime && endTime ?`Session Duration : ${sessionTime } ${sessionTime != 0 ? "hrs" : "hr"} | Start : ${convertToAmPm(startTime)} End : ${convertToAmPm(endTime)}` : "Select Start Time"}
                        </p>

                        <div className="grid grid-cols-4 gap-2">
                            {times.map((item, index) => (
                                <Button
                                    key={item.time}
                                    variant={(selectedtime.includes(item.time)) ? "default" : "outline"}
                                    disabled={!item.isAvailable}
                                    onClick={() => selectStartTime(index)}
                                >
                                    {convertToAmPm(item.time)}
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

        <DialogFooter>
          <Button className="w-full" onClick={bookHandler}>  Confirm Booking  </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

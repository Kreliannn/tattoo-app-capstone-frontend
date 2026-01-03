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


export function BookModal({ post } : {post : postInterface}) {

   const [times, setTimes] = useState([
    { time: "07:00", isAvailable: true, isSelected: false },
    { time: "08:00", isAvailable: true, isSelected: false },
    { time: "09:00", isAvailable: true, isSelected: false },
    { time: "10:00", isAvailable: true, isSelected: false },
    { time: "11:00", isAvailable: true, isSelected: false },
    { time: "12:00", isAvailable: true, isSelected: false },
    { time: "13:00", isAvailable: true, isSelected: false },
    { time: "14:00", isAvailable: true, isSelected: false },
    { time: "15:00", isAvailable: true, isSelected: false },
    { time: "16:00", isAvailable: true, isSelected: false },
    { time: "17:00", isAvailable: true, isSelected: false },
    { time: "18:00", isAvailable: true, isSelected: false },
    { time: "19:00", isAvailable: true, isSelected: false },
    { time: "20:00", isAvailable: true, isSelected: false },
    { time: "21:00", isAvailable: true, isSelected: false },
    { time: "22:00", isAvailable: true, isSelected: false },
  ])

  const sessionTime = (post.sessions[0] - 1)

  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>(undefined)

  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)

  
  const selectStartTime = (index : number) => {
    const currentTimes = times

    

    currentTimes.forEach((item) => item.isSelected = false)
    
    for(let i = index; i <= (sessionTime + index); i++){
        currentTimes[i].isSelected = true
    }

    setStartTime(currentTimes[index].time)
    setEndTime(currentTimes[index + sessionTime].time)
    setTimes(currentTimes)
  }


    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
            <Button className="flex items-center gap-2 "  onClick={() => setOpen(true)}>
                Book Now
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
                            {startTime && endTime ?`Session Duration : ${sessionTime + 1} ${sessionTime != 0 ? "hrs" : "hr"} | Start : ${convertToAmPm(startTime)} End : ${convertToAmPm(endTime)}` : "Select Start Time"}
                        </p>

                        <div className="grid grid-cols-4 gap-2">
                            {times.map((item, index) => (
                                <Button
                                    key={item.time}
                                    variant={(item.isSelected) ? "default" : "outline"}
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
          <Button className="w-full">  Confirm Booking  </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

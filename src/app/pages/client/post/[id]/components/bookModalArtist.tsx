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
import { showHealthChecklist } from "@/app/utils/alert"
import { ClientAgreementModal } from "./clientAgreement"

export function ArtistBookModal({ post } : {post : postInterface}) {

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
  
  

  const {user} = useUserStore()

  const sessionTime = (post.sessions[0])

  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>(undefined)

  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)

  
  const [selectedtime, setSelectedTime] = useState<string[]>([])

  const [artistBookings, setArtistBookings] = useState<bookingInterface[]>([]);
 
  const { data } = useQuery({
    queryKey: ["artist_booking"],
    queryFn: () => axiosInstance.get(`/booking/artist/${post.account._id}`),
  });

  useEffect(() => {
    if (data?.data && date) setArtistBookings(data.data.filter((e : bookingInterface) => e.status == "active" && e.date == date.toLocaleDateString("en-US").toString() ));
  }, [data, date]);

  const bookMutation = useMutation({
    mutationFn : (booking : bookingInterfaceInput) => axiosInstance.post("/booking", {booking}),
    onSuccess : () => {
      setOpen(false)
      setSelectedTime([])
      successAlert("booking submited")
    }, 
    onError : () => errorAlert("error accour")
  })

  const validateBookings = () => {
    let isError = false
    selectedtime.forEach((item) => {
      if(checkIfTimeBooked(item))  isError = true
    })
    return isError
  }

  const bookHandler = () => {
      setOpen(false)
      bookMutation.mutate({
        bussiness : null,
        artist : post.account._id,
        client : user!._id,
        tattooImg : post.postImg,
        sessions : post.sessions,
        session : 1,
        date : date!.toLocaleDateString("en-US").toString(),
        time : selectedtime,
        duration : selectedtime.length - 1,
        status : "pending",
        isReviewed : false,
        balance : post.price,
        itemUsed : post.itemUsed
      }) 
  }

  
  const selectStartTime = (index : number) => {

    

    const selectedItem = []
    
    for(let i = index; i <= (sessionTime + index); i++){
        try{
          selectedItem.push(times[i])
        } catch(e){
          errorAlert("invalid")
          return
        }
       
    }

    setStartTime(times[index])
    setEndTime(times[index + sessionTime])
    setSelectedTime(selectedItem)
  }


  const checkIfTimeBooked = (time : string) => {
    if(!date) return 
    let isBooked = false
    if(artistBookings.length == 0) return isBooked
    artistBookings.forEach((item) => {
      if(item.time.includes(time)) isBooked = true
    })
    return isBooked
  }

  const isDisabled = () => (!date || !selectStartTime || !user) || validateBookings() || selectedtime.length == 0
  

    
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
                            {startTime && endTime ?`Date : ${date.toLocaleDateString("en-US").toString()} | Duration : ${sessionTime } ${sessionTime != 1 ? "hrs" : "hr"} |  ${convertToAmPm(startTime)} - ${convertToAmPm(endTime)}` : `Date : ${date.toLocaleDateString("en-US").toString()}`}
                        </p>

                        <div className="grid grid-cols-4 gap-2">
                            {times.map((item, index) => (
                                <Button
                                    key={item}
                                    variant={(selectedtime.includes(item)) ? "default" : "outline"}
                                    disabled={checkIfTimeBooked(item)}
                                    onClick={() => selectStartTime(index)}
                                    className={`${selectedtime.includes(item) && checkIfTimeBooked(item) && "text-red-500 border-2"}`}
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

        <DialogFooter>
          <ClientAgreementModal isDisabled={isDisabled()} callBack={bookHandler} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ImageIcon,
  Plus,
  X,
  Clock,
  Layers,
  Tag,
  LoaderCircle,
  DollarSign,
  Replace
} from "lucide-react"
import { errorAlert , successAlert} from "@/app/utils/alert"
import { useMutation, useQuery } from "@tanstack/react-query"
import axiosInstance from "@/app/utils/axios"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { BookModal } from "./components/bookModal"
import { convoInterface } from "@/app/types/convo.type"
import useUserStore from "@/app/store/useUserStore"
import { getChatIndex } from "@/app/utils/customFunction"

export default function Page() {

  const [type, setType] = useState("newPost")

  
  const {user} = useUserStore()

  const params = useParams()
  const paramsId = params.id as string


  const { data } = useQuery({
    queryKey : ['work_post'],
    queryFn : () =>  axiosInstance.get(`/works/${paramsId}`),
    enabled: paramsId !== 'new'
  })

  useEffect(() => {
    if(paramsId != "new" && data?.data){
        setType("workPost")
        setPreview(data.data.screenShot)
    }
  }, [data])


  const [convos, setConvos] = useState<convoInterface[]>([])

  const { data : convoData } = useQuery({
    queryKey : ['convos'],
    queryFn : () => axiosInstance.get(`/convo`)
  })

  useEffect(() => {
    if(convoData?.data) setConvos(convoData?.data)
  }, [convoData])


  
  const router = useRouter()

  const [postImg, setPostImg] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)



  const [price, setPrice] = useState(0)

  const [category, setCategory] = useState("")

  const [client, setClient] = useState("")
  const [clientName, setClientName] = useState("")
  const [isNoClientAccount, setIsNoClientAccount] = useState(false)

  const [sessions, setSessions] = useState<number[]>([1])

  const postMutation = useMutation({
    mutationFn : (data : FormData) => axiosInstance.post("/booking/custom", data),
    onSuccess : () => {
      
      Swal.fire({
        icon: "success",
        title: "Booking created",
        text: "Your Custom Booking was added successfully"
      }).then(() => {
        router.push("/pages/artist/booking")
      });

    },
    onError : () => errorAlert("error accour")
  })

  

  const updateSession = (index: number, value: number) => {
    const updated = [...sessions];
    updated[index] = value;
    setSessions(updated);
  };
  

  const addSession = () => {
    setSessions([...sessions, 1]);
  };
  

  // Remove a session
  const removeSession = (index: number) => {
    if (sessions.length === 1) return;
    setSessions(sessions.filter((_, i) => i !== index));
  };
  

  const handleImageChange = (file: File | null) => {
    setPostImg(file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const bookHandler = (data : {date : string, time : string[]}) => {

    if( !category || !sessions || !client || !user) return errorAlert("empty field")
    if(!postImg && type == "newPost" ) return errorAlert("empty field")

    const formData = new FormData()

    formData.append("file", postImg || "none")
    formData.append("price", price.toString())
    formData.append("sessions", JSON.stringify(sessions))

    formData.append("selectedTime", JSON.stringify(data.time))
    formData.append("date", data.date)

    formData.append("itemUsed", JSON.stringify([]))

    formData.append("clientId", client)
    formData.append("artistId", user?._id)

    formData.append("type", type)
    formData.append("link", preview || "none")

    formData.append("isNoAccount", isNoClientAccount ? "no account" : "has account")
    formData.append("clientName", clientName || "none")

    

    postMutation.mutate(formData)
  }

  

  return (
    <div className="w-4/6 mx-auto py-10 space-y-6">
      <h1 className="text-xl font-semibold">Add Booking</h1>

      <div className="space-y-6">

        {/* Image Upload */}
        <div className="space-y-2">
       

          <div className=" h-[420px] rounded-md p-4 flex gap-4 items-center">

            <div className="w-2/6 h-full ">

              <Label className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4" />
                Tattoo Image
              </Label>

                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-[75%] object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-[75%] border rounded flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}

                {type == "newPost" && (
                  <Input
                   type="file"
                   className="mt-2 w-full bg-stone-900 text-white"
                   accept="image/*"
                   onChange={(e) =>
                     handleImageChange(e.target.files?.[0] || null)
                   }
                 />
                )}  
               
            </div>

            <div className="w-4/6 h-full ">

              
              <div className="space-y-2">
                  <Label>Client</Label>
                  <div className="w-full flex gap-2">

                    {isNoClientAccount 
                    ? 
                    <Input
                      placeholder="Enter client name"
                      value={clientName}
                      type="text"
                      onChange={(e) => setClientName(e.target.value)}
                    />
                    :
                    <Select onValueChange={setClient}>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select Client" />
                      </SelectTrigger>
                      <SelectContent>
                          {convos.map((convo) => {
                            if(convo.accounts[getChatIndex(user?._id!, convo)].type != "client") return
                            return(
                              <SelectItem  key={convo._id} value={convo.accounts[getChatIndex(user?._id!, convo)]._id}> <img src={convo.accounts[getChatIndex(user?._id!, convo)].profile} className="w-5 h-5 object-cover rounded-full" />  {convo.accounts[getChatIndex(user?._id!, convo)].name} </SelectItem>
                            )
                          })}
                      </SelectContent>
                    </Select>
                    }
                   

                    <Button onClick={() => setIsNoClientAccount((prev) => !prev)}> {isNoClientAccount ? "has account" :  "no account"} </Button>
                  </div>
              </div>

                
              

             

                    
              <div className="space-y-2 mt-3">
                <Label>Category</Label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger className=" w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realism">Realism</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="blackwork">Blackwork</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                  </SelectContent>
                </Select>
              </div>


               {/* Estimated Time & Sessions */}
               <div className="space-y-2 mt-3">
                <Label className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price
                </Label>

                <div className="flex gap-2">
                  <Input
                    placeholder="Price"
                    value={price}
                    type="number"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>

               
              </div>

              
              
              <div className="space-y-4 mt-5">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Sessions
                  </Label>

                  <Button
                    type="button"
                    onClick={addSession}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Session
                  </Button>
                </div>

                <div className="w-full grid grid-cols-2 gap-2">
                {sessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    {/* Session Label */}
                    <div className="flex items-center gap-2 min-w-[90px]">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Session {index + 1}
                      </span>
                    </div>

                    {/* Input with suffix */}
                    <div className="relative w-full">
                      <Input
                        type="number"
                        min={1}
                        value={session}
                        onChange={(e) =>
                          updateSession(index, Number(e.target.value))
                        }
                        className="pr-12"
                        placeholder="Hours"
                      />

                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {session === 1 ? "hr" : "hrs"}
                      </span>
                    </div>

                    {/* Remove */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSession(index)}
                      disabled={sessions.length === 1}
                      className="text-red-500 hover:text-red-600"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                </div>

                
              </div>


              
             

              

            </div>
           
          </div>
        </div>

          
        <BookModal artistId={user?._id!} artistName={user?.name!}  sessionTime={sessions[0]}  callBack={bookHandler}/>
      
        
      </div>
    </div>
  )
}

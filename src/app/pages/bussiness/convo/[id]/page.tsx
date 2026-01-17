"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { useState, useEffect, useRef } from "react";
import { convoInterface } from "@/app/types/convo.type";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { errorAlert } from "@/app/utils/alert";
import useUserStore from "@/app/store/useUserStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, VideoIcon, Send } from "lucide-react";
import { UploadImageModal } from "./components/uploadImageModal";
import { getChatIndex } from "@/app/utils/customFunction";

export default function Page() {

  const {user} = useUserStore()

  const [p2Profile, setP2Profile] = useState("")
  const [p2Name, setP2name] = useState("")

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const params = useParams()
  const paramsId = params.id as string
  
  const [convo, setConvo] = useState<convoInterface | null>(null)

  const { data } = useQuery({
    queryKey : ['convo'],
    queryFn : () => axiosInstance.get(`/convo/${paramsId}`),
    refetchInterval : 5000
  })

  useEffect(() => {
    if(data?.data){
      const convoData : convoInterface = data?.data
      setConvo(convoData)
      setP2Profile(convoData.accounts[getChatIndex(user?._id!, convoData)].profile)
      setP2name(convoData.accounts[getChatIndex(user?._id!, convoData)].name)
    } 
  }, [data])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convo?.chats]);
  


  const [message, setMessage] = useState("")

  const messageMutation = useMutation({
    mutationFn : (data : { convoId : string, message : string}) => axiosInstance.post(`/convo/message`, data),
    onSuccess : (response) => {
        setConvo(response.data)
        setMessage("")
    },
    onError : () => errorAlert("error accour")
  })


  const handleMessageSend = () => {
    if(!message.trim()) return errorAlert("empty field")
    messageMutation.mutate({
      message,
      convoId : convo!._id
    })
  }

  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [convo?.chats]);


  if(!convo) return <div> laoding </div>

  return (
    <div className="flex flex-col h-dvh w-full bg-background">
  
      {/* Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <img
          src={p2Profile}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h1 className="font-semibold text-lg">{p2Name}</h1>
      </div>
  
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {convo.chats.map((chat) => {
          const isMe = chat.sender === user?._id;
          
          return (
            <div
              key={chat._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg ${chat.type === "text" && "p-3"} text-sm ${
                  isMe
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {chat.type === "text" && (
                  <p>{chat.message}</p>
                )}
  
                {chat.type === "image" && (
                  <img
                    src={chat.url}
                    alt="sent"
                    className="rounded-md max-h-64 object-cover"
                  />
                )}
  
                {chat.type === "video" && (
                  <video
                    src={chat.url}
                    controls
                    className="rounded-md max-h-64"
                  />
                )}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
  
      {/* Input */}
      <div className="border-t p-4 flex items-center gap-2">

        <UploadImageModal convoId={convo._id}  setConvo={setConvo}/>
  
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1"
        />
  
        <Button onClick={handleMessageSend}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
  
    </div>
  );
  
  
}

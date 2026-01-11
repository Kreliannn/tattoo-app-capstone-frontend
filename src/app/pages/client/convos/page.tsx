"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { useState, useEffect } from "react";
import { convoInterface } from "@/app/types/convo.type";
import Link from "next/link";
import useUserStore from "@/app/store/useUserStore";

export default function Page() {
  
  const {user} = useUserStore()
  
  const [convos, setConvos] = useState<convoInterface[]>([])

  const { data } = useQuery({
    queryKey : ['convos'],
    queryFn : () => axiosInstance.get(`/convo`)
  })

  useEffect(() => {
    if(data?.data) setConvos(data?.data)
  }, [data])


  return (
    <div className="w-full h-dvh p-4 space-y-4">
  
      {convos.map((convo) => {

        const index = (user?._id == convo.accounts[0]._id) ? 1 : 0

        return (
          <Link
            key={convo._id}
            href={`/pages/client/convo/${convo._id}`}
            className="block"
          >
            <div className="border rounded-lg p-4 hover:bg-muted transition">
    
              {/* Participants */}
              <div className="flex items-center gap-3">
                <img
                  src={convo.accounts[index]?.profile}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
    
                <div className="flex-1">
                  <h1 className="font-semibold">
                    {convo.accounts[index].name}
                  </h1>
    
                  {/* Last message */}
                  <p className="text-sm text-muted-foreground truncate">
                    {convo.lastMessage}
                  </p>
                </div>
              </div>
    
            </div>
          </Link>
        )
      })}
  
      {convos.length === 0 && (
        <p className="text-center text-muted-foreground">
          No conversations yet
        </p>
      )}
  
    </div>
  );
  
}

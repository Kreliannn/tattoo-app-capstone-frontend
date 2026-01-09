"use client";
import useUserStore from "@/app/store/useUserStore";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { artistInfoInterface } from "@/app/types/accounts.type";
import { postInterface } from "@/app/types/post.type";
import { ChangeProfile } from "./components/changeProfile";
import MapLocation from "./components/location";
import { ArtistVerifiactionModal } from "./components/artistVerificationModal";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function Page() {
  
  const { user, setUser } = useUserStore()

  const { data } = useQuery({
    queryKey : ['account'],
    queryFn : () => axiosInstance.get(`/account/${user?._id}`),
    refetchInterval : 5000
  })

  useEffect(() => {
      if(data?.data){
        console.log(data.data)
        setUser(data.data)
      } 
  },[data])


  if(!user) return <div> laoding </div>


  return (
    <div className="w-full h-full min-h-dvh ">
      <div className="w-4/6 h-full  m-auto p-5">

        <div className="w-full flex gap-5 ">
          {/* Profile Image */}
          <div className="flex justify-center">
            <ChangeProfile profile={user.profile} />
          </div>

          <div className="flex items-center">

            <div>
              {/* Name */}
              <div>
                <h1 className="text-4xl font-bold">
                  {user.name}
                </h1>
              </div>

              <div className="text-lg text-gray-700 ">
                {user.contact || "No contact available"}
              </div>
        
        
            </div>
           
          </div>
  
        </div>


        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-8">

          <div className="  flex gap-2">
            {user.type == "client" ?   <ArtistVerifiactionModal /> : <Link href={"/pages/artist/profile"}> <Button className="bg-green-500 hover:bg-green-600"> Switch to Artist </Button> </Link> }
            <MapLocation   />
          </div>


        </div>
  
      </div>
    </div>
  )
}

"use client";
import { Label } from "@/components/ui/label";
import { ArtistsApplication } from "./components/artistsApplication";
import useUserStore from "@/app/store/useUserStore";
import { bussinessInfoInterface } from "@/app/types/accounts.type";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { User, Mail, Phone } from "lucide-react"

export default function Page() {
  const {user} = useUserStore()

  const [bussinessInfo, setBussinessInfo] = useState<bussinessInfoInterface | null>(null)


  const { data : bussinessInfoData } = useQuery({
    queryKey : ['bussiness_profile'],
    queryFn : () => axiosInstance.get(`/account/bussinessInfo/${user?._id}`),
  })



  useEffect(() => {
    if(bussinessInfoData?.data) setBussinessInfo(bussinessInfoData?.data)
  }, [bussinessInfoData])

  if(!bussinessInfo) return <div> loading </div>

  return (
    <div className="w-full min-h-screen space-y-6 p-5">

      {/* Header */}
      <div className="w-full h-20 flex justify-between items-center p-5">
        <Label className="text-2xl font-bold text-stone-900">Artists</Label>

        <ArtistsApplication key={user?._id} userId={user?._id!} setBussinessInfo={setBussinessInfo} />
        
      </div>


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {bussinessInfo.artists.map((item) => (
          <div
            key={item.artist._id}
            className="bg-white border rounded-xl p-5 shadow-sm flex gap-4"
          >
            {/* Avatar */}
            <img
              src={item.artist.profile}
              alt="artist"
              className="w-16 h-16 rounded-full object-cover border"
            />

            {/* Info */}
            <div className="flex flex-col gap-2">
              <h1 className="flex items-center gap-2 font-semibold text-gray-800">
                <User className="w-4 h-4" />
                {item.artist.name}
              </h1>

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {item.artist.contact}
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {item.artist.email}
              </p>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

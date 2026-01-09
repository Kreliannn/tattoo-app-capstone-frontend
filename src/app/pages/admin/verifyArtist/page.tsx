"use client";
import { artistVerificationInterface } from "@/app/types/accounts.type";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";

export default function Page() {
    
    const [artistVerifications, setArtistVerifications] = useState<artistVerificationInterface[]>([])

    const { data } = useQuery({
      queryKey : ['artist_post'],
      queryFn : () => axiosInstance.get(`/post`)
    })
  
    useEffect(() => {
        if(data?.data) setArtistVerifications(data.data)
    },[data])

  return (
    <div className="w-full h-dvh space-y-6 p-4 ">
     
    </div>
  );
}

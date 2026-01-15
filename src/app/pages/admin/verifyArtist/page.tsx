"use client";

import { artistVerificationInterface } from "@/app/types/accounts.type";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArtistVerificationModal } from "./components/artistVerificationModal";
import { BussinessVerificationModal } from "./components/bussinessVerificationModal";

export default function Page() {
  const [artistVerifications, setArtistVerifications] = useState<artistVerificationInterface[]>([]);

  const { data } = useQuery({
    queryKey: ["artist_verification"],
    queryFn: () => axiosInstance.get(`/account/artistVerification`),
  });

  useEffect(() => {
    if (data?.data) setArtistVerifications(data.data);
  }, [data]);

  return (
    <div className="w-full min-h-dvh p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Artist Verification Requests</h1>
        <p className="text-sm text-muted-foreground">
          Review users requesting artist access
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artistVerifications.map((verification) => (
          <div
            key={verification._id}
            className="rounded-xl border bg-background p-4 shadow-sm space-y-4 flex justify-between"
          >
            {/* User Info */}
            <div className="flex items-center gap-3">
              <img
                src={verification.client.profile}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="font-medium">
                  {verification.client.name}
                </h2>
                <Badge variant="secondary" className="mt-1">
                 {verification.type}
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center">
                {verification.type == "artist" 
                  ?  <ArtistVerificationModal artistVerification={verification} setArtistVerification={setArtistVerifications} />   
                  :  <BussinessVerificationModal artistVerification={verification} setArtistVerification={setArtistVerifications} /> 
                }
               
            </div>
          
          
          </div>
        ))}
      </div>
    </div>
  );
}






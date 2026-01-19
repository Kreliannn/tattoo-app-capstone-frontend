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
 import { useQuery } from "@tanstack/react-query"
 import { bussinessInfoInterface } from "@/app/types/accounts.type"
 import axiosInstance from "@/app/utils/axios"
 import { postInterface } from "@/app/types/post.type"
 import { ArtistBookModal } from "./bookModalArtist"

export function ArtistSelectionModal({ post  } : {post : postInterface}) {

  const [open, setOpen] = useState(false);

  const [artistId, setArtistId] = useState<string | null>(null)

  const { data: bussinessInfoData } = useQuery({
    queryKey: ['bussiness_profile'],
    queryFn: async (): Promise<bussinessInfoInterface> => {
      const response = await axiosInstance.get(`/account/bussinessInfo/${post.account._id}`);
      return response.data;
    }
  });
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
            <Button className="flex items-center gap-2 "  onClick={() => setOpen(true)}>
                Book Now
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Artist Selection</DialogTitle>
          <DialogDescription>   
            Select Artist before booking
          </DialogDescription>
        </DialogHeader>

    
        <div className=" gap-6 mb-6 w-full max-h-[300px] overflow-auto">
            {
                bussinessInfoData?.artists.map((artist) => (
                    <div key={artist.artist._id} className={`flex w-full gap-3 mb-3 p-3 items-center  rounded  border shadow ${artist.artist._id == artistId && "bg-stone-900 text-white border border-black"}`} onClick={() => setArtistId(artist.artist._id)} >
                        <img src={artist.artist.profile} alt="" className="w-14 h-14 rounded-full " />
                        <h1 className={`text-2xl font-bold text-stone-700  ${artist.artist._id == artistId && " text-white  "}`}> {artist.artist.name} </h1>
                    </div>
                ))
            }

        </div>

        <DialogFooter>
           {artistId && <ArtistBookModal  key={artistId} post={post} artistId={artistId}  bussinessId={post.account._id}/>} 
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

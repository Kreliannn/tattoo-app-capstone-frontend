"use client";
import useUserStore from "@/app/store/useUserStore";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { postInterface } from "@/app/types/post.type";
import ImgCard from "./components/imgCard";
import Link from "next/link";
import { ChangeProfile } from "./components/changeProfile";
import MapLocation from "./components/location";
import { Button } from "@/components/ui/button";
import { bussinessInfoInterface } from "@/app/types/accounts.type";
import { useParams } from "next/navigation";
import { errorAlert } from "@/app/utils/alert";
import { useRouter } from "next/navigation";
import { MessageCircle, Skull } from "lucide-react";
import { accountInterface } from "@/app/types/accounts.type";
import { ArtistCalendar } from "./components/artistCalendar";

export default function Page() {

  const params = useParams()
  const bussinessId = params.id as string
  
  const { user } = useUserStore()

  const router = useRouter()

  const [selectedArtist, setSelectedArtist] = useState<accountInterface | null>(null) 

  const [bussinessInfo, setBussinessInfo] = useState<bussinessInfoInterface | null>(null)
  const [posts, setPosts] = useState<postInterface[]>([])

  const [imgType, setImgType] = useState("studio")

  const { data : bussinessInfoData } = useQuery({
    queryKey : ['bussiness_profile'],
    queryFn : () => axiosInstance.get(`/account/bussinessInfo/${bussinessId}`),
  })

  const { data : postsData } = useQuery({
    queryKey : ['artist_post'],
    queryFn : () => axiosInstance.get(`/post/account/${bussinessId}`)
  })

  useEffect(() => {
    if(bussinessInfoData?.data) setBussinessInfo(bussinessInfoData?.data)
    if(postsData?.data) setPosts(postsData.data)
  }, [bussinessInfoData, postsData])


  const messageMutation = useMutation({
    mutationFn : () => axiosInstance.post(`/convo/convoId/${bussinessInfo?.bussiness._id}`),
    onSuccess : (response) => {
        router.push(`/pages/client/convo/${response.data}`)
    },
    onError : () => errorAlert("error accour")
  })


  if(!bussinessInfo) return <div> laoding </div>


  return (
    <div className="w-full h-full min-h-dvh ">
      <div className="w-4/6 h-full  m-auto p-5">

        <div className="w-full flex gap-5 ">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={bussinessInfo.bussiness.profile}
              alt="artist profile"
              className="w-42 h-42 rounded-full object-cover border cursor-pointer hover:opacity-80 hover:scale-105 transition"
            />
          </div>

          <div className="flex items-center">

            <div>
              {/* Name */}
              <div>
                <h1 className="text-4xl font-bold">
                  {bussinessInfo.bussiness.name}
                </h1>
              </div>

            
        
              {/* Bio */}
              <div className="text-lg text-gray-700 ">
                {bussinessInfo.bio || "No bio available"}
              </div>
            </div>
           
          </div>

        </div>

        <div className=" mt-8  flex gap-2 ">
              <Button onClick={() => messageMutation.mutate()}> <MessageCircle /> Message </Button>
              <Button> <Skull /> Report </Button>
        </div>

 

        <div className="w-full   mt-5">
            <div className="w-auto flex  gap-3 mb-5">

                <div className={`p-3 border shadow ${imgType == "studio" && "text-white bg-stone-900"}`} onClick={() => setImgType("studio")}>
                    Tattoo Studio
                </div>

                <div className={`p-3 border shadow ${imgType == "achievement" && "text-white bg-stone-900"}`} onClick={() => setImgType("achievement")}>
                  Artist Achievement
                </div>

                <div className={`p-3 border shadow ${imgType == "client" && "text-white bg-stone-900"}`} onClick={() => setImgType("client")}>
                   Client Works
                </div>

        
            </div>

     
            {imgType == "studio" && <ImgCard type="studio" addImg={true} files={bussinessInfo.profileImages.filter(item => item.type === "studio")} />}
            {imgType == "achievement" && <ImgCard type="achievement" addImg={true} files={bussinessInfo.profileImages.filter(item => item.type === "achievement")} />}
            {imgType == "client" && <ImgCard type="client" addImg={true} files={bussinessInfo.profileImages.filter(item => item.type === "client")} />}

        </div>


        <div className="mt-8 w-full">
            <h1 className="text-2xl font-bold"> {bussinessInfo.artists.length != 0 && "Artists"} </h1>
            <div className="w-full flex gap-5 mt-3">
              {bussinessInfo.artists.map((artist) => (
                <div key={artist.artist._id} className="flex gap-3 border shadow p-3 items-center rounded hover:scale-105" onClick={() => setSelectedArtist(artist.artist)}>
                    <img src={artist.artist.profile} alt=""  className="w-10 h-10 rounded-full"/>
                    <h1 className="font-bold text-stone-700"> {artist.artist.name} </h1>
                </div>
              ))}
            </div>
        </div>


        {selectedArtist && (
          <>
            <div className="w-full mt-8 flex gap-3 items-center">
              <img src={selectedArtist.profile} alt=""  className="w-15 h-15 rounded-full"/> 
              <h1 className="text-4xl font-bold text-stone-800"> {selectedArtist.name} Schedule </h1>
            </div>
            <ArtistCalendar artistId={selectedArtist._id} key={selectedArtist._id}/>
          </>
        )}

       

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-8">

          <div className="h-[300px] shadow-lg border rounded p-4 flex flex-col gap-4">
           
          </div>

          <div className="h-[300px] shadow-lg border rounded p-4">
            <MapLocation bussinessInfo={bussinessInfo} />
          </div>
        </div>
    
       
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {posts.map((post) => (
          <div
            key={post._id}
            className="group bg-white rounded-2xl shadow-lg border  hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Post Image */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={post.postImg}
                alt="post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 border"
              />

              {/* Category Badge */}
              <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                ₱{post.price.toLocaleString()}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Artist */}
              <div className="flex items-center gap-3">
                <img
                  src={post.account.profile}
                  alt="artist"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <p className="text-sm text-gray-500">{post.account.type} </p>
                  <h1 className="font-semibold text-gray-900">
                    {post.account.name}
                  </h1>
                </div>
              </div>

              <Link href={`/pages/client/post/${post._id}`} >
                <button className="w-full mt-3 bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition" >
                  View Post
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

   
  
      </div>
    </div>
  )
}

"use client";
import useUserStore from "@/app/store/useUserStore";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { postInterface } from "@/app/types/post.type";
import ImgCard from "./components/imgCard";
import Link from "next/link";
import { ChangeProfile } from "./components/changeProfile";
import MapLocation from "./components/location";
import { Button } from "@/components/ui/button";
import { accountInterface, bussinessInfoInterface } from "@/app/types/accounts.type";
import { ArtistCalendar } from "./components/artistCalendar";
import ReviewsComponent from "./components/reviews";

export default function Page() {
  
  const { user } = useUserStore()

  const [bussinessInfo, setBussinessInfo] = useState<bussinessInfoInterface | null>(null)
  const [posts, setPosts] = useState<postInterface[]>([])

  const [selectedArtist, setSelectedArtist] = useState<accountInterface | null>(null) 

  const [imgType, setImgType] = useState("studio")

  const { data : bussinessInfoData } = useQuery({
    queryKey : ['bussiness_profile'],
    queryFn : () => axiosInstance.get(`/account/bussinessInfo/${user?._id}`),
  })

  const { data : postsData } = useQuery({
    queryKey : ['artist_post'],
    queryFn : () => axiosInstance.get(`/post/account/${user?._id}`)
  })

  useEffect(() => {
    if(bussinessInfoData?.data) setBussinessInfo(bussinessInfoData?.data)
    if(postsData?.data) setPosts(postsData.data)
  }, [bussinessInfoData, postsData])

  if(!bussinessInfo) return <div> laoding </div>


  const reviews = bussinessInfo.reviews

  const averageRating =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length




  return (
    <div className="w-full h-full min-h-dvh ">
      <div className="w-4/6 h-full  m-auto p-5">

        <div className="w-full flex gap-5 ">
          {/* Profile Image */}
          <div className="flex justify-center">
            <ChangeProfile profile={bussinessInfo.bussiness.profile} />
          </div>

          <div className="flex items-center">

            <div>
              {/* Name */}
              <div>
                <h1 className="text-4xl font-bold">
                  {bussinessInfo.bussiness.name}
                </h1>
              </div>

              <div className="flex gap-1 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={
                    star <= averageRating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                >
                    ★
                </span>
                ))}
              </div>

        
              {/* Bio */}
              <div className="text-lg text-gray-700 ">
                {bussinessInfo.bio || "No bio available"}
              </div>
            </div>
           
          </div>

        </div>

        <div className=" mt-8  flex gap-2">
          <Link href={"/pages/client/profile"}> <Button> Switch to Client </Button> </Link>    
          <Button> Edit Profile </Button>
          <Button> Edit Schedule </Button>
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
            <ReviewsComponent bussinessInfo={bussinessInfo} />
          </div>

          <div className="h-[300px] shadow-lg border rounded p-4">
            <MapLocation bussinessInfo={bussinessInfo} setBussinessInfo={setBussinessInfo} />
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

              <Link href={`/pages/bussiness/post/${post._id}`} >
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

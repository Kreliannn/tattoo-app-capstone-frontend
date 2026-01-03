"use client";
import useUserStore from "@/app/store/useUserStore";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { artistInfoInterface } from "@/app/types/accounts.type";
import { postInterface } from "@/app/types/post.type";
import ImgCard from "./components/imgCard";
import Link from "next/link";
import MapLocation from "./components/location";
import { useParams } from "next/navigation";


export default function Page() {
  
  const params = useParams()
  const artistId = params.id as string

  console.log(artistId)

  const [artistInfo, setArtistInfo] = useState<artistInfoInterface | null>(null)
  const [posts, setPosts] = useState<postInterface[]>([])

  const [imgType, setImgType] = useState("studio")

  const { data : artistInfoData } = useQuery({
    queryKey : ['artist_profile_client'],
    queryFn : () => axiosInstance.get(`/account/artistInfo/${artistId}`),
  })

  const { data : postsData } = useQuery({
    queryKey : ['artist_post_client'],
    queryFn : () => axiosInstance.get(`/post/artist/${artistId}`)
  })

  useEffect(() => {
    if(artistInfoData?.data) setArtistInfo(artistInfoData?.data)
    if(postsData?.data) setPosts(postsData.data)
  }, [artistInfoData, postsData])

  if(!artistInfo) return <div> laoding </div>

 

  return (
    <div className="w-full h-full min-h-dvh ">
      <div className="w-4/6 h-full  m-auto p-5">

        <div className="w-full flex gap-5 ">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={artistInfo.artist.profile}
              alt="artist profile"
              className="w-42 h-42 rounded-full object-cover border cursor-pointer hover:opacity-80 hover:scale-105 transition"
            />
          </div>

          <div className="flex items-center">

            <div>
              {/* Name */}
              <div>
                <h1 className="text-4xl font-bold">
                  {artistInfo.artist.name}
                </h1>
              </div>
        
              {/* Bio */}
              <div className="text-lg text-gray-700 ">
                {artistInfo.bio || "No bio available"}
              </div>
            </div>
           
          </div>
  
        </div>

        <div className="w-full   mt-8">
            <div className="w-auto flex gap-3 mb-5">

              


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


            {imgType == "studio" && <ImgCard type="studio" addImg={true} images={artistInfo.profileImages.filter(item => item.type === "studio").map(item => item.img)} />}
            {imgType == "achievement" && <ImgCard type="achievement" addImg={true} images={artistInfo.profileImages.filter(item => item.type === "achievement").map(item => item.img)} />}
            {imgType == "client" && <ImgCard type="client" addImg={true} images={artistInfo.profileImages.filter(item => item.type === "client").map(item => item.img)} />}
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-8">
          <div className="h-[300px] shadow-lg border rounded p-4">

          </div>

          <div className="h-[300px] shadow-lg border rounded p-4">
            <MapLocation artistInfo={artistInfo} setArtistInfo={setArtistInfo} />
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
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Artist */}
              <div className="flex items-center gap-3">
                <img
                  src={post.artist.profile}
                  alt="artist"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <p className="text-sm text-gray-500">Artist</p>
                  <h1 className="font-semibold text-gray-900">
                    {post.artist.name}
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

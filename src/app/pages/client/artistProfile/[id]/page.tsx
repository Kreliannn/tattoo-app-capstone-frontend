"use client";
import useUserStore from "@/app/store/useUserStore";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { artistInfoInterface } from "@/app/types/accounts.type";
import { postInterface } from "@/app/types/post.type";
import ImgCard from "./components/imgCard";
import Link from "next/link";
import MapLocation from "./components/location";
import { useParams } from "next/navigation";
import { ArtistCalendar } from "./components/artistCalendar";
import ReviewsComponent from "./components/reviews";
import { Button } from "@/components/ui/button";
import { MessageCircle , Skull} from "lucide-react";
import { useRouter } from "next/navigation";
import { errorAlert } from "@/app/utils/alert";

export default function Page() {
  
  const params = useParams()
  const artistId = params.id as string

  const {user} = useUserStore()

  const router = useRouter()


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

  const messageMutation = useMutation({
    mutationFn : () => axiosInstance.post(`/convo/convoId/${artistInfo?.artist._id}`),
    onSuccess : (response) => {
        router.push(`/pages/client/convo/${response.data}`)
    },
    onError : () => errorAlert("error accour")
  })


  if(!artistInfo) return <div> laoding </div>

  const reviews = artistInfo.reviews

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
            <img
              src={artistInfo.artist.profile}
              alt="artist profile"
              className="w-42 h-42 rounded-full object-cover border cursor-pointer hover:opacity-80 hover:scale-105 transition"
            />
          </div>

          <div className="flex items-center">

            <div>
              {/* Name */}
              <div className="flex justify-between w-full ">
                <h1 className="text-4xl font-bold">
                  {artistInfo.artist.name}
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
                {artistInfo.bio || "No bio available"}
              </div>
            </div>
           
          </div>

        
  
        </div>

        {user?._id != artistInfo.artist._id && (
          <div className=" mt-8  flex gap-2 ">
              <Button onClick={() => messageMutation.mutate()}> <MessageCircle /> Message </Button>
              <Button> <Skull /> Report </Button>
          </div>
        )}
          

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


            {imgType == "studio" && <ImgCard type="studio" addImg={true} images={artistInfo.profileImages.filter(item => item.type === "studio").map(item => item.fileUrl)} />}
            {imgType == "achievement" && <ImgCard type="achievement" addImg={true} images={artistInfo.profileImages.filter(item => item.type === "achievement").map(item => item.fileUrl)} />}
            {imgType == "client" && <ImgCard type="client" addImg={true} images={artistInfo.profileImages.filter(item => item.type === "client").map(item => item.fileUrl)} />}
        </div>

        <ArtistCalendar key={artistInfo.artist._id}  artistId={artistInfo.artist._id} />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-8">

          <div className="h-[300px] shadow-lg border rounded p-4 flex flex-col gap-4">
            <ReviewsComponent artistInfo={artistInfo} />
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
                  <p className="text-sm text-gray-500">Artist</p>
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

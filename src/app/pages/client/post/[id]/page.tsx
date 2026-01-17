"use client"

import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { errorAlert , successAlert} from "@/app/utils/alert"
import { useQuery, useMutation } from "@tanstack/react-query"
import axiosInstance from "@/app/utils/axios"
import { useParams } from "next/navigation"
import { postInterface } from "@/app/types/post.type"
import Link from "next/link"
import { Box } from "lucide-react"
import { ArtistBookModal } from "./components/bookModalArtist"
import useUserStore from "@/app/store/useUserStore"
import { useRouter } from "next/navigation"





export default function Page() {

  const { user } = useUserStore()

  const router = useRouter()

  const params = useParams()
  const postId = params.id as string
  
  const [post, setPost] = useState<postInterface | null>(null)

  const { data } = useQuery({
    queryKey : ['view_post'],
    queryFn : () => axiosInstance.get(`/post/${postId}`)
  })

  useEffect(() => {
    if(data?.data) setPost(data?.data)
  }, [data])

  const messageMutation = useMutation({
    mutationFn : () => axiosInstance.post(`/convo/convoId/${post?.account._id}`),
    onSuccess : (response) => {
        router.push(`/pages/client/convo/${response.data}`)
    },
    onError : () => errorAlert("error accour")
  })




  if(!post) return <div> loading </div>

  return (
<div className="w-5/6 mx-auto py-12">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

    {/* LEFT — IMAGE */}
    <div className="w-full">
      <div className="rounded-3xl overflow-hidden border shadow-lg  mb-5">
        <img
          src={post.postImg}
          alt="post"
          className="w-full h-[550px] object-cover"
        />
      </div>


      <div className="border relative rounded-2xl p-6 shadow-sm bg-white flex gap-5">

        {user?._id != post.account._id && <ArtistBookModal key={post._id} post={post} />}
       
        <Link   href={{
            pathname: "/3d",
            query: { img: post.postImg },
        }}>
            <div className="relative group">
                <Button className="  p-2">
                    View 3D
                    <Box className="w-5 h-5" />
                </Button>
            </div>
         </Link>



      </div>

    </div>

    

    {/* RIGHT — DETAILS */}
    <div className="space-y-8">

      {/* Artist Info */}
      <div className="border rounded-2xl p-6 shadow-sm bg-white">
        <Label className="text-lg font-semibold text-gray-700">
          {post.account.type} Information
        </Label>

        <div className="flex items-center gap-5 mt-4">
          <img
            src={post.account.profile}
            alt="artist"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div className="space-y-1">
            <p className="text-xl font-bold text-gray-900">
              {post.account.name}
            </p>
            <p className="text-base text-gray-600">
              {post.account.contact}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="flex gap-3 mt-3">

            {
              post.account.type == "artist" ? (
                <Link href={`/pages/client/artistProfile/${post.account._id}`}>
                  <Button className=" text-lg py-6 mt-2">
                      view artist
                  </Button>
                </Link>
              ) : (
              <Link href={`/pages/client/bussinessProfile/${post.account._id}`}>
                  <Button className=" text-lg py-6 mt-2">
                      view Bussiness
                  </Button>
                </Link>
              )
            }
      

            {user?._id != post.account._id &&(
               <Button className=" text-lg py-6 mt-2" onClick={() => messageMutation.mutate()}>
                  message
              </Button> 
            )}
            
              
        </div>
     
      </div>

      <div className="border rounded-2xl p-6 shadow-sm bg-white space-y-6">

      <div className="flex justify-between">
          <div>
            <Label className="text-lg text-gray-600">Price</Label>
            <p className="text-2xl font-semibold text-green-500">₱{post.price.toLocaleString()}</p>
          </div>

          <div>
            <Label className="text-lg text-gray-600">Category</Label>
            <p className="text-2xl font-semibold text-gray-900">{post.category}</p>
          </div>
      </div>
     

      {/* Sessions */}
      {post.sessions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg text-gray-600">Sessions</Label>
            <Badge variant="secondary" className="text-sm px-2 py-1">
              {post.sessions.length} {post.sessions.length > 1 ? "sessions" : "session"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {post.sessions.map((session, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg flex flex-col gap-1 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <Label className="text-base text-gray-500">
                    Session {index + 1}
                  </Label>
                  <span className="text-gray-400 text-sm">Estimated Time</span>
                </div>
                <p className="text-xl font-semibold text-gray-900">{session} {session != 1 ? "hrs" : "hr"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div>
          <Label className="text-lg text-gray-600">Tags</Label>
          <div className="flex flex-wrap gap-3 mt-2">
            {post.tags.map((tag, index) => (
              <Badge
                key={index}
                className="text-base px-4 py-1"
                variant="secondary"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
      </div>


 
 

    </div>
  </div>
</div>

  )
}

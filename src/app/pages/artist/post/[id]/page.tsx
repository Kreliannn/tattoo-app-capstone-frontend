"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/app/utils/axios"
import { useParams } from "next/navigation"
import { postInterface } from "@/app/types/post.type"
import Link from "next/link"
import { Box, Trash, Edit } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { confirmAlert, successAlert, errorAlert } from "@/app/utils/alert"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { EditPostmodal } from "./components/editPostModal"

export default function Page() {

  const params = useParams()
  const postId = params.id as string

  const router = useRouter()
  
  const [post, setPost] = useState<postInterface | null>(null)

  const { data } = useQuery({
    queryKey : ['view_post'],
    queryFn : () => axiosInstance.get(`/post/${postId}`)
  })

  useEffect(() => {
    if(data?.data) setPost(data?.data)
  }, [data])


  const deleteMutation = useMutation({
    mutationFn : () => axiosInstance.delete(`/post/${post?._id}`),
    onSuccess : () => {
        Swal.fire({
            title: 'Post Deleted',
            text: "you will redirect to your Post",
            icon: 'success',
          }).then(() => {
            router.push("/pages/artist/myPost")
          });
    },
    onError : () => errorAlert("error accour")
  })

  const handleDelete = () => {
    confirmAlert("you want to delete this post?", "delete", () => {
        deleteMutation.mutate()
    })
  }

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


      <div className="border relative rounded-2xl p-6 shadow-sm bg-white space-y-6">
            
        <Link   href={{
            pathname: "/3d",
            query: { img: post.postImg },
        }}>
            <div className="relative group">
                <Button className="  p-2">
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
          Manage post
        </Label>

       
        {/* Action */}
        <div className="flex gap-3">
            <EditPostmodal post={post} setPost={setPost} />
            <Button className=" text-lg py-6 mt-2" onClick={handleDelete}>
                <Trash /> Delete
            </Button>    
        </div>
     
      </div>

          {/* Post Details */}
      <div className="border rounded-2xl p-6 shadow-sm bg-white space-y-6">

        {/* Category */}
        <div>
          <Label className="text-lg text-gray-600">Category</Label>
          <p className="text-2xl font-semibold text-gray-900">{post.category}</p>
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

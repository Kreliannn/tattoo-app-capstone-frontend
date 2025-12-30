"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { errorAlert , successAlert} from "@/app/utils/alert"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/app/utils/axios"
import { useParams } from "next/navigation"
import { postInterface } from "@/app/types/post.type"
import Link from "next/link"
import { Box } from "lucide-react"

export default function Page() {

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

  if(!post) return <div> loading </div>

  return (
<div className="w-5/6 mx-auto py-12">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

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
          Artist Information
        </Label>

        <div className="flex items-center gap-5 mt-4">
          <img
            src={post.artist.profile}
            alt="artist"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div className="space-y-1">
            <p className="text-xl font-bold text-gray-900">
              {post.artist.name}
            </p>
            <p className="text-base text-gray-600">
              {post.artist.contact}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="flex gap-3">
            <Button className=" text-lg py-6 mt-2">
                view artist
            </Button>
            <Button className=" text-lg py-6 mt-2">
                message
            </Button>    
        </div>
     
      </div>

      {/* Post Details */}
      <div className="border rounded-2xl p-6 shadow-sm bg-white space-y-6">

        <div>
          <Label className="text-lg text-gray-600">Category</Label>
          <p className="text-2xl font-semibold text-gray-900">
            {post.category}
          </p>
        </div>

        <div>
          <Label className="text-lg text-gray-600">Estimated Time</Label>
          <p className="text-2xl font-semibold text-gray-900">
            {post.estimatedTime}
          </p>
        </div>

        <div>
          <Label className="text-lg text-gray-600">Number of Sessions</Label>
          <p className="text-2xl font-semibold text-gray-900">
            {post.sessions}
          </p>
        </div>

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

      {/* Reviews */}
      <div className="border rounded-2xl p-6 shadow-sm bg-white space-y-4">
        <Label className="text-lg font-semibold text-gray-700">
          Client Reviews
        </Label>

        {post.reviews.length === 0 && (
          <p className="text-lg text-gray-500">No reviews yet.</p>
        )}

        <div className="space-y-4">
          {post.reviews.map((review, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">
                  {review.client}
                </p>
                <p className="text-lg text-yellow-500">
                  ⭐ {review.rating}/5
                </p>
              </div>

              <p className="text-base text-gray-700">
                {review.comment}
              </p>

              {review.img && (
                <img
                  src={review.img}
                  alt="review"
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      </div>

 

    </div>
  </div>
</div>

  )
}

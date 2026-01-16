"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { postInterface } from "@/app/types/post.type";
import axiosInstance from "@/app/utils/axios";
import useUserStore from "@/app/store/useUserStore";

export default function Page() {

  const { user  } = useUserStore()
  
  const [posts, setPosts] = useState<postInterface[]>([])

  const { data } = useQuery({
    queryKey : ['artist_post'],
    queryFn : () => axiosInstance.get(`/post`)
  })

  useEffect(() => {
      if(data?.data) setPosts(data.data)
  },[data])

  console.log(data?.data)

  return (
    <div className="w-full h-dvh space-y-6 p-4 ">
      <div className="w-full h-20 flex justify-between items-center p-5">
          <Label className="text-2xl font-bold text-stone-900"> Posts </Label>
       
      </div>


      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
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
                className="w-full h-full object-cover  transition-transform duration-300 border"
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
                <Link href={`/pages/client/artistProfile/${post.account._id}`} >
                  <img
                    src={post.account.profile}
                    alt="artist"
                    className="w-10 h-10 rounded-full object-cover border hover:scale-105"
                  />
                </Link>
            
                <div>
                  <p className="text-sm text-gray-500">Artist</p>
                  <h1 className="font-semibold text-gray-900">
                    {post.account.name}
                  </h1>
                </div>
              </div>

              {/* Action */}
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
  );
}

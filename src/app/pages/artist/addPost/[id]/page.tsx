"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ImageIcon,
  Plus,
  X,
  Clock,
  Layers,
  Tag,
  LoaderCircle,
  DollarSign
} from "lucide-react"
import { errorAlert , successAlert} from "@/app/utils/alert"
import { useMutation, useQuery } from "@tanstack/react-query"
import axiosInstance from "@/app/utils/axios"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import useUserStore from "@/app/store/useUserStore"

export default function Page() {

  const [type, setType] = useState("newPost")

  const params = useParams()
  const paramsId = params.id as string


  const { data } = useQuery({
    queryKey : ['work_post'],
    queryFn : () =>  axiosInstance.get(`/works/${paramsId}`),
    enabled: paramsId !== 'new'
  })

  useEffect(() => {
    if(paramsId != "new" && data?.data){
        setType("workPost")
        setPreview(data.data.screenShot)
    }
  }, [data])


  const { user } = useUserStore()

  
  const router = useRouter()

  const [postImg, setPostImg] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])

  const [price, setPrice] = useState(0)

  const [category, setCategory] = useState("")


  const [sessions, setSessions] = useState<number[]>([1])

  const postMutation = useMutation({
    mutationFn : (data : FormData) => axiosInstance.post("/post", data),
    onSuccess : () => {
      
      Swal.fire({
        icon: "success",
        title: "Post created",
        text: "Your post was added successfully"
      }).then(() => {
        router.push("/pages/artist/myPost")
      });

    },
    onError : () => errorAlert("error accour")
  })

  const addTag = () => {
    if(tags.length >= 5) return errorAlert("the maximum tags is 5")
    if (!tagInput.trim() || tags.includes(tagInput.trim())) return errorAlert("invalid")
    setTags([...tags, tagInput.trim()])
    setTagInput("")
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const updateSession = (index: number, value: number) => {
    const updated = [...sessions];
    updated[index] = value;
    setSessions(updated);
  };
  

  const addSession = () => {
    setSessions([...sessions, 1]);
  };
  

  // Remove a session
  const removeSession = (index: number) => {
    if (sessions.length === 1) return;
    setSessions(sessions.filter((_, i) => i !== index));
  };
  

  const handleImageChange = (file: File | null) => {
    setPostImg(file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if(!tags || !category || !sessions) return errorAlert("empty field")
    if(!postImg && type == "newPost" ) return errorAlert("empty field")

    const formData = new FormData()

    formData.append("file", postImg || "none")
    formData.append("tags", JSON.stringify(tags))
    formData.append("category", category)
    formData.append("price", price.toString())
    formData.append("sessions", JSON.stringify(sessions))

    formData.append("type", type)
    formData.append("link", preview || "none")

    postMutation.mutate(formData)
  }

  return (
    <div className="w-4/6 mx-auto py-10 space-y-6">
      <h1 className="text-xl font-semibold">Add Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Image Upload */}
        <div className="space-y-2 ">
       

          <div className=" h-[400px] rounded-md p-4 flex gap-4 items-center ">

            <div className="w-2/6 h-full ">

              <Label className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4" />
                Post Image
              </Label>

                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-[75%] object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-[75%] border rounded flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}

                {type == "newPost" && (
                  <Input
                   type="file"
                   className="mt-2 w-full bg-stone-900 text-white"
                   accept="image/*"
                   onChange={(e) =>
                     handleImageChange(e.target.files?.[0] || null)
                   }
                 />
                )}  
               
            </div>

            <div className="w-4/6 h-full ">
                    
              <div className="space-y-2">
                <Label>Category</Label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger className=" w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realism">Realism</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="blackwork">Blackwork</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                  </SelectContent>
                </Select>
              </div>


               {/* Estimated Time & Sessions */}
               <div className="space-y-2 mt-3">
                <Label className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price
                </Label>

                <div className="flex gap-2">
                  <Input
                    placeholder="Price"
                    value={price}
                    type="number"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>

               
              </div>

              
              
              <div className="space-y-4 mt-5">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Sessions
                  </Label>

                  <Button
                    type="button"
                    onClick={addSession}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Session
                  </Button>
                </div>

                <div className="w-full grid grid-cols-2 gap-2">
                {sessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    {/* Session Label */}
                    <div className="flex items-center gap-2 min-w-[90px]">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Session {index + 1}
                      </span>
                    </div>

                    {/* Input with suffix */}
                    <div className="relative w-full">
                      <Input
                        type="number"
                        min={1}
                        value={session}
                        onChange={(e) =>
                          updateSession(index, Number(e.target.value))
                        }
                        className="pr-12"
                        placeholder="Hours"
                      />

                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {session === 1 ? "hr" : "hrs"}
                      </span>
                    </div>

                    {/* Remove */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSession(index)}
                      disabled={sessions.length === 1}
                      className="text-red-500 hover:text-red-600"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                </div>

                
              </div>


              
              {/* Tags */}
              <div className="space-y-2 mt-5">
                <Label className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </Label>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                  />
                  <Button type="button" onClick={addTag}>
                    <Plus />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="shadow  flex items-center gap-1  hover:text-red-500" onClick={() => removeTag(tag)}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>


              

            </div>
           
          </div>
        </div>

    
      
        <Button type="submit" className="w-full mt-5" disabled={postMutation.isPending}>
         {postMutation.isPending &&   <LoaderCircle className="h-4 w-4 animate-spin" />} Submit Post
        </Button>
      </form>
    </div>
  )
}

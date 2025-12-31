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
 import { Plus, ImageIcon } from "lucide-react"
 import { Input } from "@/components/ui/input"
 import { Label } from "@/components/ui/label"
 import { useMutation } from "@tanstack/react-query"
 import axiosInstance from "@/app/utils/axios"
import { errorAlert, successAlert } from "@/app/utils/alert"
import { useQueryClient } from "@tanstack/react-query"



export function UploadImageModal({ type } : { type : string}) {

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient()

  const [img, setImg] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const uploadMutation = useMutation({
    mutationFn : (data : FormData) => axiosInstance.post("/account/artistInfo/imgUpload", data),
    onSuccess : () => {
        successAlert("image uploaded")
        setOpen(false)
        setImg(null)
        setPreview(null)
        queryClient.invalidateQueries({ queryKey: ["artist_profile"] })
    },
    onError : () => errorAlert("error accour")
  })

  const handleImageChange = (file: File | null) => {
    setImg(file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleUploadImg = () => {
    if(!img) return errorAlert("no selected file")
    const formData = new FormData()
    formData.append("file", img)
    formData.append("type", type)
    uploadMutation.mutate(formData)
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpen(true)}
          className="min-w-[200px]  h-[250px] rounded border-4 border-dashed
          flex items-center justify-center
          text-gray-300 hover:text-black hover:border-black
          cursor-pointer"
        >
          <Plus className="w-10 h-10" />
        </div>
      </DialogTrigger>
  
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="text-center">
          <DialogTitle>Add images to profile</DialogTitle>
        </DialogHeader>
  
        {/* CENTER CONTAINER */}
        <div className="flex justify-center">
          <div className="w-full max-w-[350px] space-y-4">
  
            {/* IMAGE PREVIEW */}
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-[400px] object-cover rounded"
              />
            ) : (
              <div className="w-full h-[400px] border rounded flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
  
            {/* FILE INPUT */}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(e.target.files?.[0] || null)
              }
            />
          </div>
        </div>
  
        <DialogFooter className="flex justify-center">
          <Button className="w-full " onClick={handleUploadImg}> Upload image </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
  
}

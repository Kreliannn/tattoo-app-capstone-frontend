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
import { Plus, ImageIcon, LoaderCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "@/app/utils/axios"
import { errorAlert, successAlert } from "@/app/utils/alert"

export function BussinessVerifiactionModal() {

  const [open, setOpen] = useState(false);

  // Two files now
  const [validId, setValidId] = useState<File | null>(null)
  const [businessPermit, setBusinessPermit] = useState<File | null>(null)

  const [previewValidId, setPreviewValidId] = useState<string | null>(null)
  const [previewBusinessPermit, setPreviewBusinessPermit] = useState<string | null>(null)

  const submitMutation = useMutation({
    mutationFn : (data : FormData) => axiosInstance.post("/account/BussinessVerification/submit", data),
    onSuccess : () => {
        successAlert("Request Submitted")
        setOpen(false)
        setValidId(null)
        setBusinessPermit(null)
        setPreviewValidId(null)
        setPreviewBusinessPermit(null)
    },
    onError : () => errorAlert("Error occurred")
  })

  const handleFileChange = (file: File | null, type: "validId" | "businessPermit") => {
    if (type === "validId") {
      setValidId(file)
      setPreviewValidId(file ? URL.createObjectURL(file) : null)
    } else {
      setBusinessPermit(file)
      setPreviewBusinessPermit(file ? URL.createObjectURL(file) : null)
    }
  }

  const handleSubmit = () => {
    if (!validId || !businessPermit) 
      return errorAlert("Please select both files")

    const formData = new FormData()
    formData.append("validId", validId)
    formData.append("businessPermit", businessPermit)
    submitMutation.mutate(formData)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}> Apply As Business </Button>
      </DialogTrigger>
  
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="text-center">
          <DialogTitle>Upload Documents</DialogTitle>
          <DialogDescription>Wait for Admin approval</DialogDescription>
        </DialogHeader>
  
        {/* CENTER CONTAINER */}
        <div className="flex justify-center">
            <div className="w-full max-w-[450px] grid grid-cols-2 gap-4">

                {/* VALID ID */}
                <div className="flex flex-col items-center space-y-2">
                <Label>Valid ID</Label>
                {previewValidId ? (
                    <img
                    src={previewValidId}
                    alt="valid id preview"
                    className="w-[150px] h-[150px] object-cover rounded border"
                    />
                ) : (
                    <div className="w-[150px] h-[150px] border rounded flex items-center justify-center text-muted-foreground">
                    No image
                    </div>
                )}
                <Input
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileChange(e.target.files?.[0] || null, "validId")}
                    className="text-sm"
                />
                </div>

                {/* BUSINESS PERMIT */}
                <div className="flex flex-col items-center space-y-2">
                <Label>Business Permit</Label>
                {previewBusinessPermit ? (
                    <img
                    src={previewBusinessPermit}
                    alt="business permit preview"
                    className="w-[150px] h-[150px] object-cover rounded border"
                    />
                ) : (
                    <div className="w-[150px] h-[150px] border rounded flex items-center justify-center text-muted-foreground">
                    No image
                    </div>
                )}
                <Input
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileChange(e.target.files?.[0] || null, "businessPermit")}
                    className="text-sm"
                />
                </div>

            </div>
            </div>

  
        <DialogFooter className="flex justify-center">
          <Button disabled={submitMutation.isPending} className="w-full" onClick={handleSubmit}>
            {submitMutation.isPending && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            Submit Documents
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

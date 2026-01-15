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
 import { artistVerificationInterface } from "@/app/types/accounts.type"
 import { useMutation } from "@tanstack/react-query"
 import axiosInstance from "@/app/utils/axios"
 import { successAlert, confirmAlert, errorAlert } from "@/app/utils/alert"
 import { Label } from "@/components/ui/label"

export function BussinessVerificationModal({ artistVerification , setArtistVerification} : { artistVerification : artistVerificationInterface, setArtistVerification : (data : artistVerificationInterface[]) => void}) {

  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn : (data : { verificationId  :string, accountId : string, status : string }) => axiosInstance.post("/account/bussinessVerification/admin", data),
    onSuccess : (response) => {
        successAlert(response.data.alert)
        setArtistVerification(response.data.artistVerifications)
        setOpen(false)
    },
    onError : () => errorAlert("error accour")
  })

  const handleActions = ( status : string) => {
    setOpen(false)
    if(status == "approve"){
      confirmAlert("you want to approve this user?", "approve", () => {
        mutation.mutate({
          verificationId : artistVerification._id,
          accountId : artistVerification.client._id,
          status : "approve"
        })
      })
    } else {
      confirmAlert("you want to Reject this user?", "reject", () => {
        mutation.mutate({
          verificationId : artistVerification._id,
          accountId : artistVerification.client._id,
          status : "reject"
        })
      })
    }
  }

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
            <Button className="flex items-center gap-2 "  onClick={() => setOpen(true)}>
                View
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bussiness Request</DialogTitle>
          <DialogDescription>   
          info
          </DialogDescription>
        </DialogHeader>

    
        <div className="flex justify-center">
          <div className="w-full max-w-[450px] grid grid-cols-2 gap-4">

            {/* VALID ID */}
            <div className="flex flex-col items-center space-y-2">
              <Label>Valid ID</Label>
              <img
                src={artistVerification.validId}
                alt="Valid ID"
                className="w-[150px] h-[150px] object-cover rounded border"
              />
            </div>

            {/* BUSINESS PERMIT */}
            <div className="flex flex-col items-center space-y-2">
              <Label>Business Permit</Label>
              <img
                src={artistVerification.bussinessPermit!}
                alt="Business Permit"
                className="w-[150px] h-[150px] object-cover rounded border"
              />
            </div>

          </div>
        </div>


        <DialogFooter>

          <div className="grid grid-cols-2 w-full gap-1">
            <Button className="bg-green-500 hover:bg-green-600 " onClick={() => handleActions("approve")}>  Approve  </Button>
            <Button className="bg-red-500 hover:bg-red-600 " onClick={() => handleActions("reject")}>  Reject  </Button>
          </div>
        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

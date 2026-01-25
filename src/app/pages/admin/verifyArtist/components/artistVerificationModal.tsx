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
 import Swal from "sweetalert2";

export function ArtistVerificationModal({ artistVerification , setArtistVerification} : { artistVerification : artistVerificationInterface, setArtistVerification : (data : artistVerificationInterface[]) => void}) {

  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn : (data : { verificationId  :string, accountId : string, status : string, reason : string }) => axiosInstance.post("/account/artistVerification/admin", data),
    onSuccess : (response) => {
        successAlert(response.data.alert)
        setArtistVerification(response.data.artistVerifications)
        setOpen(false)
    },
    onError : () => errorAlert("error accour")
  })



  const rejectionReason = async (callBack : (reason : string)  => void) => {
    const { value: reason } = await Swal.fire({
      title: "Reject Transaction",
      html: `
        <label class="swal2-label" style="display:block;text-align:center;margin-bottom:6px;font-weight:600;">
          REASON FOR REJECTION
        </label>
        <textarea
          id="reason"
          class="swal2-textarea"
          placeholder="Enter reason..."
          style="margin-top:0;"
        ></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#000",
      preConfirm: () => {
        const reason = (document.getElementById("reason") as HTMLTextAreaElement)?.value;
        if (!reason.trim()) {
          Swal.showValidationMessage("Reason is required");
        }
        return reason;
      },
    });

    if (reason) {
      callBack(reason)
    }
  };


  const handleActions = ( status : string) => {
    setOpen(false)
    if(status == "approve"){
      confirmAlert("you want to approve this user?", "approve", () => {
        mutation.mutate({
          verificationId : artistVerification._id,
          accountId : artistVerification.client._id,
          status : "approve",
          reason : "none"
        })
      })
    } else {
      confirmAlert("you want to Reject this user?", "reject", () => {
        rejectionReason((reason) => {
          mutation.mutate({
            verificationId : artistVerification._id,
            accountId : artistVerification.client._id,
            status : "reject",
            reason : reason
          })
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
          <DialogTitle>User Valid Id</DialogTitle>
          <DialogDescription>   
           artist request
          </DialogDescription>
        </DialogHeader>

    
        <div className="flex justify-center">
          <div className="w-full max-w-[350px] space-y-4">
  
            <img
                src={artistVerification.validId}
                alt="preview"
                className="w-[300px]  h-[300px] object-cover rounded m-auto"
            />
  
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

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
import { useQuery , useMutation} from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { artistApplicationInterface } from "@/app/types/accounts.type"
import { errorAlert, confirmAlert, successAlert } from "@/app/utils/alert"
import {
    User,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    Users,
  } from "lucide-react"
  import { bussinessInfoInterface } from "@/app/types/accounts.type";




export function ArtistsApplication({userId, setBussinessInfo} : { userId  :string, setBussinessInfo : (data : bussinessInfoInterface) => void | null}) {

  const [open, setOpen] = useState(false);

 

  

  const { data: artistsApplication, refetch } = useQuery({
    queryKey: ['artists_applictions'],
    queryFn: async (): Promise<artistApplicationInterface[]> => {
      const response = await axiosInstance.get(`/account/artistApplication/${userId}`);
      return response.data;
    }
  });


  const approvalMutation = useMutation({
    mutationFn : (data : { artistId : string, action : string, applicationId : string }) => axiosInstance.post("/account/applicationApproval", data),
    onSuccess : (response) => {
        successAlert(`success`)
        setBussinessInfo(response.data)
        refetch()
    },
    onError : () => errorAlert("error accour")
  })

  const actionHander = (artistId : string, applicationId : string, action : "approve" | "reject") => {
    setOpen(false)
    confirmAlert(`you want to ${action} this artist?`, action, () => {
        approvalMutation.mutate({artistId, applicationId, action})
    })
  }

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Artist Requests ({artistsApplication?.length || 0})
        </Button>
      </DialogTrigger>
  
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Artist Requests
          </DialogTitle>
          <DialogDescription>
            Review and approve artist applications
          </DialogDescription>
        </DialogHeader>
  
        {/* Scroll Area */}
        <div className="max-h-[70vh] overflow-y-auto pr-2 ">
          {artistsApplication?.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No artist requests available
            </div>
          ) : (
            <div className="w-full">
              {artistsApplication?.map((application) => (
                <div
                  key={application._id}
                  className="rounded-xl    border mt-2  bg-white p-5 flex flex-col gap-4 w-full"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <img
                      src={application.artist.profile}
                      alt="artist"
                      className="w-14 h-14 rounded-full object-cover border"
                    />
  
                    <div className="space-y-1">
                      <h1 className="flex items-center gap-2 font-semibold">
                        <User className="w-4 h-4" />
                        {application.artist.name}
                      </h1>
  
                      <p className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {application.date}
                      </p>
  
                      <p className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {application.time}
                      </p>
                    </div>
                  </div>
  
                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <Button className="flex-1 flex items-center gap-2" onClick={() => actionHander(application.artist._id, application._id, "approve")}>
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
  
                    <Button
                      variant="destructive"
                      className="flex-1 flex items-center gap-2"
                      onClick={() => actionHander(application.artist._id, application._id, "reject")}
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

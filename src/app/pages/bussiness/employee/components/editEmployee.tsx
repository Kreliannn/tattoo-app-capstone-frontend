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
import { accountInterface , employeeInterface} from "@/app/types/accounts.type"
import { errorAlert, confirmAlert, successAlert } from "@/app/utils/alert"
import {
    Edit,
    Users
  } from "lucide-react"
  import { useEffect } from "react";


  



  const bussinessFeature = [
    "View Dashboard",
    "Manage Bussiness Profile",
    "Manage Artists",
    "Manage Employee",
    "Manage Post",
    "Manage Bookings",
    "Manage Chat",
    "Manage Inventory",
    "View Transactions",
    "View Notifications",
  ]

export function EditEmployee({ refetch, email } : { refetch : () => void, email : string}) {

  const [open, setOpen] = useState(false);

  const { data: employeeData } = useQuery({
    queryKey: ['employee_data'],
    queryFn: async (): Promise<employeeInterface> => {
      const response = await axiosInstance.get(`/account/employee/${email}`);
      return response.data;
    }
  });

  useEffect(() => {
    if (employeeData?.restrictions) {
      setEmployeeRestrictions(employeeData.restrictions);
    }
  }, [employeeData]);

 

  const [employeeRestrictions, setEmployeeRestrictions] = useState<string[] | undefined>(employeeData?.restrictions);

  const toggleRestriction = (feature: string) => {
    setEmployeeRestrictions((prev) => {
      if (!prev) return [feature];
      return prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature];
    });
  };
  


  const AddMutation = useMutation({
    mutationFn : (data : { id : string, restrictions : string[] }) => axiosInstance.put("/account/edit/employee", data),
    onSuccess : (response) => {
        successAlert(`employee updated successfully`)
        refetch()
    },
    onError : () => errorAlert("error accour")
  })

  const updateHandler = () => {
    if(!employeeData || !employeeRestrictions) return errorAlert("error")
    setOpen(false)
    confirmAlert(`update restrictions of this employee?`, "update", () => {
        AddMutation.mutate({id : employeeData?._id, restrictions : employeeRestrictions})
    })
  }

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="flex items-center gap-2">
          <Edit className="w-5 h-5" />
        
        </Button>
      </DialogTrigger>
  
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit Employee
          </DialogTitle>
          <DialogDescription>
           EDIT Employee
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">

            <div className="flex items-center gap-4">
                <img
                    src={employeeData?.account.profile || "/avatar-placeholder.png"}
                    alt={employeeData?.account.name}
                    className="w-16 h-16 rounded-full object-cover border"
                />

                <div>
                    <h1 className="text-lg font-semibold">
                    {employeeData?.account.name}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                    Employee Account
                    </p>
                </div>
            </div>


            <div className="space-y-2">
                <h2 className="font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Employee Restrictions
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bussinessFeature.map((feature) => (
                    <label
                        key={feature}
                        className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer"
                    >
                        <input
                        type="checkbox"
                        checked={employeeRestrictions?.includes(feature)}
                        onChange={() => toggleRestriction(feature)}
                        className="h-4 w-4"
                        />
                        <span className="text-sm">{feature}</span>
                    </label>
                    ))}
                </div>
            </div>


            <div>
                <Button className="w-full" onClick={updateHandler}> Save Changes</Button>
            </div>
        </div>
        


      </DialogContent>
    </Dialog>
  )
}

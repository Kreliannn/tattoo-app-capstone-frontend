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
import { accountInterface } from "@/app/types/accounts.type"
import { errorAlert, confirmAlert, successAlert } from "@/app/utils/alert"
import {
    Plus
  } from "lucide-react"
 




export function AddEmployee({ refetch} : { refetch : () => void}) {

  const [open, setOpen] = useState(false);


  const { data: accountInfos } = useQuery({
    queryKey: ['account_clients'],
    queryFn: async (): Promise<accountInterface[]> => {
      const response = await axiosInstance.get(`/account/clients`);
      return response.data;
    }
  });


  const [search, setSearch] = useState("");

  const filteredAccounts = accountInfos?.filter((acc) =>
    acc.name.toLowerCase().includes(search.toLowerCase())
  );



  const AddMutation = useMutation({
    mutationFn : (data : { employeeId : string, employeeEmail : string }) => axiosInstance.post("/account/add/employee", data),
    onSuccess : (response) => {
        successAlert(`employee successfully added`)
        refetch()
    },
    onError : () => errorAlert("error accour")
  })

  const addHandler = (employeeId : string, employeeEmail : string) => {
    setOpen(false)
    confirmAlert(`you want to add this account as employee?`, "add account", () => {
        AddMutation.mutate({employeeId, employeeEmail})
    })
  }

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Employee
        </Button>
      </DialogTrigger>
  
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Employee
          </DialogTitle>
          <DialogDescription>
           Search Employee
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />

          {/* User List */}
          <div className="max-h-[60vh] h-[60vh] overflow-y-auto space-y-3 pr-2">
            {filteredAccounts?.length === 0 && (
              <p className="text-center text-sm text-muted-foreground">
                No users found
              </p>
            )}

            {filteredAccounts?.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                {/* Left */}
                <div className="flex items-center gap-3">
                  <img
                    src={user.profile}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>

                {/* Add Button */}
                <Button
                  size="sm"
                  onClick={() => addHandler(user._id, user.email)}
                >
                  <Plus /> Add
                </Button>
              </div>
            ))}
          </div>
        </div>


      </DialogContent>
    </Dialog>
  )
}

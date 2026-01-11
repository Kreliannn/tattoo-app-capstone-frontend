import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { inventoryInterfaceInput, inventoryInterface } from "@/app/types/inventory.type"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "@/app/utils/axios"
import { successAlert, errorAlert, confirmAlert } from "@/app/utils/alert"
import useUserStore from "@/app/store/useUserStore"
import { Plus } from "lucide-react"

export function AddItemModal({ setInventory } : { setInventory : (data : inventoryInterface[]) => void }) {

    const [open, setOpen] = useState(false)

    const { user } = useUserStore()

    const [item, setItem] = useState("")
    const [category, setCategory] = useState("")
    const [stocks, setStocks] = useState(0)

    const mutation = useMutation({
        mutationFn : (inventory : inventoryInterfaceInput ) => axiosInstance.post("/inventory", {inventory}),
        onSuccess : (response) => {
            setInventory(response.data)
            successAlert("item added")
            setItem("")
            setCategory("")
            setStocks(0)
            setOpen(false)
        }, onError : () => errorAlert("error accour")
    })

    const addItemHandler = () => {
        if(!user || !item.trim() || !category.trim()) return errorAlert("empty field")
        mutation.mutate({
            artist : user._id,
            item,
            stocks,
            category
        })
    }
    

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger  onClick={() => setOpen(true)}  asChild>
        <Button > <Plus /> Add Item</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Item</SheetTitle>
          <SheetDescription>
            add item to inventory
          </SheetDescription>
        </SheetHeader>
            <div className=" rounded-lg  shadow-sm w-full m-auto h-[800px] overflow-auto p-2 ">

                <div className="mt-3 w-full">
                    <h1 className="font-bold text-stone-600"> Item Name </h1>
                    <Input 
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        placeholder="item name"
                        className="w-full"
                    />
                </div>

                <div className="mt-3 w-full">
                    <h1 className="font-bold text-stone-600"> Category </h1>
                    <Input 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="item category"
                        className="w-full"
                    />
                </div>


                <div className="mt-3 w-full">
                    <h1 className="font-bold text-stone-600">  Stocks </h1>
                    <Input 
                        value={stocks}
                        type="number"
                        onChange={(e) => setStocks(Number(e.target.value))}
                        placeholder="initial stocks"
                        className="w-full"
                    />
                </div>
               
          
            </div>
        <SheetFooter>
          <Button onClick={addItemHandler}>Add Item</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

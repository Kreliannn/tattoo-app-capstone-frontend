"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { useState, useEffect } from "react";
import { inventoryInterface } from "@/app/types/inventory.type";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddItemModal } from "./components/addItemModal";
import { UpdateItemModal } from "./components/updateItemModal";

export default function Page() {
  
  const [inventory, setInventory] = useState<inventoryInterface[]>([])

  const { data } = useQuery({
    queryKey : ['inventory'],
    queryFn : () => axiosInstance.get(`/inventory`)
  })

  useEffect(() => {
    if(data?.data) setInventory(data?.data)
  }, [data])


  return (
    <div className="w-full h-dvh space-y-6 p-4 ">
      
      <div className="w-full h-20 flex justify-between items-center p-5">
          <Label className="text-2xl font-bold text-stone-900">Inventory</Label>
          <AddItemModal setInventory={setInventory} />
      </div>

      <div className="w-full mt-5 grid grid-cols-4 gap-5 ">
          { inventory.map((obj) => ( 
            <div className="p-4 shadow-lg border roudned-lg hover:scale-105 relative" key={obj._id}>
              <div className="w-full flex justify-between">
                <h1 className=" font-bold text-stone-700"> {obj.item}</h1>
                <span  className="text-gray-400" >  {obj.category}</span>
              </div>
             
              <h1 className="text-gray-400"> stocks :
                <span
                  className={`text-xs font-semibold  px-2 py-0.5 rounded-full capitalize ms-3
                    ${(obj.stocks <= 10 && obj.stocks >= 0)  && "bg-red-100 text-red-700 border-2 border-red-500" }
                    ${(obj.stocks <= 30 && obj.stocks >= 10)  && "bg-yellow-100 text-yellow-700 border-2 border-yellow-500"}
                    ${(obj.stocks >= 30)  && "bg-green-100 text-green-700 border-2 border-green-500"}
                  `}
              >
                  {obj.stocks}
              </span>
              </h1>
              <UpdateItemModal setInventory={setInventory} inventory={obj} />
            </div>
          ))   
          }
      </div>

    </div>
  );
}

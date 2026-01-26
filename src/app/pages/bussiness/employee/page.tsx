"use client";
import { Label } from "@/components/ui/label";
import useUserStore from "@/app/store/useUserStore";
import { bussinessInfoInterface } from "@/app/types/accounts.type";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { User, Mail, Phone , Plus} from "lucide-react"
import { Button } from "@/components/ui/button";
import { AddEmployee } from "./components/addEmployee";
import { EditEmployee } from "./components/editEmployee";

export default function Page() {
  const {user} = useUserStore()

  const [bussinessInfo, setBussinessInfo] = useState<bussinessInfoInterface | null>(null)


  const { data : bussinessInfoData , refetch} = useQuery({
    queryKey : ['bussiness_profile'],
    queryFn : () => axiosInstance.get(`/account/bussinessInfo/${user?._id}`),
  })



  useEffect(() => {
    if(bussinessInfoData?.data) setBussinessInfo(bussinessInfoData?.data)
  }, [bussinessInfoData])

  if(!bussinessInfo) return <div> loading </div>

  return (
    <div className="w-full min-h-screen space-y-6 p-5">

      {/* Header */}
      <div className="w-full h-20 flex justify-between items-center p-5">
        <Label className="text-2xl font-bold text-stone-900">Employees</Label>

        <AddEmployee refetch={refetch} />
      </div>


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {bussinessInfo.employees.map((item) => (
          <div
            key={item.employee._id}
            className="bg-white border rounded-xl p-5 shadow-sm flex gap-4"
          >
            {/* Avatar */}
            <img
              src={item.employee.profile}
              alt="employee"
              className="w-16 h-16 rounded-full object-cover border"
            />

            {/* Info */}
            <div className="flex flex-col gap-2">
              <h1 className="flex items-center gap-2 font-semibold text-gray-800">
                <User className="w-4 h-4" />
                {item.employee.name}
              </h1>

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {item.employee.contact}
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {item.employee.email}
              </p>
            </div>

            <div className="flex justify-end   w-full">
                <EditEmployee refetch={refetch} email={item.employee.email} />
            </div>

          
          </div>
        ))}
      </div>


    </div>
  );
}

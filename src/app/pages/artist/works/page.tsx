"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/app/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { worksInterface } from "@/app/types/works.type";
import { useState, useEffect } from "react";
import { WorkModal } from "./components/worksModal";

export default function Page() {
  const [works, setWorks] = useState<worksInterface[]>([]);

  const { data } = useQuery({
    queryKey: ["works"],
    queryFn: () => axiosInstance.get("/works"),
  });

  useEffect(() => {
    if (data?.data) setWorks(data.data);
  }, [data]);

  return (
    <div className="w-full min-h-screen space-y-6 ">
      {/* Header */}
      <div className="w-full h-20 flex justify-between items-center p-5">
        <Label className="text-2xl font-bold text-stone-900">Tattoo Works</Label>
        <Link href={"/canva/new"}>
          <Button size="lg" className="flex items-center justify-center">
            Add Work
            <Plus className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Works Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-5">
        {works.map((work) => (
          <div
            key={work._id}
            className="relative p-3 text-white border  rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-transform duration-200"
          >

            <WorkModal work={work} setWorks={setWorks} />

            <br /> <br />
      

            {/* Screenshot */}
            <div className="w-full h-40 overflow-hidden rounded">
              <img
                src={work.screenShot}
                className="w-full h-full object-cover"
                alt={"Work Screenshot"}
              />
            </div>


           <br /> <br />


            
          </div>
        ))}
      </div>
    </div>
  );
}

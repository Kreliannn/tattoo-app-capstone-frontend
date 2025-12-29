"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
 

  return (
    <div className="w-full h-dvh space-y-6 ">
        <div className="w-full h-20 flex justify-between items-center p-5">
          <Label className="text-xl font-bold text-stone-900"> Tattoo Works </Label>
          <Link href={"/canva/new"}>  <Button size="lg"> <Plus /> Add New </Button> </Link>
        </div>
    </div>
  );
}

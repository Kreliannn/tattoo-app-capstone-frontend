"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Plus } from "lucide-react";


export default function Page() {
 

  return (
    <div className="w-full h-dvh space-y-6 p-4 ">
      <div className="w-full h-20 flex justify-between items-center p-5">
          <Label className="text-2xl font-bold text-stone-900">My Posts</Label>
          <Link href={"/pages/artist/addPost"}>
            <Button size="lg" className="flex items-center justify-center">
              add post <Plus className="w-5 h-5" /> 
            </Button>
          </Link>
      </div>

    </div>
  );
}

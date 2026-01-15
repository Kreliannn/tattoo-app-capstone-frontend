"use client"
import Link from "next/link";
import UnauthorizedPage from "@/components/ui/unauthorizedPage";
import useUserStore from "@/app/store/useUserStore";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarBussiness } from "@/components/ui/sideBarBussiness";

export default function BussinessLayout({ children }: { children: React.ReactNode }) {

    const {user} = useUserStore()

    if(!user || user.type != "bussiness") return <UnauthorizedPage />

    return (
      <div className="flex min-h-screen ">
          <SidebarProvider>
                
                <SidebarBussiness />
               
                <main className="w-full overflow-hidden">
                    <div className="mb-[80px] md:mb-[0px]"> </div>
                    {children}
                </main>
          </SidebarProvider>
      </div>
    );
  }
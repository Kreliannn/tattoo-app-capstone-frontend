"use client"
import Link from "next/link";
import UnauthorizedPage from "@/components/ui/unauthorizedPage";
import useUserStore from "@/app/store/useUserStore";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarArtist } from "@/components/ui/sidebarArtist";

export default function ArtistLayout({ children }: { children: React.ReactNode }) {

    const {user} = useUserStore()

    if(!user || user.type != "artist") return <UnauthorizedPage />

    return (
      <div className="flex min-h-screen ">
          <SidebarProvider>
                
                <SidebarArtist />
               
                <main className="w-full overflow-hidden">
                    <div className="mb-[80px] md:mb-[0px]"> </div>
                    {children}
                </main>
          </SidebarProvider>
      </div>
    );
  }
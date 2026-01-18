"use client"
import Link from "next/link"
import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { } from "lucide-react"
import {
  User,
  Image,
  FileText,
  Calendar,
  MessageCircle,
  Package,
  MapPin,
  LogOut, 
  Menu,
  X 
} from "lucide-react"

const navigationItems = [
  { title: "Profile", url: "/pages/artist/profile", icon: User },
  { title: "Tattoo Works", url: "/pages/artist/works", icon: Image },
  { title: "My Posts", url: "/pages/artist/myPost", icon: FileText },
  { title: "Bookings", url: "/pages/artist/booking", icon: Calendar },
  { title: "Chat", url: "/pages/artist/convos", icon: MessageCircle },
  { title: "Inventory", url: "/pages/artist/inventory", icon: Package },
  { title: "Map", url: "/pages/artist/map", icon: MapPin },
]



interface AppSidebarProps {
  className?: string
}

export function SidebarArtist({ className }: AppSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const queryClient = useQueryClient();

  const router = useRouter()

  const logoutHandler = async () => {
    queryClient.clear();
    localStorage.clear(); 
    sessionStorage.clear();
    router.push("/")
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="lg:hidden bg-white text-black p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 border-b">
        <div className="flex items-center gap-3">
          <div className="aspect-square size-8 overflow-hidden rounded-lg">
            <img src="/web/logo.jpg" alt="Logo" className="object-cover w-full h-full rounded-lg" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Artist</span>
            <span className="text-xs text-gray-500">page</span>
          </div>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-20" onClick={closeMobileMenu}>
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="pt-20 px-4">
              <div className="mb-6">
                <h3 className="text-gray-700 text-sm font-medium mb-3">Section</h3>
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-3 py-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="absolute bottom-6 left-4 right-4">
                  <div
                    onClick={() => {
                      closeMobileMenu()
                      logoutHandler()
                    }}
                    className="flex items-center gap-3 px-3 py-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar className={`hidden lg:flex bg-white border-r ${className}`}>
        {/* Header */}
        <SidebarHeader className="bg-white border-b">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="hover:bg-gray-100">
                <a href="/" className="font-semibold">
                  <div className="aspect-square size-8 overflow-hidden rounded-lg">
                    <img src="/web/logo.jpg" alt="Logo" className="object-cover w-full h-full rounded-lg" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-black">Artist</span>
                    <span className="truncate text-xs text-gray-500">Page</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Navigation */}
        <SidebarContent className="bg-white">
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-700">Section</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="text-black hover:bg-gray-100">
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="bg-white border-t">
          <SidebarMenu>
           
              <SidebarMenuItem  className="text-black">
                <SidebarMenuButton asChild className="hover:bg-gray-100">
                  <div onClick={logoutHandler}>
                    <LogOut />
                    <span>{"Logout"} </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
         
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </>
  )
}

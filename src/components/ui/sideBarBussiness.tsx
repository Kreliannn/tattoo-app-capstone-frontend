"use client"
import Link from "next/link"
import { useEffect, useState, useMemo } from "react"
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
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  MessageCircle,
  Package,
  LogOut, 
  Menu, 
  X,
  Calendar,
  History,
  Bell,
  Users2,
  User
} from "lucide-react"
import useUserStore from "@/app/store/useUserStore"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/app/utils/axios"
import { employeeInterface } from "@/app/types/accounts.type"

const NAV_ITEMS = [
  { feature: "View Dashboard", title: "Dashboard", url: "/pages/bussiness/dashboard", icon: LayoutDashboard },
  { feature: "Manage Bussiness Profile", title: "Bussiness Profile", url: "/pages/bussiness/profile", icon: Building2 },
  { feature: "Manage Artists", title: "Artists", url: "/pages/bussiness/artists", icon: Users },
  { feature: "Manage Employee", title: "Employee", url: "/pages/bussiness/employee", icon: Users2 },
  { feature: "Manage Post", title: "Post", url: "/pages/bussiness/myPost", icon: FileText },
  { feature: "Manage Bookings", title: "Bookings", url: "/pages/bussiness/bookings", icon: Calendar },
  { feature: "Manage Chat", title: "Chat", url: "/pages/bussiness/convos", icon: MessageCircle },
  { feature: "Manage Inventory", title: "Inventory", url: "/pages/bussiness/inventory", icon: Package },
  { feature: "View Transactions", title: "Transactions", url: "/pages/bussiness/transactions", icon: History },
  { feature: "View Notifications", title: "Notifications", url: "/pages/bussiness/notifications", icon: Bell },
];


interface AppSidebarProps {
  className?: string
}

export function SidebarBussiness({ className }: AppSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const {user} = useUserStore()


  const { data: employeeData } = useQuery({
    queryKey: ['employee_data'],
    queryFn: async (): Promise<employeeInterface> => {
      const response = await axiosInstance.get(`/account/employee/${user?.email}`);
      return response.data;
    },
    enabled: user?.type === "employee",
  });

  const filteredNavigationItems = useMemo(() => {
    // ✅ NOT employee → show all
    if (user?.type !== "employee") {
      return NAV_ITEMS;
    }
  
    // ⏳ employee but data not loaded yet
    if (!employeeData?.restrictions) {
      return [];
    }
  
    // 👮 employee → restricted view
    return NAV_ITEMS.filter(item =>
      employeeData.restrictions.includes(item.feature)
    );
  }, [user?.type, employeeData]);
  


 
  

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
            <span className="font-semibold text-sm">Bussiness</span>
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
                  {user?.type == "employee" && (
                   <Link
                     href={"/pages/bussiness/home"}
                     onClick={closeMobileMenu}
                     className="flex items-center gap-3 px-3 py-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
                   >
                     <User size={20} />
                     <span> Home </span>
                   </Link>
                  )}
                  {filteredNavigationItems.map((item) => (
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
                    <span className="truncate font-semibold text-black">Bussiness</span>
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
                {user?.type == "employee" && (
                  <SidebarMenuItem >
                   <SidebarMenuButton asChild className="text-black hover:bg-gray-100">
                     <Link href={"/pages/bussiness/home"}>
                       <User />
                       <span>Home</span>
                     </Link>
                   </SidebarMenuButton>
                 </SidebarMenuItem>
                )}
                {filteredNavigationItems.map((item) => (
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

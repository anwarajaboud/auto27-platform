"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, BarChart3, Menu } from "lucide-react"

export default function AdminHeader() {
  const [adminEmail, setAdminEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem("adminEmail") || ""
    setAdminEmail(email)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated")
    localStorage.removeItem("adminEmail")
    router.push("/admin")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FFDD00] rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-black">A27</span>
            </div>
            <div>
              <span className="text-xl font-bold text-[#444444]">Auto27 Administration</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/dashboard")}
              className="text-[#444444] hover:text-[#FFDD00] hover:bg-yellow-50"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => router.push("/admin/dashboard")}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

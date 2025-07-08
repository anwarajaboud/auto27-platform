"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut, Home } from "lucide-react"

export default function Header() {
  const [language, setLanguage] = useState("fr")
  const router = useRouter()

  useEffect(() => {
    const savedLanguage = localStorage.getItem("userLanguage") || "fr"
    setLanguage(savedLanguage)
  }, [])

  const translations = {
    fr: {
      home: "Accueil",
      profile: "Profil",
      admin: "Admin",
      logout: "Déconnexion",
    },
    en: {
      home: "Home",
      profile: "Profile",
      admin: "Admin",
      logout: "Logout",
    },
    ar: {
      home: "الرئيسية",
      profile: "الملف الشخصي",
      admin: "الإدارة",
      logout: "تسجيل الخروج",
    },
  }

  const t = translations[language as keyof typeof translations]

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userLanguage")
    router.push("/")
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
            <span className="text-xl font-bold text-[#444444]">Auto27</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="text-[#444444] hover:text-[#FFDD00] hover:bg-yellow-50"
            >
              <Home className="w-4 h-4 mr-2" />
              {t.home}
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/profile")}
              className="text-[#444444] hover:text-[#FFDD00] hover:bg-yellow-50"
            >
              <User className="w-4 h-4 mr-2" />
              {t.profile}
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              {t.logout}
            </Button>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <Home className="w-4 h-4 mr-2" />
                  {t.home}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="w-4 h-4 mr-2" />
                  {t.profile}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

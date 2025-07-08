"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Phone, Mail, User, Globe } from "lucide-react"

export default function Profile() {
  const [language, setLanguage] = useState("fr")
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    // Suppression de la vérification admin
    // const isAdmin = localStorage.getItem("isAdminAuthenticated")

    if (!isAuthenticated) {
      router.push("/")
      return
    }

    const savedLanguage = localStorage.getItem("userLanguage") || "fr"
    setLanguage(savedLanguage)
  }, [router])

  const translations = {
    fr: {
      title: "Mon Profil",
      personalInfo: "Informations personnelles",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone",
      language: "Langue préférée",
      upcomingAppointments: "Rendez-vous à venir",
      date: "Date",
      time: "Heure",
      services: "Services",
      noAppointments: "Aucun rendez-vous programmé",
    },
    en: {
      title: "My Profile",
      personalInfo: "Personal Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      language: "Preferred Language",
      upcomingAppointments: "Upcoming Appointments",
      date: "Date",
      time: "Time",
      services: "Services",
      noAppointments: "No appointments scheduled",
    },
    ar: {
      title: "ملفي الشخصي",
      personalInfo: "المعلومات الشخصية",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      language: "اللغة المفضلة",
      upcomingAppointments: "المواعيد القادمة",
      date: "التاريخ",
      time: "الوقت",
      services: "الخدمات",
      noAppointments: "لا توجد مواعيد مجدولة",
    },
  }

  const t = translations[language as keyof typeof translations]

  // Mock user data
  const userData = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    language: language === "fr" ? "Français" : language === "en" ? "English" : "العربية",
  }

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:00",
      services: ["Vidange", "Contrôle technique"],
    },
    {
      id: 2,
      date: "2024-01-22",
      time: "14:30",
      services: ["Révision complète"],
    },
    {
      id: 3,
      date: "2024-02-05",
      time: "09:15",
      services: ["Changement pneus", "Équilibrage"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#444444] mb-8">{t.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-[#444444]">
                <User className="w-5 h-5 mr-2" />
                {t.personalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{t.firstName}</p>
                  <p className="font-medium">{userData.firstName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{t.lastName}</p>
                  <p className="font-medium">{userData.lastName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{t.email}</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{t.phone}</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{t.language}</p>
                  <p className="font-medium">{userData.language}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-[#444444]">
                <Calendar className="w-5 h-5 mr-2" />
                {t.upcomingAppointments}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-[#FFDD00]" />
                          <span className="font-medium">{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-[#FFDD00]" />
                          <span className="text-sm text-gray-600">{appointment.time}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {appointment.services.map((service, index) => (
                          <Badge key={index} variant="secondary" className="bg-[#FFDD00] text-black">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">{t.noAppointments}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

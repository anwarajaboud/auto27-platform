"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter, Calendar, Users, Clock, FileText } from "lucide-react"
import Footer from "@/components/footer"

export default function Admin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [language, setLanguage] = useState("fr")
  const [dateFilter, setDateFilter] = useState("")
  const router = useRouter()

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate admin login validation
    if (email && password) {
      localStorage.setItem("isAdminAuthenticated", "true")
      localStorage.setItem("adminEmail", email)
      router.push("/admin/dashboard")
    }
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated")
    if (!isAuthenticated) {
      router.push("/admin")
      return
    }

    const savedLanguage = localStorage.getItem("userLanguage") || "fr"
    setLanguage(savedLanguage)
  }, [router])

  const translations = {
    fr: {
      title: "Tableau de bord Admin",
      allAppointments: "Tous les rendez-vous",
      filterByDate: "Filtrer par date",
      exportPDF: "Exporter PDF",
      exportExcel: "Exporter Excel",
      clientName: "Nom du client",
      phone: "Téléphone",
      email: "Email",
      dateTime: "Date et heure",
      services: "Services",
      status: "Statut",
      confirmed: "Confirmé",
      pending: "En attente",
      completed: "Terminé",
      totalAppointments: "Total rendez-vous",
      todayAppointments: "Aujourd'hui",
      thisWeek: "Cette semaine",
    },
    en: {
      title: "Admin Dashboard",
      allAppointments: "All Appointments",
      filterByDate: "Filter by date",
      exportPDF: "Export PDF",
      exportExcel: "Export Excel",
      clientName: "Client Name",
      phone: "Phone",
      email: "Email",
      dateTime: "Date & Time",
      services: "Services",
      status: "Status",
      confirmed: "Confirmed",
      pending: "Pending",
      completed: "Completed",
      totalAppointments: "Total Appointments",
      todayAppointments: "Today",
      thisWeek: "This Week",
    },
    ar: {
      title: "لوحة تحكم الإدارة",
      allAppointments: "جميع المواعيد",
      filterByDate: "تصفية حسب التاريخ",
      exportPDF: "تصدير PDF",
      exportExcel: "تصدير Excel",
      clientName: "اسم العميل",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      dateTime: "التاريخ والوقت",
      services: "الخدمات",
      status: "الحالة",
      confirmed: "مؤكد",
      pending: "في الانتظار",
      completed: "مكتمل",
      totalAppointments: "إجمالي المواعيد",
      todayAppointments: "اليوم",
      thisWeek: "هذا الأسبوع",
    },
  }

  const t = translations[language as keyof typeof translations]

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      clientName: "Jean Dupont",
      phone: "+33 6 12 34 56 78",
      email: "jean.dupont@email.com",
      date: "2024-01-15",
      time: "10:00",
      services: ["Vidange", "Contrôle technique"],
      status: "confirmed",
    },
    {
      id: 2,
      clientName: "Marie Martin",
      phone: "+33 6 98 76 54 32",
      email: "marie.martin@email.com",
      date: "2024-01-15",
      time: "14:30",
      services: ["Révision complète"],
      status: "pending",
    },
    {
      id: 3,
      clientName: "Pierre Durand",
      phone: "+33 6 11 22 33 44",
      email: "pierre.durand@email.com",
      date: "2024-01-16",
      time: "09:15",
      services: ["Changement pneus", "Équilibrage"],
      status: "completed",
    },
    {
      id: 4,
      clientName: "Sophie Leroy",
      phone: "+33 6 55 66 77 88",
      email: "sophie.leroy@email.com",
      date: "2024-01-16",
      time: "11:00",
      services: ["Diagnostic électronique"],
      status: "confirmed",
    },
    {
      id: 5,
      clientName: "Ahmed Ben Ali",
      phone: "+33 6 99 88 77 66",
      email: "ahmed.benali@email.com",
      date: "2024-01-17",
      time: "15:30",
      services: ["Réparation freins", "Vidange"],
      status: "pending",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: t.confirmed, className: "bg-green-100 text-green-800" },
      pending: { label: t.pending, className: "bg-yellow-100 text-yellow-800" },
      completed: { label: t.completed, className: "bg-blue-100 text-blue-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const handleExportPDF = () => {
    // Simulate PDF export
    alert("Export PDF en cours...")
  }

  const handleExportExcel = () => {
    // Simulate Excel export
    alert("Export Excel en cours...")
  }

  const filteredAppointments = dateFilter ? appointments.filter((apt) => apt.date === dateFilter) : appointments

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-[#FFDD00] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-black">A27</span>
            </div>
            <h1 className="text-3xl font-bold text-[#444444]">Auto27 Administration</h1>
            <p className="text-sm text-gray-600 mt-1">Tableau de bord administrateur</p>
          </div>

          {/* Admin Login Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#444444]">Connexion Administrateur</CardTitle>
              <CardDescription>Connectez-vous à l'espace d'administration</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <Label htmlFor="adminEmail">Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                    placeholder="admin@auto27.com"
                  />
                </div>
                <div>
                  <Label htmlFor="adminPassword">Mot de passe</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#FFDD00] hover:bg-[#F9C900] text-black font-semibold">
                  Se connecter en tant qu'admin
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-[#FFDD00]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{t.totalAppointments}</p>
                    <p className="text-2xl font-bold text-[#444444]">{appointments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-[#FFDD00]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{t.todayAppointments}</p>
                    <p className="text-2xl font-bold text-[#444444]">
                      {appointments.filter((apt) => apt.date === "2024-01-15").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-[#FFDD00]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{t.thisWeek}</p>
                    <p className="text-2xl font-bold text-[#444444]">{appointments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <CardTitle className="text-[#444444]">{t.allAppointments}</CardTitle>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <Input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      placeholder={t.filterByDate}
                      className="w-40"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={handleExportPDF}
                      variant="outline"
                      size="sm"
                      className="border-[#FFDD00] text-[#444444] hover:bg-[#FFDD00] hover:text-black bg-transparent"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {t.exportPDF}
                    </Button>
                    <Button
                      onClick={handleExportExcel}
                      variant="outline"
                      size="sm"
                      className="border-[#FFDD00] text-[#444444] hover:bg-[#FFDD00] hover:text-black bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t.exportExcel}
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.clientName}</TableHead>
                      <TableHead>{t.phone}</TableHead>
                      <TableHead>{t.email}</TableHead>
                      <TableHead>{t.dateTime}</TableHead>
                      <TableHead>{t.services}</TableHead>
                      <TableHead>{t.status}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.clientName}</TableCell>
                        <TableCell>{appointment.phone}</TableCell>
                        <TableCell>{appointment.email}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{appointment.date}</div>
                            <div className="text-sm text-gray-500">{appointment.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {appointment.services.map((service, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Link to client space */}
          <div className="text-center mt-6">
            <Button variant="ghost" onClick={() => router.push("/")} className="text-[#444444] hover:text-[#FFDD00]">
              Accéder à l'espace client
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

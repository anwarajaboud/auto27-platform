"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminHeader from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter, Calendar, Clock, FileText, Check, X, CheckCircle } from "lucide-react"
import Footer from "@/components/footer"

export default function AdminDashboard() {
  const [dateFilter, setDateFilter] = useState("")
  const router = useRouter()

  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated")
    if (!isAdminAuthenticated) {
      router.push("/admin")
      return
    }
  }, [router])

  // State pour gérer les rendez-vous avec mise à jour en temps réel
  const [appointments, setAppointments] = useState([
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
    {
      id: 6,
      clientName: "Claire Dubois",
      phone: "+33 6 77 88 99 00",
      email: "claire.dubois@email.com",
      date: "2024-01-18",
      time: "16:00",
      services: ["Révision"],
      status: "cancelled",
    },
  ])

  // Fonction améliorée pour l'affichage des statuts et actions
  const getStatusDisplay = (appointment: any) => {
    const updateAppointmentStatus = (id: number, newStatus: string) => {
      const confirmationMessages = {
        confirmed: "confirmer",
        cancelled: "annuler",
        completed: "marquer comme terminé",
      }

      const confirmed = window.confirm(
        `Voulez-vous vraiment ${confirmationMessages[newStatus as keyof typeof confirmationMessages]} ce rendez-vous ?`,
      )

      if (confirmed) {
        setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt)))
      }
    }

    const statusConfig = {
      pending: {
        label: "En attente",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      confirmed: {
        label: "Confirmé",
        className: "bg-green-100 text-green-800 border-green-200",
      },
      completed: {
        label: "Terminé",
        className: "bg-blue-100 text-blue-800 border-blue-200",
      },
      cancelled: {
        label: "Annulé",
        className: "bg-red-100 text-red-800 border-red-200",
      },
    }

    const config = statusConfig[appointment.status as keyof typeof statusConfig]

    return (
      <div className="space-y-2">
        {/* Badge de statut */}
        <Badge className={`${config.className} border font-medium`}>{config.label}</Badge>

        {/* Boutons d'action contextuels */}
        {appointment.status === "pending" && (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 h-7 text-xs font-medium flex items-center space-x-1 transition-colors"
            >
              <Check className="w-3 h-3" />
              <span>Confirmer</span>
            </Button>
            <Button
              size="sm"
              onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 h-7 text-xs font-medium flex items-center space-x-1 transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Annuler</span>
            </Button>
          </div>
        )}

        {appointment.status === "confirmed" && (
          <div className="flex">
            <Button
              size="sm"
              onClick={() => updateAppointmentStatus(appointment.id, "completed")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 h-7 text-xs font-medium flex items-center space-x-1 transition-colors"
            >
              <CheckCircle className="w-3 h-3" />
              <span>Marquer terminé</span>
            </Button>
          </div>
        )}

        {/* Pas de boutons pour les statuts "completed" et "cancelled" - lecture seule */}
      </div>
    )
  }

  const handleExportPDF = () => {
    alert("Export PDF en cours...")
  }

  const handleExportExcel = () => {
    alert("Export Excel en cours...")
  }

  const filteredAppointments = dateFilter ? appointments.filter((apt) => apt.date === dateFilter) : appointments

  // Calcul des statistiques en temps réel
  const stats = {
    total: appointments.length,
    today: appointments.filter((apt) => apt.date === "2024-01-15").length,
    pending: appointments.filter((apt) => apt.status === "pending").length,
    confirmed: appointments.filter((apt) => apt.status === "confirmed").length,
    completed: appointments.filter((apt) => apt.status === "completed").length,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#444444] mb-8">Tableau de bord Administration</h1>

        {/* Stats Cards avec données en temps réel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-[#FFDD00]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total rendez-vous</p>
                  <p className="text-2xl font-bold text-[#444444]">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Check className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Confirmés</p>
                  <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Terminés</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <CardTitle className="text-[#444444]">Gestion des rendez-vous</CardTitle>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <Input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    placeholder="Filtrer par date"
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
                    Exporter PDF
                  </Button>
                  <Button
                    onClick={handleExportExcel}
                    variant="outline"
                    size="sm"
                    className="border-[#FFDD00] text-[#444444] hover:bg-[#FFDD00] hover:text-black bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exporter Excel
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
                    <TableHead>Nom du client</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date et heure</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead className="w-48">Statut & Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id} className="hover:bg-gray-50">
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
                      <TableCell className="align-top">{getStatusDisplay(appointment)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

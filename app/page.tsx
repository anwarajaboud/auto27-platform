"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "@/components/footer"

export default function AuthPage() {
  const [language, setLanguage] = useState("fr")
  const router = useRouter()

  const translations = {
    fr: {
      login: "Connexion",
      signup: "Inscription",
      email: "Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      firstName: "Prénom",
      lastName: "Nom",
      phone: "Téléphone",
      loginBtn: "Se connecter",
      signupBtn: "Créer un compte",
      language: "Langue",
      welcome: "Bienvenue sur Auto27",
      loginDesc: "Connectez-vous à votre compte",
      signupDesc: "Créez votre compte Auto27",
    },
    en: {
      login: "Login",
      signup: "Sign Up",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone",
      loginBtn: "Sign In",
      signupBtn: "Create Account",
      language: "Language",
      welcome: "Welcome to Auto27",
      loginDesc: "Sign in to your account",
      signupDesc: "Create your Auto27 account",
    },
    ar: {
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      phone: "الهاتف",
      loginBtn: "دخول",
      signupBtn: "إنشاء حساب",
      language: "اللغة",
      welcome: "مرحباً بك في Auto27",
      loginDesc: "سجل دخولك إلى حسابك",
      signupDesc: "أنشئ حساب Auto27 الخاص بك",
    },
  }

  const t = translations[language as keyof typeof translations]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userLanguage", language)
    router.push("/dashboard")
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate signup
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userLanguage", language)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-[#FFDD00] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-black">A27</span>
            </div>
            <h1 className="text-3xl font-bold text-[#444444]">{t.welcome}</h1>
            <p className="text-sm text-gray-600 mt-1"></p>
          </div>

          {/* Language Selector */}
          <div className="mb-6">
            <Label htmlFor="language" className="text-[#444444]">
              {t.language}
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="data-[state=active]:bg-[#FFDD00] data-[state=active]:text-black">
                {t.login}
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-[#FFDD00] data-[state=active]:text-black">
                {t.signup}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#444444]">{t.login}</CardTitle>
                  <CardDescription>{t.loginDesc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">{t.email}</Label>
                      <Input id="email" type="email" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="password">{t.password}</Label>
                      <Input id="password" type="password" required className="mt-1" />
                    </div>
                    <Button type="submit" className="w-full bg-[#FFDD00] hover:bg-[#F9C900] text-black font-semibold">
                      {t.loginBtn}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#444444]">{t.signup}</CardTitle>
                  <CardDescription>{t.signupDesc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">{t.firstName}</Label>
                        <Input id="firstName" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">{t.lastName}</Label>
                        <Input id="lastName" required className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">{t.phone}</Label>
                      <Input id="phone" type="tel" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="signupEmail">{t.email}</Label>
                      <Input id="signupEmail" type="email" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="signupPassword">{t.password}</Label>
                      <Input id="signupPassword" type="password" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                      <Input id="confirmPassword" type="password" required className="mt-1" />
                    </div>
                    <Button type="submit" className="w-full bg-[#FFDD00] hover:bg-[#F9C900] text-black font-semibold">
                      {t.signupBtn}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  )
}

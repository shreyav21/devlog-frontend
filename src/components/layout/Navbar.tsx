"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PenLine, Menu, BookOpen, LayoutDashboard, LogOut, User } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 bg-zinc-900 rounded-md flex items-center justify-center">
              <BookOpen size={14} className="text-white" />
            </div>
            <span className="font-serif font-bold text-lg text-zinc-900 tracking-tight">
              DevLog
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? "text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-zinc-600 hover:text-zinc-900"
                  onClick={() => router.push("/write")}
                >
                  <PenLine size={15} />
                  Write
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="outline-none">
                      <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-transparent hover:ring-zinc-200 transition-all">
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback className="bg-zinc-900 text-white text-xs font-medium">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-zinc-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-zinc-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard")}
                      className="gap-2 cursor-pointer"
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push(`/u/${user?.username}`)}
                      className="gap-2 cursor-pointer"
                    >
                      <User size={14} />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <LogOut size={14} />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-600"
                  onClick={() => router.push("/auth/login")}
                >
                  Sign in
                </Button>
                <Button
                  size="sm"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-5"
                  onClick={() => router.push("/auth/register")}
                >
                  Get started
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-zinc-600">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-white">
              <div className="flex flex-col gap-1 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-zinc-100 my-3" />
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/write"
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                    >
                      <PenLine size={14} />
                      Write
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setMobileOpen(false) }}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 w-full text-left"
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium bg-zinc-900 text-white text-center rounded-lg"
                    >
                      Get started
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}
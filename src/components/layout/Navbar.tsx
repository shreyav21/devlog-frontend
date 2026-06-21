"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  PenLine,
  Menu,
  BookOpen,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [{ label: "Blog", href: "/blog" }];

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#08110f]/80 backdrop-blur-xl border-b border-emerald-500/10"
          : "bg-transparent",
      )}
    >
      <div
        className="
    absolute
    inset-0
    pointer-events-none
    opacity-50
  "
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(16,185,129,.08), transparent 25%)",
        }}
      />
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="
    w-8 h-8
    rounded-lg
    flex items-center justify-center
    bg-gradient-to-br
    from-emerald-500
    to-teal-500
    shadow-lg shadow-emerald-500/20
  "
              >
                <BookOpen size={15} className="text-white" />
              </div>

              <span
                className="
    text-xl
    font-black
    tracking-tight
    text-white
  "
              >
                DevLog
              </span>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 relative group",
                    pathname === link.href
                      ? "text-emerald-400"
                      : "text-[var(--text-secondary)] hover:text-white",
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <AnimatePresence mode="wait">
              {isAuthenticated ? (
                <motion.div
                  key="authenticated"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="
gap-2
text-[var(--text-secondary)]
hover:text-emerald-400
"
                      onClick={() => router.push("/write")}
                    >
                      <PenLine size={15} />
                      Write
                    </Button>
                  </motion.div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="outline-none"
                      >
                        <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-transparent hover:ring-emerald-500/30 transition-all">
                          <AvatarImage src={user?.avatarUrl} />
                          <AvatarFallback
                            className="
bg-gradient-to-br
from-emerald-500
to-teal-500
text-white
text-xs
font-medium
"
                          >
                            {user?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="
    w-56
    bg-[#0b1210]
    border
    border-emerald-500/10
    text-zinc-300
    backdrop-blur-xl
  "
                    >
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium text-zinc-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] truncate">
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
                </motion.div>
              ) : (
                <motion.div
                  key="unauthenticated"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[var(--text-secondary)]
hover:text-white"
                      onClick={() => router.push("/auth/login")}
                    >
                      Sign in
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      size="sm"
                      className="
bg-gradient-to-r
from-emerald-500
to-teal-500
hover:from-emerald-400
hover:to-teal-400
text-white
rounded-full
px-6
shadow-lg
shadow-emerald-500/20
"
                      onClick={() => router.push("/auth/register")}
                    >
                      Get started
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="text-zinc-600">
                  <Menu size={20} />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="
    w-72
    bg-[#09090b]
    border-l
    border-emerald-500/10
  "
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                  },
                }}
                className="flex flex-col gap-1 mt-8"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-zinc-100 my-3" />
                {isAuthenticated ? (
                  <>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href="/write"
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                      >
                        <PenLine size={14} />
                        Write
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                      >
                        <LayoutDashboard size={14} />
                        Dashboard
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileOpen(false);
                        }}
                        className="px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 w-full text-left"
                      >
                        <LogOut size={14} />
                        Sign out
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href="/auth/login"
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 block"
                      >
                        Sign in
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href="/auth/register"
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2.5 rounded-lg text-sm font-medium bg-[var(--bg-secondary)] text-white text-center rounded-lg block"
                      >
                        Get started
                      </Link>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

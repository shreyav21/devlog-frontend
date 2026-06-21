"use client"

import Link from "next/link"
import { useState } from "react"
import { useLogin } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react"

export default function LoginPage () {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false);
    const [error,setError] = useState("");

    const {mutate:login,isPending} = useLogin()

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        setError("")
        login({
            email,password
        },
        {
            onError:(err:any) => {
                setError(
                    err.response?.data?.message || "Invalid email or password"
                )
            }
        }
    )
    }

    return (
      <main className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "var(--bg-secondary)" }}
              >
                <BookOpen size={15} className="text-white" />
              </div>

              <span
                className="font-serif font-bold text-xl"
                style={{ color: "var(--text-primary)" }}
              >
                DevLog
              </span>
            </Link>
          </div>

          {/* Back Button */}
          <Link
            href="/"
            className="fixed top-24 left-8 flex items-center gap-2 text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1
              className="font-serif font-bold text-2xl mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Welcome back
            </h1>

            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Email
              </label>

              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
            h-11
            rounded-xl
            border
            bg-transparent
            text-white
            placeholder:text-slate-500
            focus-visible:ring-1
          "
                style={{
                  borderColor: "var(--border)",
                }}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Password
              </label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="
              h-11
              rounded-xl
              border
              bg-transparent
              text-white
              placeholder:text-slate-500
              pr-10
              focus-visible:ring-1
            "
                  style={{
                    borderColor: "var(--border)",
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              transition-colors
            "
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              className="
          w-full
          h-11
          rounded-xl
          font-medium
          text-white
          border-0
          transition-all
          duration-300
          hover:scale-[1.02]
        "
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                boxShadow: "0 10px 25px rgba(125,145,175,0.20)",
              }}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={15} className="animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 flex justify-center">
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold transition-colors"
                style={{ color: "var(--accent-primary)" }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    )

}
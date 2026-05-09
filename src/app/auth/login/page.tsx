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
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <BookOpen size={15} className="text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-zinc-900">
              DevLog
            </span>
          </Link>
        </div>

        {/* Heading */}
        {/* Back to home */}
<div className="flex justify-center mb-4">
  <Link
    href="/"
    className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
  >
    <ArrowLeft size={14} />
    Back to home
  </Link>
</div>

<div className="text-center mb-8">
  <h1 className="font-serif font-bold text-2xl text-zinc-900 mb-1">
    Welcome back
  </h1>
  <p className="text-sm text-zinc-500">
    Sign in to your account to continue
  </p>
</div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 rounded-xl border-zinc-200 bg-zinc-50 text-sm focus-visible:ring-zinc-300"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-xl border-zinc-200 bg-zinc-50 text-sm pr-10 focus-visible:ring-zinc-300"
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium"
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
        <p className="text-center text-sm text-zinc-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-zinc-900 hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </main>
    )

}
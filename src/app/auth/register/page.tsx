"use client"

import Link from "next/link"
import { useState } from "react"
import { useRegister } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { RegisterRequest } from "@/types/auth"

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    username: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const { mutate: register, isPending } = useRegister()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  register(form, {
    onSuccess: (data) => {
      console.log("Registered:", data);
      // redirect or show success
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Something went wrong");
    },
  });
};

  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="w-full max-w-sm">
            <div className="flex justify-center mb-4">
  <Link
    href="/"
    className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
  >
    <ArrowLeft size={14} />
    Back to home
  </Link>
</div>
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
        <div className="text-center mb-8">
          <h1 className="font-serif font-bold text-2xl text-zinc-900 mb-1">
            Create your account
          </h1>
          <p className="text-sm text-zinc-500">
            Start writing and sharing today
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
              Full name
            </label>
            <Input
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              className="h-11 rounded-xl border-zinc-200 bg-zinc-50 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">
                @
              </span>
              <Input
                name="username"
                placeholder="johndoe"
                value={form.username}
                onChange={handleChange}
                required
                className="h-11 rounded-xl border-zinc-200 bg-zinc-50 text-sm pl-7"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700">
              Email
            </label>
            <Input
              name="email"
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={handleChange}
              required
              className="h-11 rounded-xl border-zinc-200 bg-zinc-50 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700">
              Password
            </label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                required
                className="h-11 rounded-xl border-zinc-200 bg-zinc-50 text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
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
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </Button>

          <p className="text-center text-xs text-zinc-400">
            By signing up you agree to our terms of service.
          </p>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-zinc-900 hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </main>
  )
}
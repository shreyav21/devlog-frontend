import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { useAuthStore } from "@/store/authStore"
import { AuthResponse } from "@/types"

export function useLogin() {
  const { setAuth } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post<AuthResponse>("/auth/login", data)
      return res.data
    },
    onSuccess: (data) => {
      setAuth(
        {
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          avatarUrl: data.avatarUrl,
        },
        data.token
      )
      router.push("/")
    },
  })
}

export function useRegister() {
  const { setAuth } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: {
      name: string
      username: string
      email: string
      password: string
    }) => {
      const res = await api.post<AuthResponse>("/auth/register", data)
      return res.data
    },
    onSuccess: (data) => {
      setAuth(
        {
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          avatarUrl: data.avatarUrl,
        },
        data.token
      )
      router.push("/")
    },
  })
}
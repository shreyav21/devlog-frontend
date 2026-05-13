import axios, { AxiosRequestConfig } from "axios"

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL?.trim() ?? ""

if (typeof window !== "undefined" && !apiBaseURL) {
  console.warn(
    "NEXT_PUBLIC_API_URL is not defined. API requests will use relative URLs."
  )
}

const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

const getToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getToken()
    if (token) {
      if (!config.headers) {
        config.headers = {} as any
      }
      ;(config.headers as Record<string, string>).Authorization = `Bearer ${token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401 || status === 403) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        window.location.href = "/auth/login"
      }
    }
    return Promise.reject(error)
  }
)

export default api
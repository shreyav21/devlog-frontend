import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { Post, PageResponse, PostRequest } from "@/types"

export function usePosts(params?: {
  page?: number
  tag?: string
  search?: string
}) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: async () => {
      const res = await api.get<PageResponse<Post>>("/posts", {
        params: { page: params?.page ?? 0, size: 10, ...params },
      })
      return res.data
    },
  })
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const res = await api.get<Post>(`/posts/${slug}`)
      return res.data
    },
    enabled: !!slug,
  })
}

export function useMyPosts() {
  return useQuery({
    queryKey: ["my-posts"],
    queryFn: async () => {
      const res = await api.get<PageResponse<Post>>("/posts/my")
      return res.data
    },
  })
}

export function useCreatePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (data: PostRequest) => {
      const res = await api.post<Post>("/posts", data)
      return res.data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] })
      qc.invalidateQueries({ queryKey: ["my-posts"] })
    },
  })
}

export function useUpdatePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PostRequest }) => {
      const res = await api.put<Post>(`/posts/${id}`, data)
      return res.data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] })
      qc.invalidateQueries({ queryKey: ["my-posts"] })
    },
  })
}

export function useDeletePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/posts/${id}`)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] })
      qc.invalidateQueries({ queryKey: ["my-posts"] })
    },
  })
}

export function useLikePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.post<Post>(`/posts/${id}/like`)
      return res.data
    },
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ["posts"] })
      qc.invalidateQueries({ queryKey: ["post"] })
    },
  })
}
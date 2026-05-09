export interface User {
  id: string
  name: string
  username: string
  email: string
  bio?: string
  avatarUrl?: string
}

export interface AuthResponse {
  token: string
  id: string
  username: string
  name: string
  email: string
  avatarUrl?: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage?: string
  authorId: string
  authorName: string
  authorAvatar?: string
  tags: string[]
  status: "DRAFT" | "PUBLISHED"
  views: number
  likes: number
  likedByCurrentUser: boolean
  createdAt: string
  updatedAt: string
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
  last: boolean
  first: boolean
}

export interface PostRequest {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  tags: string[]
  status: "DRAFT" | "PUBLISHED"
}
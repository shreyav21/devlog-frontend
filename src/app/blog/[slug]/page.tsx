"use client"

import { useParams, useRouter } from "next/navigation"
import { usePost, useLikePost } from "@/hooks/usePosts"
import { useAuthStore } from "@/store/authStore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  Heart, Eye, Clock, ArrowLeft,
  Loader2, Share2
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

function readingTime(content: string) {
  return Math.ceil(content.split(" ").length / 200)
}

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  const { data: post, isLoading } = usePost(slug)
  const { mutate: likePost, isPending: isLiking } = useLikePost()

  const handleLike = () => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }
    if (post) likePost(post.id)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Link copied!")
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 size={24} className="animate-spin text-zinc-400" />
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="font-serif font-bold text-2xl text-zinc-900 mb-2">
            Post not found
          </p>
          <Button
            variant="ghost"
            onClick={() => router.push("/blog")}
            className="text-zinc-500"
          >
            Back to blog
          </Button>
        </div>
      </main>
      
    )
  }

  return (
    <main className="w-full px-6 pt-28 pb-20">

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-10 group"
      >
        <ArrowLeft
          size={15}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        Back
      </button>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs rounded-full bg-zinc-100 text-zinc-600 border-0"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="font-serif font-bold text-4xl md:text-5xl text-zinc-900 leading-tight mb-6">
        {post.title}
      </h1>

      {/* Author row */}
      <div className="flex items-center justify-between mb-8 pb-8 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.authorAvatar} />
            <AvatarFallback className="bg-zinc-200 text-zinc-600 text-sm font-medium">
              {post.authorName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              {post.authorName}
            </p>
            <p className="text-xs text-zinc-400">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <span className="flex items-center gap-1.5 text-xs">
            <Clock size={13} />
            {readingTime(post.content)} min read
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <Eye size={13} />
            {post.views}
          </span>
        </div>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden bg-zinc-100 mb-10">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-zinc max-w-none
      ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Like + Share */}
      <div className="flex items-center gap-3 mt-12 pt-8 border-t border-zinc-100">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
            post.likedByCurrentUser
              ? "bg-red-50 border-red-200 text-red-600"
              : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
          }`}
        >
          <Heart
            size={15}
            className={post.likedByCurrentUser ? "fill-red-500" : ""}
          />
          {post.likes} {post.likes === 1 ? "like" : "likes"}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 text-zinc-600 text-sm font-medium hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200"
        >
          <Share2 size={15} />
          Share
        </button>
      </div>

      {/* Author card */}
      <div className="mt-10 p-6 rounded-2xl border border-zinc-100 bg-zinc-50">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={post.authorAvatar} />
            <AvatarFallback className="bg-zinc-200 text-zinc-600 font-medium">
              {post.authorName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-zinc-900 mb-1">
              {post.authorName}
            </p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Developer and writer sharing knowledge on DevLog.
            </p>
          </div>
        </div>
      </div>

    </main>
    
  )
}
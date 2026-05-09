import Link from "next/link"
import Image from "next/image"
import { Post } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Eye, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

type Props = {
  post: Post
  featured?: boolean
}

function readingTime(content: string) {
  const words = content.split(" ").length
  return Math.ceil(words / 200)
}

export function PostCard({ post, featured = false }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className={`
          flex gap-5 p-5 rounded-2xl border border-transparent
          hover:border-zinc-100 hover:bg-zinc-50/50
          transition-all duration-200
          ${featured ? "flex-col" : "flex-col sm:flex-row"}
        `}
      >
        {/* Cover image */}
        {post.coverImage && (
          <div
            className={`
              relative overflow-hidden rounded-xl bg-zinc-100 flex-shrink-0
              ${featured ? "w-full aspect-[2/1]" : "w-full sm:w-40 h-28"}
            `}
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[11px] px-2 py-0 rounded-full font-medium bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h2
            className={`
              font-serif font-bold text-zinc-900 leading-snug mb-2
              group-hover:text-zinc-700 transition-colors
              ${featured ? "text-2xl" : "text-lg"}
            `}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          {/* Author + meta row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar className="w-6 h-6">
                <AvatarImage src={post.authorAvatar} />
                <AvatarFallback className="bg-zinc-200 text-zinc-600 text-[10px]">
                  {post.authorName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-zinc-600">
                {post.authorName}
              </span>
              <span className="text-zinc-300">·</span>
              <span className="text-xs text-zinc-400">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <div className="flex items-center gap-3 text-zinc-400">
              <span className="flex items-center gap-1 text-xs">
                <Clock size={11} />
                {readingTime(post.content)}m
              </span>
              <span className="flex items-center gap-1 text-xs">
                <Eye size={11} />
                {post.views}
              </span>
              <span className="flex items-center gap-1 text-xs">
                <Heart
                  size={11}
                  className={post.likedByCurrentUser ? "fill-red-500 text-red-500" : ""}
                />
                {post.likes}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
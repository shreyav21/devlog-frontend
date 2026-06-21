"use client"

import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/shared/AuthGuard"
import { useMyPosts, useDeletePost } from "@/hooks/usePosts"
import { useAuthStore } from "@/store/authStore"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  PenLine, Trash2, Eye, Heart,
  FileText, Loader2, Plus
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function DashboardPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const { data, isLoading } = useMyPosts()
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost()

  const posts = data?.content ?? []
  const published = posts.filter((p) => p.status === "PUBLISHED")
  const drafts = posts.filter((p) => p.status === "DRAFT")
  const totalViews = posts.reduce((acc, p) => acc + p.views, 0)
  const totalLikes = posts.reduce((acc, p) => acc + p.likes, 0)

  const handleDelete = (id: string) => {
    if (confirm("Delete this post? This cannot be undone.")) {
      deletePost(id)
    }
  }

  return (
    <AuthGuard>
      <main className="w-full px-6 pt-28 pb-20">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="bg-[var(--bg-secondary)] text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-serif font-bold text-2xl text-zinc-900">
                {user?.name}
              </h1>
              <p className="text-sm text-[var(--text-muted)]">@{user?.username}</p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/write")}
            className="gap-2 bg-[var(--bg-secondary)] hover:bg-zinc-800 text-white rounded-full"
          >
            <Plus size={15} />
            New post
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Published", value: published.length, icon: <FileText size={16} /> },
            { label: "Drafts", value: drafts.length, icon: <PenLine size={16} /> },
            { label: "Total views", value: totalViews, icon: <Eye size={16} /> },
            { label: "Total likes", value: totalLikes, icon: <Heart size={16} /> },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl border border-zinc-100 bg-zinc-50"
            >
              <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-2">
                {stat.icon}
                <span className="text-xs font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <p className="font-serif font-bold text-3xl text-zinc-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Posts list */}
        <div>
          <h2 className="font-serif font-bold text-xl text-zinc-900 mb-5">
            Your articles
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={22} className="animate-spin text-[var(--text-secondary)]" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-zinc-200 rounded-2xl">
              <FileText size={32} className="text-zinc-300 mx-auto mb-3" />
              <p className="font-medium text-[var(--text-muted)] mb-1">
                No articles yet
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-5">
                Write your first article and share it with the world.
              </p>
              <Button
                onClick={() => router.push("/write")}
                size="sm"
                className="bg-[var(--bg-secondary)] text-white rounded-full gap-2"
              >
                <PenLine size={14} />
                Write your first post
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/50 transition-all duration-200 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] rounded-full border-0 ${
                          post.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : "bg-zinc-100 text-[var(--text-muted)]"
                        }`}
                      >
                        {post.status === "PUBLISHED" ? "Published" : "Draft"}
                      </Badge>
                      <span className="text-xs text-[var(--text-secondary)]">
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <h3 className="font-medium text-zinc-900 truncate text-sm">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--text-secondary)]">
                      <span className="flex items-center gap-1">
                        <Eye size={11} /> {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={11} /> {post.likes}
                      </span>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[var(--text-secondary)]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {post.status === "PUBLISHED" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/blog/${post.slug}`)}
                        className="h-8 w-8 p-0 text-[var(--text-muted)] hover:text-zinc-900"
                      >
                        <Eye size={14} />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/write?edit=${post.id}`)}
                      className="h-8 w-8 p-0 text-[var(--text-muted)] hover:text-zinc-900"
                    >
                      <PenLine size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      disabled={isDeleting}
                      className="h-8 w-8 p-0 text-[var(--text-muted)] hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </AuthGuard>
  )
}
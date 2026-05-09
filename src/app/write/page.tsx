"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthGuard } from "@/components/shared/AuthGuard"
import { useCreatePost } from "@/hooks/usePosts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, X, Eye, Save } from "lucide-react"

export default function WritePage() {
  const router = useRouter()
  const { mutate: createPost, isPending } = useCreatePost()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState("")

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const tag = tagInput.trim().toLowerCase()
      if (tag && !tags.includes(tag) && tags.length < 5) {
        setTags([...tags, tag])
        setTagInput("")
      }
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handlePublish = () => {
    if (!title.trim()) return setError("Title is required")
    if (!content.trim()) return setError("Content is required")
    setError("")

    createPost(
      {
        title,
        content,
        excerpt: excerpt || content.slice(0, 150),
        coverImage: coverImage || undefined,
        tags,
        status: "PUBLISHED",
      },
      {
        onSuccess: (post) => router.push(`/blog/${post.slug}`),
        onError: (err: any) => {
          setError(err.response?.data?.message || "Failed to publish")
        },
      }
    )
  }

  const handleSaveDraft = () => {
    if (!title.trim()) return setError("Title is required")
    setError("")

    createPost(
      {
        title,
        content,
        excerpt: excerpt || content.slice(0, 150),
        coverImage: coverImage || undefined,
        tags,
        status: "DRAFT",
      },
      {
        onSuccess: () => router.push("/dashboard"),
        onError: (err: any) => {
          setError(err.response?.data?.message || "Failed to save draft")
        },
      }
    )
  }

  return (
    <AuthGuard>
      <main className="w-full px-6 pt-24 pb-20">

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            ← Back
          </button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreview(!preview)}
              className="gap-2 text-zinc-600"
            >
              <Eye size={15} />
              {preview ? "Edit" : "Preview"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={isPending}
              className="gap-2 rounded-full"
            >
              <Save size={15} />
              Save draft
            </Button>
            <Button
              size="sm"
              onClick={handlePublish}
              disabled={isPending}
              className="gap-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full"
            >
              {isPending ? (
                <Loader2 size={15} className="animate-spin" />
              ) : null}
              Publish
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {preview ? (
          // Preview mode
          <div>
            <h1 className="font-serif font-bold text-4xl text-zinc-900 mb-4">
              {title || "Untitled"}
            </h1>
            <div className="prose prose-zinc max-w-none
              prose-headings:font-serif
              prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:rounded
              prose-pre:bg-zinc-950
            ">
              {content ? (
                <pre className="whitespace-pre-wrap font-sans text-base text-zinc-700 leading-relaxed">
                  {content}
                </pre>
              ) : (
                <p className="text-zinc-400">Nothing to preview yet.</p>
              )}
            </div>
          </div>
        ) : (
          // Edit mode
          <div className="space-y-6">

            {/* Cover image URL */}
            <div>
              <Input
                placeholder="Cover image URL (optional)"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="h-10 rounded-xl border-zinc-200 bg-zinc-50 text-sm"
              />
              {coverImage && (
                <div className="mt-3 w-full aspect-[3/1] rounded-xl overflow-hidden bg-zinc-100">
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <textarea
              placeholder="Article title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={2}
              className="w-full font-serif font-bold text-4xl text-zinc-900 placeholder:text-zinc-300 resize-none border-0 outline-none bg-transparent leading-tight"
            />

            {/* Excerpt */}
            <textarea
              placeholder="Short description (excerpt)..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full text-base text-zinc-600 placeholder:text-zinc-300 resize-none border-0 outline-none bg-transparent leading-relaxed"
            />

            <div className="border-t border-zinc-100" />

            {/* Content */}
            <textarea
              placeholder="Write your article here... (Markdown supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="w-full text-base text-zinc-700 placeholder:text-zinc-300 resize-none border-0 outline-none bg-transparent leading-relaxed font-mono text-sm"
            />

            <div className="border-t border-zinc-100 pt-4" />

            {/* Tags */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-700 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-zinc-400 hover:text-zinc-700"
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                placeholder="Add tags (press Enter)... max 5"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                disabled={tags.length >= 5}
                className="h-10 rounded-xl border-zinc-200 bg-zinc-50 text-sm"
              />
              <p className="text-xs text-zinc-400 mt-1.5">
                {tags.length}/5 tags used
              </p>
            </div>

          </div>
        )}

      </main>
    </AuthGuard>
  )
}
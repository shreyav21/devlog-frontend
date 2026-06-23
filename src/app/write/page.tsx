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
    //
    <AuthGuard>
      <main className="w-full max-w-7xl mx-auto px-8 lg:px-12 pt-24 pb-20">
        {/* Sticky Toolbar */}
        <div
          className="
      sticky top-20 z-30
      flex items-center justify-between
      mb-8
      rounded-2xl
      border
      backdrop-blur-xl
      px-4 py-3
    "
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <button
            onClick={() => router.back()}
            className="
          text-sm
          text-[var(--text-secondary)]
          hover:text-[var(--text-primary)]
          transition-colors
        "
          >
            ← Back
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreview(!preview)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <Eye size={15} />
              {preview ? "Edit" : "Preview"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={isPending}
              className="
            rounded-full
            border-[var(--border)]
            text-[var(--text-secondary)]
          "
            >
              <Save size={15} />
              Save Draft
            </Button>

            <Button
              size="sm"
              onClick={handlePublish}
              disabled={isPending}
              className="
            rounded-full
            text-black
            font-semibold
            border-0
          "
              style={{
                background:
                  "linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))",
              }}
            >
              {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
              Publish
            </Button>
          </div>
        </div>

        {error && (
          <div
            className="
          mb-6
          rounded-xl
          px-4 py-3
          border
          text-red-400
        "
            style={{
              background: "rgba(220,38,38,.08)",
              borderColor: "rgba(220,38,38,.15)",
            }}
          >
            {error}
          </div>
        )}

        {preview ? (
          <div
            className="
          rounded-3xl
          p-10
          border
          backdrop-blur-xl
        "
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <h1
              className="
            font-serif
            text-5xl
            font-black
            mb-4
          "
              style={{
                color: "var(--text-primary)",
              }}
            >
              {title || "Untitled"}
            </h1>

            {excerpt && (
              <p
                className="
              text-xl
              mb-8
              italic
            "
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                {excerpt}
              </p>
            )}

            <pre
              className="
            whitespace-pre-wrap
            leading-8
            font-sans
          "
              style={{
                color: "var(--text-primary)",
              }}
            >
              {content || "Nothing to preview yet."}
            </pre>
          </div>
        ) : (
          <div
            className="
          rounded-3xl
          border
          backdrop-blur-xl
          overflow-hidden
        "
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            {/* Editor */}
            <div className="p-10">
              {/* Title */}
              <textarea
                placeholder="Untitled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={2}
                className="
              w-full
              bg-transparent
              border-0
              resize-none
              outline-none

              text-5xl
              md:text-6xl
              font-black
              font-serif
              tracking-tight

              placeholder:text-[var(--text-muted)]
            "
                style={{
                  color: "var(--text-primary)",
                }}
              />

              {/* Excerpt */}
              <textarea
                placeholder="Write a short description..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="
              mt-4
              w-full
              bg-transparent
              border-0
              resize-none
              outline-none

              text-lg
              italic
              placeholder:text-[var(--text-muted)]
            "
                style={{
                  color: "var(--text-secondary)",
                }}
              />

              <div
                className="my-8 h-px"
                style={{
                  background: "var(--border)",
                }}
              />

              {/* Content */}
              <textarea
                placeholder="Start writing your story..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="
              w-full
              min-h-[600px]
              bg-transparent
              border-0
              resize-none
              outline-none

              text-base
              leading-8

              placeholder:text-[var(--text-muted)]
            "
                style={{
                  color: "var(--text-primary)",
                }}
              />
            </div>

            {/* Footer Section */}
            <div
              className="border-t p-8"
              style={{
                borderColor: "var(--border)",
              }}
            >
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-wider"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Tags
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                  inline-flex
                  items-center
                  gap-2
                  px-3 py-1.5
                  rounded-full
                  text-sm
                "
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {tag}

                    <button
                      onClick={() => removeTag(tag)}
                      className="opacity-60 hover:opacity-100"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>

              <Input
                placeholder="Add tags and press Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                disabled={tags.length >= 5}
                className="
              h-11
              bg-transparent
              text-[var(--text-primary)]
              placeholder:text-[var(--text-muted)]
            "
                style={{
                  borderColor: "var(--border)",
                }}
              />

              <p
                className="mt-3 text-xs"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                {tags.length}/5 tags used
              </p>
            </div>
          </div>
        )}
      </main>
    </AuthGuard>
  )
}
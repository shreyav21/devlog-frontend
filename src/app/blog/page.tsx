"use client"

import { useState } from "react"
import { RecommendedPosts } from "@/components/blog/RecommendedPosts"
import { useRecommendations } from "@/hooks/useRecommendations"
import { PostCard } from "@/components/blog/PostCard"
import { TagFilter } from "@/components/blog/TagFilter"
import { usePosts } from "@/hooks/usePosts"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  const [search, setSearch] = useState("")
  const [tag, setTag] = useState("")
  const debouncedSearch = useDebounce(search, 400)

  
  const { data, isLoading } = usePosts({
    search: debouncedSearch || undefined,
    tag: tag || undefined,
  })
  
  const { recommendations, isLoading: recLoading } = useRecommendations(
    data?.content ?? [],
  );
  const posts = data?.content ?? []

  return (
    <>
      <main className="max-w-7xl mx-auto px-8 lg:px-12 pt-28 pb-24">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[var(--accent-primary)] mb-3">
                Developer Community
              </p>

              <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
                Articles
              </h1>

              <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
                Tutorials, architecture guides, engineering stories and
                developer insights from the community.
              </p>
            </div>

            <Link href="/write">
              <Button
                className="rounded-full px-6 h-11 text-black font-semibold border-0"
                style={{
                  background: "linear-gradient(135deg,#10b981 0%,#14b8a6 100%)",
                  boxShadow: "0 10px 30px rgba(16,185,129,0.20)",
                }}
              >
                Write Article
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Search + Tags */}
        <ScrollReveal>
          <div
            className="
        mb-12
        rounded-3xl
        border
        p-5
        backdrop-blur-xl
        transition-all
        duration-300
      "
            style={{
              borderColor: "var(--border)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div className="relative">
              <Search
                size={18}
                className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[var(--text-secondary)]
          "
              />

              <Input
                placeholder="Search articles, technologies, authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
            h-12
            pl-12
            rounded-2xl

            bg-transparent

            text-[var(--text-primary)]
            placeholder:text-[var(--text-muted)]

            border
            border-[var(--border)]

            focus-visible:ring-2
            focus-visible:ring-emerald-500/30
            focus-visible:border-emerald-500

            transition-all
            duration-300
          "
              />
            </div>

            <div className="mt-5">
              <TagFilter selected={tag} onChange={setTag} />
            </div>
          </div>
        </ScrollReveal>

        {/* Stats */}
        {!isLoading && posts.length > 0 && (
          <ScrollReveal>
            <div className="flex gap-12 mb-14">
              <div>
                <p className="text-3xl font-bold text-[var(--accent-primary)]">
                  {posts.length}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">Articles</p>
              </div>

              <div>
                <p className="text-3xl font-bold text-[var(--accent-primary)]">
                  {new Set(posts.map((p) => p.authorName)).size}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">Writers</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-3xl animate-pulse border"
                style={{
                  borderColor: "var(--border)",
                  background: "rgba(255,255,255,0.03)",
                }}
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
              No articles found
            </h3>

            <p className="text-[var(--text-secondary)] mb-6">
              Try another keyword or explore a different topic.
            </p>

            <Button
              variant="outline"
              onClick={() => {
                setSearch("")
                setTag("")
              }}
              className="rounded-full"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Featured */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">
                Featured Article
              </h2>

              <PostCard post={posts[0]} featured />
            </section>

            {/* Latest */}
            {posts.length > 1 && (
              <section>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">
                  Latest Articles
                </h2>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {posts.slice(1).map((post) => (
                    <PostCard key={post.id} post={post} featured={false} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Recommendations */}
        <div className="mt-20">
          <RecommendedPosts
            recommendations={recommendations}
            isLoading={recLoading}
          />
        </div>
      </main>
    </>
  )
}
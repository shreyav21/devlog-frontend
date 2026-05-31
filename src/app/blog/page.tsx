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
      <main className="w-full px-6 pt-28 pb-20">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-10">
            <h1 className="font-serif font-bold text-4xl text-zinc-900 mb-2">
              Articles
            </h1>
            <p className="text-zinc-500">
              Insights, tutorials and stories from the developer community.
            </p>
          </div>
        </ScrollReveal>

        {/* Search */}
        <ScrollReveal>
          <div className="relative mb-6">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl border-zinc-200 bg-zinc-50 focus-visible:ring-zinc-300 text-sm"
            />
          </div>
        </ScrollReveal>

        {/* Tags */}
        <ScrollReveal>
          <div className="mb-10">
            <TagFilter selected={tag} onChange={setTag} />
          </div>
        </ScrollReveal>

        {/* Posts */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={24} className="animate-spin text-zinc-400" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-400 font-medium">No articles found.</p>
            <p className="text-sm text-zinc-300 mt-1">
              Try a different search or tag.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} featured={i === 0} />
            ))}
          </div>
        )}

        <RecommendedPosts
          recommendations={recommendations}
          isLoading={recLoading}
        />
      </main>
    </>
  );
}
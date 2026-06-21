"use client";

import { Post } from "@/types";
import { PostCard } from "./PostCard";
import { Sparkles, Loader2 } from "lucide-react";

type Props = {
  recommendations: Post[];
  isLoading: boolean;
};

export function RecommendedPosts({ recommendations, isLoading }: Props) {
  if (!isLoading && recommendations.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-zinc-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          }}
        >
          <Sparkles size={14} className="text-white" />
        </div>
        <h3 className="font-serif font-bold text-xl text-zinc-900">
          Recommended for you
        </h3>
        <span className="text-xs text-[var(--text-secondary)] font-mono bg-zinc-100 px-2 py-0.5 rounded-full">
          AI powered
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-[var(--text-secondary)] py-8">
          <Loader2 size={16} className="animate-spin" />
          <span className="text-sm">Finding posts you'll love...</span>
        </div>
      ) : (
        <div className="divide-y divide-zinc-100">
          {recommendations.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

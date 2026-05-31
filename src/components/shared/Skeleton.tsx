"use client";

import { motion } from "framer-motion";

function SkeletonBox({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={`bg-zinc-100 rounded-lg ${className}`}
    />
  );
}

export function PostCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-5">
      <SkeletonBox className="w-full aspect-[2/1] rounded-xl" />
      <div className="flex gap-2">
        <SkeletonBox className="w-16 h-5 rounded-full" />
        <SkeletonBox className="w-16 h-5 rounded-full" />
      </div>
      <SkeletonBox className="w-3/4 h-6" />
      <SkeletonBox className="w-full h-4" />
      <SkeletonBox className="w-2/3 h-4" />
      <div className="flex items-center gap-2 mt-2">
        <SkeletonBox className="w-6 h-6 rounded-full" />
        <SkeletonBox className="w-24 h-4" />
      </div>
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-28 pb-20 space-y-6">
      <SkeletonBox className="w-24 h-4" />
      <div className="flex gap-2">
        <SkeletonBox className="w-16 h-6 rounded-full" />
        <SkeletonBox className="w-20 h-6 rounded-full" />
      </div>
      <SkeletonBox className="w-full h-12" />
      <SkeletonBox className="w-3/4 h-12" />
      <div className="flex items-center gap-3">
        <SkeletonBox className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <SkeletonBox className="w-32 h-4" />
          <SkeletonBox className="w-24 h-3" />
        </div>
      </div>
      <SkeletonBox className="w-full aspect-[2/1] rounded-2xl" />
      {[...Array(6)].map((_, i) => (
        <SkeletonBox
          key={i}
          className={`h-4 ${i % 3 === 2 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-20 space-y-6">
      <div className="flex items-center gap-4">
        <SkeletonBox className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <SkeletonBox className="w-40 h-6" />
          <SkeletonBox className="w-24 h-4" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonBox key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      {[...Array(4)].map((_, i) => (
        <SkeletonBox key={i} className="h-20 rounded-2xl" />
      ))}
    </div>
  );
}

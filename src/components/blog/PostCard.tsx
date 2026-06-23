"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Eye, Clock, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

type Props = {
  post: Post;
  featured?: boolean;
};

function readingTime(content: string) {
  return Math.ceil(content.split(" ").length / 200);
}

export function PostCard({ post, featured = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <article
          className={`
        flex gap-5 p-5 rounded-3xl border
        transition-all duration-300
        backdrop-blur-sm

        ${featured ? "flex-col" : "flex-col sm:flex-row"}
      `}
          style={{
            borderColor: "var(--border)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {/* Cover image */}
          {post.coverImage && (
            <div
              className={`
            relative overflow-hidden rounded-2xl flex-shrink-0
            ${featured ? "w-full aspect-[2/1]" : "w-full sm:w-44 h-32"}
          `}
              style={{
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <motion.div
                    key={tag}
                    whileHover={{
                      y: -2,
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      className="
                    px-3
                    py-1
                    rounded-full
                    border-0
                    cursor-pointer
                    text-xs
                    font-medium
                    transition-all
                    duration-300
                  "
                      style={{
                        background: "rgba(125,145,175,0.12)",
                        color: "var(--accent-primary)",
                      }}
                    >
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Title */}
            <h2
              className={`
            font-serif
            font-bold
            leading-snug
            mb-3
            transition-colors
            duration-300

            group-hover:text-[var(--accent-primary)]

            ${featured ? "text-3xl" : "text-xl"}
          `}
              style={{
                color: "var(--text-primary)",
              }}
            >
              {post.title}
            </h2>

            {/* Excerpt */}
            <p
              className="
            text-sm
            leading-relaxed
            line-clamp-2
            mb-5
          "
              style={{
                color: "var(--text-secondary)",
              }}
            >
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2.5">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={post.authorAvatar} />

                  <AvatarFallback
                    style={{
                      background: "rgba(125,145,175,0.15)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    {post.authorName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <span
                  className="text-sm font-medium"
                  style={{
                    color: "var(--text-primary)",
                  }}
                >
                  {post.authorName}
                </span>

                <span
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  •
                </span>

                <span
                  className="text-xs"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <div
                className="flex items-center gap-4"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                <span className="flex items-center gap-1 text-xs">
                  <Clock size={12} />
                  {readingTime(post.content)}m
                </span>

                <span className="flex items-center gap-1 text-xs">
                  <Eye size={12} />
                  {post.views}
                </span>

                <motion.span
                  whileHover={{
                    scale: 1.15,
                  }}
                  className="flex items-center gap-1 text-xs"
                >
                  <Heart
                    size={12}
                    className={
                      post.likedByCurrentUser ? "fill-red-500 text-red-500" : ""
                    }
                  />
                  {post.likes}
                </motion.span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

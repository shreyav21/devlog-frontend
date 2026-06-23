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
import { PostChatbot } from "@/components/blog/PostChatbot"
import { trackPostLike, trackPostRead } from "@/hooks/useRecommendations"
import { useEffect } from "react"

function readingTime(content: string) {
  return Math.ceil(content.split(" ").length / 200)
}

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  const { data: post, isLoading } = usePost(slug)
  const { mutate: likePost, isPending: isLiking } = useLikePost()

  useEffect(() => {
    if (post) trackPostRead(post);
  }, [post]);

  const handleLike = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    if (post) {
      likePost(post.id);
      trackPostLike(post); // ← add this line
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Link copied!")
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 size={24} className="animate-spin text-[var(--text-secondary)]" />
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
            className="text-[var(--text-muted)]"
          >
            Back to blog
          </Button>
        </div>
      </main>
      
    )
  }

 return (
   <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
     {/* Back button */}
     <button
       onClick={() => router.back()}
       className="
        flex items-center gap-2
        text-sm font-medium
        text-[var(--text-secondary)]
        hover:text-[var(--accent-primary)]
        transition-all duration-300
        mb-12 group
      "
     >
       <ArrowLeft
         size={15}
         className="group-hover:-translate-x-1 transition-transform"
       />
       Back to Articles
     </button>

     {/* Tags */}
     {post.tags.length > 0 && (
       <div className="flex flex-wrap gap-2 mb-6">
         {post.tags.map((tag) => (
           <Badge
             key={tag}
             className="
              px-3 py-1
              rounded-full
              text-xs
              border-0
              hover:scale-105
              transition-all duration-300
            "
             style={{
               background: "rgba(125,145,175,0.12)",
               color: "var(--accent-primary)",
             }}
           >
             {tag}
           </Badge>
         ))}
       </div>
     )}

     {/* Title */}
     <h1
       className="
        font-serif
        font-bold
        text-5xl
        md:text-6xl
        leading-tight
        tracking-tight
        mb-8
      "
       style={{
         color: "var(--text-primary)",
       }}
     >
       {post.title}
     </h1>

     {/* Author / Meta */}
     <div
       className="
        flex flex-col md:flex-row
        md:items-center
        md:justify-between
        gap-6
        mb-12
        pb-8
        border-b
      "
       style={{
         borderColor: "var(--border)",
       }}
     >
       <div className="flex items-center gap-4">
         <Avatar className="w-12 h-12">
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

         <div>
           <p
             className="font-semibold"
             style={{
               color: "var(--text-primary)",
             }}
           >
             {post.authorName}
           </p>

           <p
             className="text-sm"
             style={{
               color: "var(--text-secondary)",
             }}
           >
             Published{" "}
             {formatDistanceToNow(new Date(post.createdAt), {
               addSuffix: true,
             })}
           </p>
         </div>
       </div>

       <div
         className="flex items-center gap-6"
         style={{
           color: "var(--text-secondary)",
         }}
       >
         <span className="flex items-center gap-2 text-sm">
           <Clock size={14} />
           {readingTime(post.content)} min reading
         </span>

         <span className="flex items-center gap-2 text-sm">
           <Eye size={14} />
           {post.views} views
         </span>
       </div>
     </div>

     {/* Cover Image */}
     {post.coverImage && (
       <div
         className="
          w-full
          aspect-[2/1]
          rounded-3xl
          overflow-hidden
          mb-14
          border
        "
         style={{
           borderColor: "var(--border)",
         }}
       >
         <img
           src={post.coverImage}
           alt={post.title}
           className="w-full h-full object-cover"
         />
       </div>
     )}

     {/* Content */}
     <div className="max-w-3xl mx-auto">
       <div
         className="
          prose
          prose-invert
          max-w-none
          prose-headings:font-serif
          prose-p:leading-8
          prose-p:text-lg
          prose-li:text-lg
        "
       >
         <ReactMarkdown remarkPlugins={[remarkGfm]}>
           {post.content}
         </ReactMarkdown>
       </div>
     </div>

     {/* Actions */}
     <div
       className="flex items-center gap-4 mt-16 pt-8"
       style={{
         borderTop: "1px solid var(--border)",
       }}
     >
       <button
         onClick={handleLike}
         disabled={isLiking}
         className="
          flex items-center gap-2
          px-5 py-3
          rounded-full
          text-sm font-medium
          transition-all duration-300
          hover:scale-[1.02]
        "
         style={
           post.likedByCurrentUser
             ? {
                 background: "rgba(239,68,68,0.10)",
                 border: "1px solid rgba(239,68,68,0.30)",
                 color: "#f87171",
               }
             : {
                 border: "1px solid var(--border)",
                 color: "var(--text-secondary)",
               }
         }
       >
         <Heart
           size={15}
           className={post.likedByCurrentUser ? "fill-red-500" : ""}
         />
         {post.likes} {post.likes === 1 ? "Like" : "Likes"}
       </button>

       <button
         onClick={handleShare}
         className="
          flex items-center gap-2
          px-5 py-3
          rounded-full
          text-sm font-medium
          transition-all duration-300
          hover:scale-[1.02]
        "
         style={{
           border: "1px solid var(--border)",
           color: "var(--text-secondary)",
         }}
       >
         <Share2 size={15} />
         Share Article
       </button>
     </div>

     {/* Author Card */}
     <div
       className="
        mt-16
        p-8
        rounded-3xl
        backdrop-blur-sm
      "
       style={{
         border: "1px solid var(--border)",
         background: "rgba(255,255,255,0.02)",
       }}
     >
       <div className="flex items-start gap-5">
         <Avatar className="w-14 h-14">
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

         <div>
           <p
             className="font-semibold text-lg mb-2"
             style={{
               color: "var(--text-primary)",
             }}
           >
             About {post.authorName}
           </p>

           <p
             className="text-sm leading-relaxed"
             style={{
               color: "var(--text-secondary)",
             }}
           >
             Building software, writing about engineering, and sharing lessons
             learned from real-world development.
           </p>
         </div>
       </div>
     </div>

     {/* AI Chatbot */}
     <PostChatbot postTitle={post.title} postContent={post.content} />
   </main>
 )
}
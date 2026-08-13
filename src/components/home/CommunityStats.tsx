"use client"

import { useEffect, useRef } from "react"
import { useCommunityStats } from "@/hooks/useHome"
import { motion, useInView, useAnimation } from "framer-motion"
import { Users, FileText, Eye, Heart, MessageSquare } from "lucide-react"

type StatCardProps = {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  delay: number
  color: string
}

function StatCard({
  icon,
  value,
  label,
  suffix = "+",
  delay,
  color,
}: StatCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

//   useEffect(() => {
//     if (!isInView) return

//     let start = 0
//     const duration = 2000
//     const increment = value / (duration / 16)

//     const timer = setInterval(() => {
//       start += increment
//       if (start >= value) {
//         controls.set({ count: value })
//         clearInterval(timer)
//       } else {
//         controls.set({ count: Math.floor(start) })
//       }
//     }, 16)

//     return () => clearInterval(timer)
//   }, [isInView, value, controls])

  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`
    return val.toString()
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group p-6 rounded-2xl border border-zinc-100 hover:border-zinc-200 bg-white hover:shadow-md transition-all duration-300 text-center"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-200 group-hover:scale-110"
        style={{ background: color, color: "#fff" }}
      >
        {icon}
      </div>
      <motion.p
        className="font-serif font-bold text-3xl text-zinc-900 mb-1"
        animate={controls}
      >
        {isInView ? `${formatValue(value)}${suffix}` : "0"}
      </motion.p>
      <p className="font-mono text-xs tracking-wider uppercase text-zinc-500">
        {label}
      </p>
    </motion.div>
  )
}

export function CommunityStats() {
  const { data: stats, isLoading } = useCommunityStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-36 rounded-2xl bg-zinc-100 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!stats) return null

  const statItems = [
    {
      icon: <Users size={20} />,
      value: stats.totalDevelopers,
      label: "Developers",
      color: "linear-gradient(135deg, #3b82f6, #6366f1)",
      delay: 0,
    },
    {
      icon: <FileText size={20} />,
      value: stats.totalBlogs,
      label: "Articles",
      color: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      delay: 0.1,
    },
    {
      icon: <Eye size={20} />,
      value: stats.totalViews,
      label: "Total Views",
      color: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
      delay: 0.2,
    },
    {
      icon: <Heart size={20} />,
      value: stats.totalLikes,
      label: "Total Likes",
      color: "linear-gradient(135deg, #ef4444, #f97316)",
      delay: 0.3,
    },
    {
      icon: <MessageSquare size={20} />,
      value: stats.totalComments,
      label: "Comments",
      color: "linear-gradient(135deg, #10b981, #059669)",
      delay: 0.4,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {statItems.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}

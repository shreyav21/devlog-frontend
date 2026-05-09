import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-12 mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center">
              <BookOpen size={12} className="text-white" />
            </div>
            <span className="font-serif font-bold text-zinc-900">DevLog</span>
          </Link>
          <p className="text-xs text-zinc-400 font-medium">
            © {new Date().getFullYear()} DevLog. Built with Next.js + Spring Boot.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, PenLine, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useGSAPHeroAnimation } from "@/hooks/useGSAP"
import { ScrollReveal } from "@/components/shared/ScrollReveal"
import { staggerContainer, staggerItem } from "@/lib/animations"

import Spotlight from "@/components/ui/Spotlight"
import { useAuthStore } from "@/store/authStore"

export default function HomePage() {
  useGSAPHeroAnimation()
   const { isAuthenticated } = useAuthStore()

  return (
    <>
      <div className="noise" />
      <Spotlight />
      <main className="pt-16">
        {/* Hero */}
        {/* Hero */}
        <section className="hero-grid relative overflow-hidden min-h-screen">
          {/* Background Glow */}
          <div
            className="absolute inset-0"
            style={{
              background: `
    radial-gradient(circle at 75% 35%, rgba(125,145,175,.18), transparent 30%),
    radial-gradient(circle at 30% 80%, rgba(154,168,191,.14), transparent 35%),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,.02), transparent 70%)
  `,
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
              {/* LEFT CONTENT */}
              <div>
                <p className="uppercase tracking-[0.4em] text-(--accent-primary) text-xs mb-6">
                  Developer Blogging Platform
                </p>

                <h1
                  className="text-7xl md:text-8xl font-black leading-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  DEVLOG
                </h1>

                <h2
                  className="text-4xl md:text-5xl mt-6 font-light  leading-tight"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Write.
                  <br />
                  Build.
                  <br />
                  Inspire.
                </h2>

                <p className="mt-8 text-[var(--text-secondary)] text-lg max-w-xl">
                  A modern platform for developers to publish articles, share
                  knowledge and build their technical presence.
                </p>

                <div className="flex gap-4 mt-10">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-8 border-0 text-(--text-muted)]"
                    style={{
                      background:
                        "linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))",
                    }}
                  >
                    <Link href="/auth/register">Start Writing</Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-8 text-white border-0"
                    style={{
                      background:
                        "linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))",
                    }}
                  >
                    <Link href="/blog">Explore Blogs</Link>
                  </Button>
                </div>

                <div className="flex gap-10 mt-12">
                  <div>
                    <p className="text-3xl font-bold text-white">100+</p>
                    <p className="text-[var(--text-muted)]">Articles</p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-white">50+</p>
                    <p className="text-[var(--text-muted)]">Developers</p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-white">1000+</p>
                    <p className="text-[var(--text-muted)]">Reads</p>
                  </div>
                </div>
              </div>

              {/* RIGHT VISUAL */}
              <div className="relative hidden lg:flex items-center justify-center h-full">
                {/* Giant Text */}
                <h2
                  className="
            text-[220px]
            font-black
            tracking-tighter
            leading-none
            text-transparent
            bg-clip-text
            select-none
          "
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg,#ffffff25,#ffffff05)",
                  }}
                >
                  DEV
                </h2>

                {/* Cyan Glow */}
                <div
                  className="
            absolute
            w-96
            h-96
            rounded-full
            blur-[120px]
          "
                  style={{
                    background:
                      "radial-gradient(circle, rgba(125,145,175,.35), transparent 70%)",
                  }}
                />

                {/* Accent Elements */}
                <div
                  className="absolute top-20 right-10 w-3 h-3 rounded-full animate-pulse"
                  style={{ background: "var(--accent-primary)" }}
                />

                <div
                  className="absolute bottom-28 left-16 w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "var(--accent-secondary)" }}
                />

                <div
                  className="absolute top-1/2 right-0 h-px w-40"
                  style={{
                    background:
                      "linear-gradient(to right,var(--accent-primary),transparent)",
                  }}
                />

                <div
                  className="absolute bottom-20 right-20 h-px w-24 to-transparent"
                  style={{
                    background:
                      "linear-gradient(to right,var(--accent-secondary),transparent)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-t border-zinc-100" />
        </div>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <PenLine size={22} />,
                title: "Write Beautifully",
                desc: "Minimal editor experience focused on readability and publishing.",
              },
              {
                icon: <Users size={22} />,
                title: "Grow Audience",
                desc: "Share ideas and build your developer presence.",
              },
              {
                icon: <Zap size={22} />,
                title: "Fast Experience",
                desc: "Optimized performance powered by Next.js and Spring Boot.",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className=" group
        relative
        overflow-hidden
        rounded-3xl
        p-8
        backdrop-blur-xl
        border
        transition-all
        duration-500"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                {/* Hover Glow */}
                <div
                  className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          pointer-events-none
          "
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgba(16,185,129,.18), transparent 60%)",
                  }}
                />

                {/* Icon */}
                <div
                  className="
          relative
          z-10
          w-14
          h-14
          rounded-2xl
          flex
          items-center
          justify-center
          mb-6
          group-hover:scale-110
          transition-all
          duration-300
          "
                  style={{
                    background: "rgba(125,145,175,.08)",
                    borderColor: "rgba(125,145,175,.2)",
                    color: "var(--accent-primary)",
                  }}
                >
                  {feature.icon}
                </div>

                <h3
                  className="
          relative
          z-10
          text-xl
          font-semibold
          text-white
          mb-3
          "
                >
                  {feature.title}
                </h3>

                <p
                  className="
          relative
          z-10
          leading-relaxed
          "
                  style={{ color: "var(--text-secondary)" }}
                >
                  {feature.desc}
                </p>

                {/* Bottom Accent */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r group-hover:w-full transition-all
          duration-500"
                  style={{
                    background:
                      "linear-gradient(to right,var(--accent-primary),var(--accent-secondary))",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <ScrollReveal>
          <section className="max-w-5xl mx-auto px-6 pb-20">
            <div
              className="rounded-3xl px-10 py-16 text-center overflow-hidden relative border"
              style={{
                background:
                  "linear-gradient(135deg,var(--bg-secondary),var(--bg-tertiary))",
                borderColor: "var(--border)",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.03, 0.06, 0.03],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              />

              <div className="relative z-10">
                {isAuthenticated ? (
                  <>
                    <h2
                      className="font-serif font-bold text-3xl md:text-4xl mb-4"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Welcome back 👋
                    </h2>

                    <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                      Ready to publish your next article and share knowledge
                      with the developer community?
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-full px-8 bg-white text-zinc-900 hover:bg-zinc-100"
                      >
                        <Link href="/write">Write Article</Link>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8"
                      >
                        <Link href="/dashboard">My Dashboard</Link>
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2
                      className="font-serif font-bold text-3xl md:text-4xl mb-4"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Ready to start writing?
                    </h2>

                    <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                      Join developers already sharing their knowledge on DevLog.
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-block"
                    >
                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full px-8"
                      >
                        <Link href="/auth/register">Create your account</Link>
                      </Button>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}

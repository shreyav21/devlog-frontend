"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PenLine, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useGSAPHeroAnimation } from "@/hooks/useGSAP";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { staggerContainer, staggerItem } from "@/lib/animations";

import Spotlight from "@/components/ui/Spotlight";

export default function HomePage() {
  useGSAPHeroAnimation();

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
    radial-gradient(circle at 75% 35%, rgba(16,185,129,0.22), transparent 30%),
    radial-gradient(circle at 30% 80%, rgba(20,184,166,0.18), transparent 35%),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02), transparent 70%)
  `,
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
              {/* LEFT CONTENT */}
              <div>
                <p className="uppercase tracking-[0.4em] text-cyan-400 text-xs mb-6">
                  Developer Blogging Platform
                </p>

                <h1 className="text-7xl md:text-8xl font-black text-white leading-none">
                  DEVLOG
                </h1>

                <h2 className="text-4xl md:text-5xl mt-6 font-light text-zinc-300 leading-tight">
                  Write.
                  <br />
                  Build.
                  <br />
                  Inspire.
                </h2>

                <p className="mt-8 text-zinc-400 text-lg max-w-xl">
                  A modern platform for developers to publish articles, share
                  knowledge and build their technical presence.
                </p>

                <div className="flex gap-4 mt-10">
                  <Button
                    asChild
                    size="lg"
                    className="
  rounded-full
  px-8
  bg-gradient-to-r
  from-emerald-500
  to-teal-500
  hover:from-emerald-400
  hover:to-teal-400
  text-white
  border-0
  shadow-lg
  shadow-emerald-500/20
"
                  >
                    <Link href="/auth/register">Start Writing</Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    className="
  rounded-full
  px-8
  bg-gradient-to-r
  from-emerald-500
  to-teal-500
  hover:from-emerald-400
  hover:to-teal-400
  text-white
  border-0
  shadow-lg
  shadow-emerald-500/20
"
                  >
                    <Link href="/blog">Explore Blogs</Link>
                  </Button>
                </div>

                <div className="flex gap-10 mt-12">
                  <div>
                    <p className="text-3xl font-bold text-white">100+</p>
                    <p className="text-zinc-500">Articles</p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-white">50+</p>
                    <p className="text-zinc-500">Developers</p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-white">1000+</p>
                    <p className="text-zinc-500">Reads</p>
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
                      "radial-gradient(circle,#06b6d440,transparent 70%)",
                  }}
                />

                {/* Accent Elements */}
                <div className="absolute top-20 right-10 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />

                <div className="absolute bottom-28 left-16 w-2 h-2 bg-violet-400 rounded-full animate-pulse" />

                <div className="absolute top-1/2 right-0 h-px w-40 bg-gradient-to-r from-cyan-400 to-transparent" />

                <div className="absolute bottom-20 right-20 h-px w-24 bg-gradient-to-r from-violet-400 to-transparent" />
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
                className="
        group
        relative
        overflow-hidden
        rounded-3xl
        p-8
        bg-white/[0.03]
        backdrop-blur-xl
        border
        border-white/[0.06]
        transition-all
        duration-500
        "
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
          bg-emerald-500/10
          border
          border-emerald-500/20
          text-emerald-400
          mb-6
          group-hover:scale-110
          transition-all
          duration-300
          "
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
          text-slate-400
          leading-relaxed
          "
                >
                  {feature.desc}
                </p>

                {/* Bottom Accent */}
                <div
                  className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-gradient-to-r
          from-emerald-400
          to-teal-400
          group-hover:w-full
          transition-all
          duration-500
          "
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <ScrollReveal>
          <section className="max-w-5xl mx-auto px-6 pb-20">
            <div className="bg-gradient-to-br from-emerald-950 to-slate-950 rounded-3xl px-10 py-16 text-center overflow-hidden relative">
              {/* Background animation */}
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
                className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl"
              />

              <div className="relative z-10">
                <h2 className="font-serif font-bold text-3xl md:text-4xl text-white mb-4">
                  Ready to start writing?
                </h2>
                <p className="text-zinc-400 mb-8 max-w-md mx-auto">
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
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}

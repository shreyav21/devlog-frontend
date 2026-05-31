"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PenLine, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useGSAPHeroAnimation } from "@/hooks/useGSAP";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { staggerContainer, staggerItem } from "@/lib/animations";


export default function HomePage() {
  useGSAPHeroAnimation();

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="hero-badge inline-flex items-center gap-2 bg-zinc-100 text-zinc-600 text-xs font-medium px-4 py-1.5 rounded-full mb-8 opacity-0">
          <Zap size={11} className="text-amber-500" />A home for developer
          writing
        </div>

        <h1 className="hero-title font-serif font-bold text-5xl md:text-7xl text-zinc-900 leading-[1.05] tracking-tight mb-6 opacity-0">
          Write. Share.
          <br />
          <span className="text-zinc-400">Inspire.</span>
        </h1>

        <p className="hero-subtitle text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed mb-10 opacity-0">
          DevLog is a minimalist blogging platform for developers. Share your
          knowledge, document your journey, grow your audience.
        </p>

        <div className="hero-cta flex flex-wrap items-center justify-center gap-3 opacity-0">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              asChild
              size="lg"
              className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-8 gap-2"
            >
              <Link href="/auth/register">
                Start writing
                <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="rounded-full px-8 text-zinc-600"
            >
              <Link href="/blog">Browse articles</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-zinc-100" />
      </div>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <PenLine size={20} />,
              title: "Write beautifully",
              desc: "A clean distraction-free editor that gets out of your way.",
            },
            {
              icon: <Users size={20} />,
              title: "Reach developers",
              desc: "Your articles reach a community of developers who care.",
            },
            {
              icon: <Zap size={20} />,
              title: "Built for speed",
              desc: "Blazing fast reads with server-side rendering and caching.",
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-6 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/50 transition-colors duration-200 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 mb-4 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-200"
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-serif font-bold text-zinc-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="bg-zinc-900 rounded-3xl px-10 py-16 text-center overflow-hidden relative">
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
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl"
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
  );
}

"use client";

import { motion } from "framer-motion";

const cards = [
  "const blog = await api.getPosts()",
  "POST /api/posts",
  "Spring Boot + MongoDB",
  "JWT Authentication",
];

export default function FloatingCards() {
  return (
    <div className="relative h-[500px] w-full">
      {cards.map((card, i) => (
        <motion.div
          key={card}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
          }}
          className="absolute bg-[var(--bg-secondary)]/70 backdrop-blur-xl border border-[var(--border)] rounded-2xl px-4 py-3 text-zinc-300 text-sm font-mono"
          style={{
            top: `${i * 90}px`,
            left: `${(i % 2) * 100}px`,
          }}
        >
          {card}
        </motion.div>
      ))}
    </div>
  );
}

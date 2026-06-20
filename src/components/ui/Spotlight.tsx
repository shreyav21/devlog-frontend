// components/ui/Spotlight.tsx

"use client";

import { useEffect, useState } from "react";

export default function Spotlight() {
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        background: `
        radial-gradient(
          250px circle at ${pos.x}px ${pos.y}px,
          rgba(59,130,246,0.22),
          transparent 70%
        )
      `,
      }}
    />
  );
}

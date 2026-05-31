"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAPScrollReveal(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [selector]);
}

export function useGSAPHeroAnimation() {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-badge",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    )
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.2",
      )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3",
      )
      .fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2",
      );

    return () => {
      tl.kill();
    };
  }, []);
}

export function useGSAPTextReveal(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          backgroundSize: "0% 2px",
        },
        {
          backgroundSize: "100% 2px",
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        },
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [selector]);
}

export function useGSAPCountUp(
  selector: string,
  endValue: number,
  duration = 2,
) {
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(
          { value: 0 },
          {
            value: endValue,
            duration,
            ease: "power2.out",
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].value).toString();
            },
          },
        );
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [selector, endValue, duration]);
}

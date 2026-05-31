"use client";

import { useState, useEffect } from "react";
import { Post } from "@/types";

const STORAGE_KEY = "devlog_user_interests";

type UserInterests = {
  likedTags: string[];
  readTags: string[];
  readPostIds: string[];
};

// Track when user reads a post
export function trackPostRead(post: Post) {
  if (typeof window === "undefined") return;
  const interests = getInterests();
  interests.readTags = [
    ...new Set([...interests.readTags, ...post.tags]),
  ].slice(0, 20);
  interests.readPostIds = [
    ...new Set([...interests.readPostIds, post.id]),
  ].slice(0, 50);
  saveInterests(interests);
}

// Track when user likes a post
export function trackPostLike(post: Post) {
  if (typeof window === "undefined") return;
  const interests = getInterests();
  interests.likedTags = [
    ...new Set([...interests.likedTags, ...post.tags]),
  ].slice(0, 20);
  saveInterests(interests);
}

function getInterests(): UserInterests {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : { likedTags: [], readTags: [], readPostIds: [] };
  } catch {
    return { likedTags: [], readTags: [], readPostIds: [] };
  }
}

function saveInterests(interests: UserInterests) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(interests));
}

// Hook for getting recommendations
export function useRecommendations(allPosts: Post[]) {
  const [recommendations, setRecommendations] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!allPosts || allPosts.length === 0) return;

    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const interests = getInterests();

        // Filter out already read posts
        const unreadPosts = allPosts.filter(
          (p) => !interests.readPostIds.includes(p.id),
        );

        const res = await fetch("/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userInterests: interests,
            availablePosts: unreadPosts.slice(0, 20), // send max 20
          }),
        });

        const data = await res.json();
        setRecommendations(data.recommendations || []);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [allPosts.length]);

  return { recommendations, isLoading };
}

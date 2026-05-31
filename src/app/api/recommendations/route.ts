import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { userInterests, availablePosts } = await req.json();

    if (!availablePosts || availablePosts.length === 0) {
      return NextResponse.json({ recommendations: [] });
    }

    // Build prompt for recommendations
    const prompt = `You are a content recommendation engine for a developer blogging platform.

USER INTERESTS:
- Tags they liked: ${userInterests.likedTags.join(", ") || "none yet"}
- Tags they read: ${userInterests.readTags.join(", ") || "none yet"}
- Topics to avoid (already read): ${userInterests.readPostIds.join(", ") || "none"}

AVAILABLE POSTS (JSON):
${JSON.stringify(
  availablePosts.map((p: any) => ({
    id: p.id,
    title: p.title,
    tags: p.tags,
    excerpt: p.excerpt?.slice(0, 100),
  })),
  null,
  2,
)}

Based on the user's interests, return ONLY a JSON array of the top 3 most relevant post IDs in order of relevance.
Return ONLY valid JSON like this, nothing else:
["id1", "id2", "id3"]

If user has no interests yet, return the 3 most popular/interesting posts based on titles and tags.`;

    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text().trim();

    // Parse JSON safely
    // const jsonMatch = text.match(/\[.*\]/s);
    // if (!jsonMatch) {
    //   return NextResponse.json({ recommendations: [] });
    // }

    // const recommendedIds: string[] = JSON.parse(jsonMatch[0]);
    const jsonMatch = text.match(/\[[\s\S]*?\]/);

    if (!jsonMatch) {
      return NextResponse.json({ recommendations: [] });
    }

    const recommendations = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ recommendations });

    // Return full post objects in recommended order
    // const recommendations = recommendedIds
    //   .map((id) => availablePosts.find((p: any) => p.id === id))
    //   .filter(Boolean);

    return NextResponse.json({ recommendations });
  } catch (error: any) {
    console.error("Recommendations error:", error);
    return NextResponse.json({ recommendations: [] });
  }
}

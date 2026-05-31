import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { question, postContent, postTitle, history } = await req.json();

    if (!question || !postContent) {
      return NextResponse.json(
        { error: "Question and post content are required" },
        { status: 400 },
      );
    }

    // Build context-aware prompt
    const systemPrompt = `You are a helpful assistant for a blog post titled "${postTitle}".
Your job is to answer questions based ONLY on the content of this blog post.
If the question is not related to the post content, politely say so.
Keep answers concise, clear and helpful.
Do not make up information that is not in the post.

POST CONTENT:
${postContent.slice(0, 8000)} 
`;
    // Build conversation history for multi-turn chat
    const chatHistory =
      history?.map((msg: any) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })) || [];

    // Start chat with history
    const chat = geminiModel.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: `I understand. I'll answer questions about "${postTitle}" based only on the post content provided. How can I help you?`,
            },
          ],
        },
        ...chatHistory,
      ],
    });

    const result = await chat.sendMessage(question);
    const response = result.response.text();

    return NextResponse.json({ answer: response });
  } catch (error: any) {
    console.error("Gemini chat error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 },
    );
  }
}

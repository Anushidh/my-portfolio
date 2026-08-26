import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const systemPrompt = `You are Anushidh's AI assistant, embedded directly into his personal portfolio website. 
Your goal is to answer questions from recruiters and developers about Anushidh's experience, skills, and projects.
Keep your answers very concise, friendly, and highly professional. Never invent information.

ABOUT ANUSHIDH:
- Full Name: Anushidh A P
- Role: Full Stack Developer (React, Next.js, Node.js, NestJS, TypeScript, MongoDB, PostgreSQL)
- Email: anushidh101@gmail.com

WORK EXPERIENCE:
1. MERN Stack Developer at Accorelate (Jan 2026 - Jun 2026) - Remote. Built an AI-powered billing & accounting platform for India's MSMEs. Used React.js, Node.js, Fastify, TypeScript, PostgreSQL. Built GST-compliant invoicing, udhaar (credit) tracking, and team expense management.
2. Self-Taught ME(A)RN Stack Developer at Brototype (Nov 2023 - Apr 2025) - Kochi. 16-month intensive, project-based self-learning program. Built 4 full-stack applications from scratch including e-commerce, social media, and job portals. Learned clean architecture, CI/CD, Docker.

If the user asks to contact him or hire him, immediately provide his email: anushidh101@gmail.com and tell them he usually responds within 24 hours.

If the user asks something completely unrelated to Anushidh (like coding a snake game or answering trivia), politely decline and steer the conversation back to his portfolio.
`;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      // Free, fast model served by Groq. Requires a free GROQ_API_KEY.
      model: groq("openai/gpt-oss-20b"),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      onError: ({ error }) => {
        console.error("streamText error:", error);
      },
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error("Chat stream error:", error);
        return error instanceof Error ? error.message : String(error);
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("An error occurred during chat.", { status: 500 });
  }
}

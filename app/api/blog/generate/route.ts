import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PROGRAMMING_TOPICS = [
  "React hooks patterns and best practices",
  "TypeScript advanced types and utility types",
  "Next.js App Router performance optimization",
  "Node.js streams and event-driven architecture",
  "Python for web scraping and automation",
  "Database indexing strategies for faster queries",
  "Docker containerization for web developers",
  "Git workflow strategies for small teams",
  "CSS Grid vs Flexbox — when to use which",
  "Web accessibility (a11y) essentials",
  "REST vs GraphQL — choosing the right API style",
  "Authentication patterns: JWT, sessions, and OAuth",
  "Tailwind CSS tips and tricks for faster styling",
  "Testing strategies: unit, integration, and e2e",
  "System design basics for frontend developers",
  "WebSocket real-time communication patterns",
  "Serverless functions and edge computing",
  "State management in React: Zustand vs Redux vs Context",
  "Responsive design patterns for modern web apps",
  "Framer Motion animation techniques for React",
  "CI/CD pipelines for JavaScript projects",
  "API rate limiting and caching strategies",
  "Clean code principles for JavaScript developers",
  "Figma to code workflow for designers and developers",
  "PostgreSQL vs MongoDB — choosing the right database",
  "Web performance optimization checklist",
  "Progressive Web Apps (PWA) in 2025",
  "Micro-frontends architecture patterns",
  "Error handling patterns in async JavaScript",
  "Building CLI tools with Node.js",
];

const AUTHORS = ["Joshua Colobong", "Jaylord Soguilon", "Jenelyn Manalo"];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// --- GitHub commit helper (for Vercel production) ---
async function commitToGitHub(
  filePath: string,
  content: string,
  commitMessage: string
) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // e.g. "Joshclxx/start-up"
  if (!token || !repo) {
    throw new Error("GITHUB_TOKEN or GITHUB_REPO not configured");
  }

  const apiBase = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  // 1. Get the current file SHA (required for updates)
  const existing = await fetch(apiBase, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const existingData = await existing.json();
  const sha = existingData.sha;

  // 2. Commit the updated file
  const res = await fetch(apiBase, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(content).toString("base64"),
      sha,
      branch: "main",
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub API error: ${JSON.stringify(err)}`);
  }

  return res.json();
}

// --- Serialize a post into the TS source format ---
function serializePost(post: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
}): string {
  return `  {
    slug: ${JSON.stringify(post.slug)},
    title: ${JSON.stringify(post.title)},
    excerpt: ${JSON.stringify(post.excerpt)},
    content: ${JSON.stringify(post.content)},
    date: ${JSON.stringify(post.date)},
    author: ${JSON.stringify(post.author)},
    tags: ${JSON.stringify(post.tags)},
    readTime: ${JSON.stringify(post.readTime)},
  },`;
}

export async function POST(request: Request) {
  try {
    // Verify Vercel cron secret in production
    if (process.env.CRON_SECRET) {
      const authHeader = request.headers.get("authorization");
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Pick a random topic and author
    const topic =
      PROGRAMMING_TOPICS[Math.floor(Math.random() * PROGRAMMING_TOPICS.length)];
    const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
    const today = new Date().toISOString().split("T")[0];

    // Call Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `You are a technical blog writer for a web development agency called JW-Tech. Write a blog post about: "${topic}".

Requirements:
- Title: Create an engaging, SEO-friendly title (not just the topic name)
- Excerpt: Write a 1-2 sentence compelling summary (max 200 chars)
- Content: Write 600-900 words in Markdown format
- Include code examples with proper syntax highlighting (use fenced code blocks with language identifiers)
- Keep tone professional but conversational, like a senior developer explaining to peers
- Include practical, actionable advice
- Use ## for section headings (not #)
- Tags: Suggest 3 relevant tags

Respond in this exact JSON format (no markdown wrapping, just raw JSON):
{
  "title": "Your Blog Title Here",
  "excerpt": "A compelling 1-2 sentence summary.",
  "content": "Full markdown content here...",
  "tags": ["Tag1", "Tag2", "Tag3"]
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON from response (handle potential markdown wrapping)
    let cleaned = responseText.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const parsed = JSON.parse(cleaned);

    const newPost = {
      slug: slugify(parsed.title) + "-" + today.replace(/-/g, ""),
      title: parsed.title,
      excerpt: parsed.excerpt,
      content: parsed.content,
      date: today,
      author,
      tags: parsed.tags,
      readTime: getReadTime(parsed.content),
    };

    const blogDataPath = "data/blog.ts";
    const isVercel = !!process.env.VERCEL;

    if (isVercel) {
      // --- PRODUCTION (Vercel): commit to GitHub → triggers redeploy ---
      // Fetch current file from GitHub
      const token = process.env.GITHUB_TOKEN;
      const repo = process.env.GITHUB_REPO;
      if (!token || !repo) {
        return NextResponse.json(
          { error: "GITHUB_TOKEN or GITHUB_REPO not set" },
          { status: 500 }
        );
      }

      const apiUrl = `https://api.github.com/repos/${repo}/contents/${blogDataPath}`;
      const existing = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const existingData = await existing.json();
      const currentContent = Buffer.from(
        existingData.content,
        "base64"
      ).toString("utf-8");

      // Inject new post at the top of the array
      const postEntry = serializePost(newPost);
      const updatedContent = currentContent.replace(
        /export const blogPosts: BlogPost\[\] = \[\n/,
        `export const blogPosts: BlogPost[] = [\n${postEntry}\n`
      );

      await commitToGitHub(
        blogDataPath,
        updatedContent,
        `📝 Auto-generate blog: ${newPost.title}`
      );
    } else {
      // --- LOCAL DEV: write directly to filesystem ---
      const fullPath = path.join(process.cwd(), blogDataPath);
      let fileContent = fs.readFileSync(fullPath, "utf-8");
      const postEntry = serializePost(newPost);
      fileContent = fileContent.replace(
        /export const blogPosts: BlogPost\[\] = \[\n/,
        `export const blogPosts: BlogPost[] = [\n${postEntry}\n`
      );
      fs.writeFileSync(fullPath, fileContent, "utf-8");
    }

    return NextResponse.json({
      success: true,
      post: {
        slug: newPost.slug,
        title: newPost.title,
        date: newPost.date,
        author: newPost.author,
      },
    });
  } catch (error) {
    console.error("Blog generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate blog post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET handler for manual testing
export async function GET(request: Request) {
  return POST(request);
}

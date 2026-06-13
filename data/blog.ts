export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
}

// Seed blog posts — new ones are added via /api/blog/generate
export const blogPosts: BlogPost[] = [
  {
    slug: "why-typescript-is-essential-in-2025",
    title: "Why TypeScript Is Essential in 2025",
    excerpt:
      "TypeScript has evolved from a niche tool to an industry standard. Here's why every JavaScript developer should be writing TypeScript today.",
    content: `## The Rise of TypeScript

TypeScript has gone from "nice to have" to "non-negotiable" in modern web development. In 2025, the ecosystem has fully embraced static typing, and for good reason.

### Type Safety Catches Bugs Early

The single biggest benefit of TypeScript is catching errors at compile time rather than runtime. Consider this common JavaScript bug:

\`\`\`typescript
// Without TypeScript — this fails silently
function getUser(id) {
  return fetch(\`/api/users/\${id}\`).then(res => res.json());
}
getUser({ id: 1 }); // Oops — passed an object instead of a number

// With TypeScript — caught immediately
function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`).then(res => res.json());
}
getUser({ id: 1 }); // ❌ Type error!
\`\`\`

### Better Developer Experience

Modern editors like VS Code provide autocomplete, inline documentation, and refactoring tools powered by TypeScript's type system. This alone makes development 2-3x faster.

### Framework Adoption

Every major framework — React, Next.js, Vue, Angular, Svelte — now has first-class TypeScript support. Libraries ship their own type definitions. The ecosystem is mature.

### Getting Started

If you're still writing plain JavaScript, start by renaming \`.js\` files to \`.ts\` and adding types incrementally. TypeScript's \`strict\` mode can be enabled gradually. There's no excuse not to start today.

The future is typed. Make sure you're ready.`,
    date: "2025-03-10",
    author: "Joshua Colobong",
    tags: ["TypeScript", "JavaScript", "Web Dev"],
    readTime: "4 min read",
  },
  {
    slug: "building-rest-apis-with-nodejs-best-practices",
    title: "Building REST APIs with Node.js: Best Practices",
    excerpt:
      "A practical guide to building clean, scalable REST APIs using Node.js, Express, and modern patterns that production apps demand.",
    content: `## REST API Architecture Done Right

Building APIs isn't just about making endpoints work — it's about building them to scale, maintain, and secure.

### Project Structure

Organize your code into layers:

\`\`\`
/src
  /controllers    → Request handling
  /services       → Business logic
  /models         → Data models
  /middleware      → Auth, validation, logging
  /routes         → Route definitions
  /utils          → Helpers
\`\`\`

### Input Validation

Never trust user input. Use libraries like Zod or Joi:

\`\`\`typescript
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
  password: z.string().min(8),
});

app.post('/users', async (req, res) => {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }
  // Safe to proceed
});
\`\`\`

### Error Handling

Create a centralized error handler:

\`\`\`typescript
class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});
\`\`\`

### Rate Limiting & Security

Always add rate limiting, CORS configuration, and helmet middleware. These three lines can save you from common attacks:

\`\`\`typescript
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
\`\`\`

APIs are the backbone of modern apps. Build them right from day one.`,
    date: "2025-03-09",
    author: "Jaylord Soguilon",
    tags: ["Node.js", "API", "Backend"],
    readTime: "5 min read",
  },
  {
    slug: "design-systems-why-every-team-needs-one",
    title: "Design Systems: Why Every Team Needs One",
    excerpt:
      "A design system is more than a component library — it's the single source of truth for how your product looks and feels. Here's how to build one.",
    content: `## What Is a Design System?

A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications. It's the bridge between design and engineering.

### The Core Building Blocks

Every design system needs these foundations:

**1. Design Tokens**
Colors, spacing, typography, and shadows defined as variables:

\`\`\`css
:root {
  --color-primary: #E0C88F;
  --color-secondary: #304870;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --radius-lg: 12px;
  --font-heading: 'Syne', sans-serif;
}
\`\`\`

**2. Component Library**
Buttons, inputs, cards, modals — all built with consistent APIs and documented with usage examples.

**3. Documentation**
Storybook, Notion, or a custom docs site. Without docs, your design system is just a folder of components nobody knows how to use.

### Why Bother?

- **Consistency**: Every screen looks like it belongs to the same product
- **Speed**: Developers compose UIs from pre-built blocks instead of writing from scratch
- **Scalability**: New team members onboard faster with clear patterns

### Getting Started

Start small. Document your existing colors and typography. Extract your most-used component (usually Button). Build from there.

A design system isn't a one-time project — it's a living product that grows with your team.`,
    date: "2025-03-08",
    author: "Jenelyn Manalo",
    tags: ["Design", "UI/UX", "CSS"],
    readTime: "4 min read",
  },
];

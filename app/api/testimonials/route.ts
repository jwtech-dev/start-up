import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { Testimonial } from "@/data/testimonials";

const DATA_PATH = path.join(process.cwd(), "data", "user-testimonials.json");

function getAdminPin(): string {
  return process.env.ADMIN_PIN || "123456";
}

function isValidPin(request: NextRequest): boolean {
  const pin = request.headers.get("x-admin-pin");
  return pin === getAdminPin();
}

async function readTestimonials(): Promise<Testimonial[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeTestimonials(testimonials: Testimonial[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(testimonials, null, 2), "utf-8");
}

// GET — public returns approved only; admin can request pending/all
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const all = await readTestimonials();

  // Admin-only filters
  if (status === "pending" || status === "all") {
    if (!isValidPin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (status === "pending") {
      return NextResponse.json(all.filter((t) => t.status === "pending"));
    }
    return NextResponse.json(all);
  }

  // Public: approved only
  return NextResponse.json(all.filter((t) => t.status === "approved"));
}

// POST — create a new pending testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name?.trim() || !body.quote?.trim() || !body.rating) {
      return NextResponse.json(
        { error: "Name, experience, and rating are required" },
        { status: 400 }
      );
    }

    const testimonial: Testimonial = {
      id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: body.name.trim(),
      company: body.company?.trim() || "Client",
      role: body.role?.trim() || "Client",
      quote: body.quote.trim(),
      rating: Math.min(5, Math.max(1, Number(body.rating))),
      initials:
        body.initials ||
        body.name
          .trim()
          .split(" ")
          .filter(Boolean)
          .map((w: string) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
      color: body.color || "from-accent to-emerald-400",
      status: "pending",
      ...(body.image ? { image: body.image } : {}),
    };

    const existing = await readTestimonials();
    existing.push(testimonial);
    await writeTestimonials(existing);

    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to save testimonial" },
      { status: 500 }
    );
  }
}

// PATCH — approve or reject a testimonial (admin only)
export async function PATCH(request: NextRequest) {
  if (!isValidPin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, action } = body as { id: string; action: "approve" | "reject" };

    if (!id || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid request. Need id and action (approve|reject)" },
        { status: 400 }
      );
    }

    const testimonials = await readTestimonials();
    const index = testimonials.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    if (action === "approve") {
      testimonials[index].status = "approved";
      await writeTestimonials(testimonials);
      return NextResponse.json({ success: true, testimonial: testimonials[index] });
    }

    // Reject = delete
    testimonials.splice(index, 1);
    await writeTestimonials(testimonials);
    return NextResponse.json({ success: true, deleted: id });
  } catch {
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

// DELETE — remove a testimonial (admin only, works on both pending and approved)
export async function DELETE(request: NextRequest) {
  if (!isValidPin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id } = body as { id: string };

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const testimonials = await readTestimonials();
    const index = testimonials.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    testimonials.splice(index, 1);
    await writeTestimonials(testimonials);
    return NextResponse.json({ success: true, deleted: id });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}

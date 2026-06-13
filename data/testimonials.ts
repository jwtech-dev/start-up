export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  color: string;
  image?: string; // optional base64 or URL
  status: "pending" | "approved";
}

// Gradient palette for avatar backgrounds
export const avatarGradients = [
  "from-accent to-emerald-400",
  "from-sapphire to-blue-400",
  "from-amber-400 to-orange-400",
  "from-rose-400 to-pink-400",
  "from-cyan-400 to-teal-400",
];

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Default testimonials (empty — managed via /testimonials/admin)
export const defaultTestimonials: Testimonial[] = [];

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Star,
  Quote,
  CheckCircle2,
  XCircle,
  Trash2,
  Shield,
  Clock,
  BadgeCheck,
  Lock,
} from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

type Tab = "pending" | "approved";

export default function AdminTestimonialsPage() {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("pending");
  const [pending, setPending] = useState<Testimonial[]>([]);
  const [approved, setApproved] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);


  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const [pendingRes, allRes] = await Promise.all([
        fetch("/api/testimonials?status=pending", {
          headers: { "x-admin-pin": pin },
        }),
        fetch("/api/testimonials?status=all", {
          headers: { "x-admin-pin": pin },
        }),
      ]);



      const pendingData = await pendingRes.json();
      const allData = await allRes.json();

      setPending(pendingData);
      setApproved(allData.filter((t: Testimonial) => t.status === "approved"));
    } catch {
      // Silently handle
    } finally {
      setLoading(false);
    }
  }, [pin]);

  // Fetch when authenticated
  useEffect(() => {
    if (authenticated) {
      fetchTestimonials();
    }
  }, [authenticated, fetchTestimonials]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;

    // Test the PIN against the API
    const res = await fetch("/api/testimonials?status=all", {
      headers: { "x-admin-pin": pin },
    });

    if (res.status === 401) {
      setPinError("Incorrect PIN");
      return;
    }

    setPinError("");
    setAuthenticated(true);
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await fetch("/api/testimonials", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
        },
        body: JSON.stringify({ id, action: "approve" }),
      });
      await fetchTestimonials();
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      await fetch("/api/testimonials", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
        },
        body: JSON.stringify({ id, action: "reject" }),
      });
      await fetchTestimonials();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    setActionLoading(id);
    try {
      await fetch("/api/testimonials", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
        },
        body: JSON.stringify({ id }),
      });
      await fetchTestimonials();
    } finally {
      setActionLoading(null);
    }
  };

  const currentList = activeTab === "pending" ? pending : approved;

  // PIN entry screen
  if (!authenticated) {
    return (
      <section
        className="min-h-[70vh] flex items-center justify-center"
        aria-label="Admin Login"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm mx-auto px-4"
        >
          <div className="p-8 rounded-2xl border border-border bg-surface/50 text-center">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
              <Lock size={24} className="text-accent" />
            </div>
            <h1 className="font-heading font-bold text-xl text-text-primary mb-2">
              Admin Access
            </h1>
            <p className="text-sm text-text-muted mb-6">
              Enter your PIN to manage testimonials.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="PIN"
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError("");
                }}
                error={pinError}
                id="admin-pin"
              />
              <Button type="submit" size="lg" fullWidth>
                <Shield size={14} />
                Unlock
              </Button>
            </form>
          </div>
        </motion.div>
      </section>
    );
  }

  // Admin dashboard
  return (
    <section className="py-12 sm:py-20 lg:py-24" aria-label="Admin Dashboard">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-4">
          <div className="glow-mint -top-40 -left-20 opacity-30" />
          <div className="glow-sapphire -top-20 right-0 opacity-20" />
          <div className="relative z-10">
            <SectionTitle
              badge="Admin"
              title="Manage Testimonials"
              subtitle="Approve, reject, or delete client testimonials."
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeTab === "pending"
                ? "bg-accent text-bg"
                : "bg-surface border border-border text-text-muted hover:text-text-primary"
            }`}
          >
            <Clock size={14} />
            Pending
            {pending.length > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-bg/20 text-xs font-bold">
                {pending.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeTab === "approved"
                ? "bg-accent text-bg"
                : "bg-surface border border-border text-text-muted hover:text-text-primary"
            }`}
          >
            <BadgeCheck size={14} />
            Approved
            <span className="ml-1 px-2 py-0.5 rounded-full bg-bg/20 text-xs font-bold">
              {approved.length}
            </span>
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-text-muted">Loading testimonials...</p>
          </div>
        ) : currentList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 rounded-2xl border border-dashed border-border"
          >
            <p className="text-text-muted text-sm">
              {activeTab === "pending"
                ? "No pending testimonials to review."
                : "No approved testimonials yet."}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {currentList.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 sm:p-6 rounded-2xl border border-border bg-surface/30 flex flex-col sm:flex-row gap-4"
                >
                  {/* Card content */}
                  <div className="flex-1 min-w-0">
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, j) => (
                          <Star
                            key={j}
                            size={12}
                            className="text-accent fill-accent"
                          />
                        )
                      )}
                    </div>

                    {/* Quote */}
                    <div className="flex gap-2 mb-3">
                      <Quote
                        size={14}
                        className="text-accent/30 shrink-0 mt-0.5"
                      />
                      <p className="text-sm text-text-muted leading-relaxed italic">
                        {testimonial.quote}
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      {testimonial.image ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-bg text-[10px] font-bold shrink-0`}
                        >
                          {testimonial.initials}
                        </div>
                      )}
                      <div>
                        <span className="font-heading font-semibold text-sm text-text-primary">
                          {testimonial.name}
                        </span>
                        <span className="text-xs text-text-muted ml-2">
                          {testimonial.role}, {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 shrink-0 sm:justify-center">
                    {activeTab === "pending" ? (
                      <>
                        <button
                          onClick={() => handleApprove(testimonial.id)}
                          disabled={actionLoading === testimonial.id}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <CheckCircle2 size={14} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(testimonial.id)}
                          disabled={actionLoading === testimonial.id}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <XCircle size={14} />
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        disabled={actionLoading === testimonial.id}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

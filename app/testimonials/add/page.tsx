"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import {
  Star,
  Quote,
  Upload,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  avatarGradients,
  getInitials,
} from "@/data/testimonials";

export default function AddTestimonialPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    quote: "",
    rating: 0,
    imageFile: null as string | null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, imageFile: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, imageFile: null }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim() || !formData.rating) return;

    setIsSubmitting(true);
    setSubmitError("");

    const colorIndex =
      formData.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
      avatarGradients.length;

    const testimonial = {
      name: formData.name.trim(),
      company: formData.company.trim() || "Client",
      role: formData.role.trim() || "Client",
      quote: formData.quote.trim(),
      rating: formData.rating,
      initials: getInitials(formData.name),
      color: avatarGradients[colorIndex],
      ...(formData.imageFile ? { image: formData.imageFile } : {}),
    };

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonial),
      });

      if (!res.ok) throw new Error("Failed to save");

      setSubmitted(true);
    } catch {
      setSubmitError("Failed to save testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      company: "",
      role: "",
      quote: "",
      rating: 0,
      imageFile: null,
    });
  };

  // Live preview data
  const previewInitials = formData.name ? getInitials(formData.name) : "?";
  const previewColorIndex = formData.name
    ? formData.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
      avatarGradients.length
    : 0;

  return (
    <section className="py-12 sm:py-20 lg:py-24" aria-label="Add Testimonial">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-4">
          <div className="glow-mint -top-40 -left-20 opacity-30" />
          <div className="glow-sapphire -top-20 right-0 opacity-20" />
          <div className="relative z-10">
            <SectionTitle
              badge="Internal"
              title="Add Testimonial"
              subtitle="Create a new client testimonial card. This page is not publicly linked."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Form */}
          <div>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-16 rounded-2xl border border-success/20 bg-success-muted"
                >
                  <CheckCircle2
                    size={48}
                    className="text-success mx-auto mb-4"
                  />
                  <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
                    Thank You!
                  </h3>
                  <p className="text-sm text-text-muted mb-8 max-w-sm mx-auto">
                    Your testimonial has been submitted and is under review.
                    It will appear on our website once approved.
                  </p>
                  <Button onClick={handleReset} variant="outline">
                    Submit Another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5 p-6 sm:p-8 rounded-2xl border border-border bg-surface/30"
                >
                  <h2 className="font-heading font-bold text-xl text-text-primary mb-2">
                    Client Information
                  </h2>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleChange("rating", star)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                          aria-label={`${star} star${star > 1 ? "s" : ""}`}
                        >
                          <Star
                            size={24}
                            className={
                              star <= formData.rating
                                ? "text-accent fill-accent"
                                : "text-border"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experience / Quote */}
                  <Textarea
                    label="Experience"
                    placeholder="What did the client say about working with us?"
                    required
                    rows={4}
                    value={formData.quote}
                    onChange={(e) => handleChange("quote", e.target.value)}
                    showCount
                    maxLength={500}
                    id="testimonial-quote"
                  />

                  {/* Name & Position */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      placeholder="Client name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      id="testimonial-name"
                    />
                    <Input
                      label="Position / Role"
                      placeholder="e.g. CTO, Founder"
                      value={formData.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      id="testimonial-role"
                    />
                  </div>

                  <Input
                    label="Company"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    id="testimonial-company"
                  />

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Photo{" "}
                      <span className="text-text-muted font-normal">
                        (optional)
                      </span>
                    </label>
                    {formData.imageFile ? (
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-border">
                          <Image
                            src={formData.imageFile}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="flex items-center gap-1.5 text-sm text-error hover:text-error/80 transition-colors cursor-pointer"
                        >
                          <X size={14} />
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-border hover:border-accent/30 bg-surface/50 cursor-pointer transition-colors">
                        <Upload size={16} className="text-text-muted" />
                        <span className="text-sm text-text-muted">
                          Upload photo (max 2MB)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                    <p className="text-xs text-text-muted mt-1.5">
                      If no photo is provided, initials will be shown instead.
                    </p>
                  </div>

                  {submitError && (
                    <p className="text-sm text-error text-center">{submitError}</p>
                  )}

                  <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Testimonial"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h3 className="text-sm text-text-muted font-medium mb-4">
              Live Preview
            </h3>
            <motion.div
              layout
              className="p-6 sm:p-8 rounded-2xl border border-border bg-bg relative"
            >
              <Quote
                size={32}
                className="text-accent/10 absolute top-6 right-6"
                aria-hidden="true"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={
                      star <= formData.rating
                        ? "text-accent fill-accent"
                        : "text-border"
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-text-muted leading-relaxed mb-6 italic">
                &ldquo;
                {formData.quote || "Their experience will appear here..."}
                &rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {formData.imageFile ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={formData.imageFile}
                      alt="Preview"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[previewColorIndex]} flex items-center justify-center text-bg text-xs font-bold shrink-0`}
                  >
                    {previewInitials}
                  </div>
                )}
                <div>
                  <div className="font-heading font-semibold text-sm text-text-primary">
                    {formData.name || "Client Name"}
                  </div>
                  <div className="text-xs text-text-muted">
                    {formData.role || "Position"}
                    {", "}
                    {formData.company || "Company"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

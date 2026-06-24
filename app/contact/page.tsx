"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Twitter,
  Send,
  CheckCircle2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@jw-tech.dev",
    href: "mailto:hello@jw-tech.dev",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote — Worldwide",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const serviceOptions = [
  { value: "webapp", label: "Web App Development" },
  { value: "uiux", label: "UI/UX Design" },
  { value: "frontend", label: "Frontend Development" },
  { value: "backend", label: "API & Backend" },
  { value: "fullstack", label: "Full-Stack Project" },
  { value: "consultation", label: "Technical Consultation" },
  { value: "other", label: "Other" },
];

const budgetOptions = [
  { value: "small", label: "Under $1,000" },
  { value: "medium", label: "$1,000 – $5,000" },
  { value: "large", label: "$5,000 – $15,000" },
  { value: "enterprise", label: "$15,000+" },
];

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    customType: "",
    budget: "",
    message: "",
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Please describe your project";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setFormData({ name: "", email: "", type: "", customType: "", budget: "", message: "" });
    setErrors({});
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className="pt-6 sm:pt-10 lg:pt-12 pb-12 sm:pb-20 lg:pb-24" aria-label="Contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative mb-4">
          <div className="glow-mint -top-40 -left-20 opacity-30" />
          <div className="glow-sapphire -top-20 right-0 opacity-20" />
          <div className="relative z-10">
            <SectionTitle
              badge="Contact Us"
              title="Let's Talk"
              subtitle="Ready to bring your idea to life? We'd love to hear about it."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info cards */}
            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="card-glow p-4 sm:p-5 rounded-xl border border-border bg-surface/50 hover:border-accent/20 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <info.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-0.5">{info.label}</div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-medium text-text-primary hover:text-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-text-primary">
                        {info.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-sm text-text-muted mb-3 font-medium">Find us online</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-lg border border-border bg-surface flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-5 rounded-xl border border-accent/20 bg-accent/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-sm text-accent font-medium">
                  Currently Available
                </span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                We&apos;re accepting new projects. Average response time is under 24 hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-20 rounded-2xl border border-success/20 bg-success-muted"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    <CheckCircle2 size={48} className="text-success mx-auto mb-4" />
                  </motion.div>
                  <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-text-muted">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5 p-6 sm:p-8 rounded-2xl border border-border bg-surface/30"
                >
                  <h2 className="font-heading font-bold text-xl text-text-primary mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-text-muted mb-6">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      error={errors.name}
                      id="contact-name"
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      error={errors.email}
                      id="contact-email"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Select
                        label="Service Type"
                        placeholder="Select a service"
                        options={serviceOptions}
                        value={formData.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                        id="contact-type"
                      />
                      <AnimatePresence>
                        {formData.type === "other" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              label="Specify Service"
                              placeholder="Describe the service you need..."
                              value={formData.customType}
                              onChange={(e) => handleChange("customType", e.target.value)}
                              id="contact-custom-type"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <Select
                      label="Budget Range"
                      placeholder="Select budget"
                      options={budgetOptions}
                      value={formData.budget}
                      onChange={(e) => handleChange("budget", e.target.value)}
                      id="contact-budget"
                    />
                  </div>

                  <Textarea
                    label="Project Details"
                    placeholder="Tell us about your project, timeline, and goals..."
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    error={errors.message}
                    showCount
                    maxLength={2000}
                    id="contact-message"
                  />

                  <Button type="submit" size="lg" fullWidth>
                    Send Message
                    <Send size={14} />
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

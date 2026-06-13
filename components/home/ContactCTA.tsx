"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Send, CheckCircle2, Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const serviceOptions = [
  { value: "webapp", label: "Web App Development" },
  { value: "uiux", label: "UI/UX Design" },
  { value: "frontend", label: "Frontend Development" },
  { value: "api", label: "API & Backend" },
  { value: "fullstack", label: "Full-Stack Project" },
  { value: "other", label: "Other" },
];

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    customType: "",
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
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setFormData({ name: "", email: "", type: "", customType: "", message: "" });
    setErrors({});
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden" id="contact" aria-label="Contact">
      {/* Decorative glows */}
      <div className="glow-sapphire -bottom-32 left-1/4" />
      <div className="glow-mint -bottom-20 right-1/4 opacity-40" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="Get in Touch"
          title="Let's Build Something"
          subtitle="Have a project in mind? Drop us a line and let's talk about bringing your idea to life."
        />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16 rounded-2xl border border-success/20 bg-success-muted"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              >
                <CheckCircle2 size={48} className="text-success mx-auto mb-4" />
              </motion.div>
              <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
                Message Sent!
              </h3>
              <p className="text-sm text-text-muted">
                We&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              noValidate
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <Input
                label="Name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
                id="cta-name"
              />
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
                id="cta-email"
              />
              <Select
                label="Project Type"
                placeholder="Select a service"
                options={serviceOptions}
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="sm:col-span-2"
                id="cta-type"
              />
              <AnimatePresence>
                {formData.type === "other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="sm:col-span-2"
                  >
                    <Input
                      label="Specify Service"
                      placeholder="Describe the service you need..."
                      value={formData.customType}
                      onChange={(e) => handleChange("customType", e.target.value)}
                      id="cta-custom-type"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Textarea
                label="Message"
                placeholder="Tell us about your project..."
                required
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                error={errors.message}
                className="sm:col-span-2"
                id="cta-message"
              />
              <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button type="submit" size="lg" fullWidth className="sm:!w-auto">
                  Send Message
                  <Send size={14} />
                </Button>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-muted">Or find us on</span>
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg border border-border bg-surface flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all"
                      aria-label={social.label}
                    >
                      <social.icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

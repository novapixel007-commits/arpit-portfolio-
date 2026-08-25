import React, { useState } from "react";
import { toast } from "sonner";
import { Mail, Instagram, Linkedin, MapPin, ArrowRight, Loader2, Check } from "lucide-react";
import { sendContactEmail } from "@/lib/emailjs";
import { AnimatePresence, motion } from "motion/react";

const PROJECT_TYPES = [
  "Commercial",
  "Brand Film",
  "Product Video",
  "Motion Graphics",
  "Social Media",
];

const TIMELINES = ["ASAP", "1 month", "1–3 months", "Flexible"];

const BUDGET_OPTIONS = [
  "Under ₹25K",
  "₹25K–₹50K",
  "₹50K–₹1L",
  "₹1L+",
  "Let's Discuss",
];

interface FormErrors {
  name?: string;
  email?: string;
  budget?: string;
  message?: string;
}

function validateForm(name: string, email: string, budget: string, message: string): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = "Name is required";
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Valid email is required";
  if (!budget.trim()) errors.budget = "Please select a budget range";
  if (!message.trim()) errors.message = "Please describe your project";
  return errors;
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  
  const [type, setType] = useState(PROJECT_TYPES[0]);
  const [timeline, setTimeline] = useState(TIMELINES[2]);
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Track blurred fields to only show errors after interaction
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string) ?? "";
    const email = (fd.get("email") as string) ?? "";
    const company = (fd.get("company") as string) ?? "";
    const message = (fd.get("message") as string) ?? "";

    // Force all fields to be "touched" on submit attempt
    setTouched({ name: true, email: true, budget: true, message: true });

    const formErrors = validateForm(name, email, budget, message);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setSending(true);

    try {
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        category: type,
        budget,
        timeline,
        message: message.trim(),
      });
      setSubmitted(true);
      toast.success("✓ Inquiry Sent Successfully", {
        description: "I'll get back to you within 24 hours.",
        duration: 6000,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error occurred.";
      console.error("[Contact] Email send failed:", err);
      toast.error("Failed to send inquiry.", {
        description: msg,
        duration: 8000,
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="relative mt-20 py-16 lg:mt-32 lg:py-24 scroll-mt-24 border-t border-white/5">
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_7fr] gap-16 lg:gap-24 items-start">
          
          {/* ── LEFT: Contact Details ── */}
          <div className="space-y-12">
            <div>
              <p className="text-[14px] font-medium text-[#6EE7FF] mb-4">
                Get in touch
              </p>
              <h2 className="text-[2rem] lg:text-[2.5rem] font-bold leading-tight text-foreground">
                Let's discuss your project.
              </h2>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:arpit.work007@gmail.com"
                className="group flex items-center gap-4 text-foreground hover:text-[#6EE7FF] transition-colors"
              >
                <Mail className="size-5 text-muted-foreground group-hover:text-[#6EE7FF] transition-colors" />
                <span className="font-medium">arpit.work007@gmail.com</span>
              </a>
              <a
                href="https://www.instagram.com/i.arpitsharma_?igsh=Ynp0MXVrcTNxOXVt"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-foreground hover:text-[#6EE7FF] transition-colors"
              >
                <Instagram className="size-5 text-muted-foreground group-hover:text-[#6EE7FF] transition-colors" />
                <span className="font-medium">instagram.com/i.arpitsharma_</span>
              </a>
              <a
                href="https://www.linkedin.com/in/arpit-sharma-484457379"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-foreground hover:text-[#6EE7FF] transition-colors"
              >
                <Linkedin className="size-5 text-muted-foreground group-hover:text-[#6EE7FF] transition-colors" />
                <span className="font-medium">linkedin.com/in/arpit-sharma</span>
              </a>
              <a
                href="https://maps.google.com/?q=Chandigarh,India"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-foreground hover:text-[#6EE7FF] transition-colors"
              >
                <MapPin className="size-5 text-muted-foreground group-hover:text-[#6EE7FF] transition-colors" />
                <span className="font-medium">Chandigarh, India</span>
              </a>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 relative">
            {!submitted ? (
              <form onSubmit={onSubmit} className="space-y-8" noValidate>
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[14px] font-medium text-muted-foreground mb-2">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onBlur={() => handleBlur("name")}
                      onChange={() => clearError("name")}
                      className={`w-full bg-black/30 border rounded-md px-4 py-3 text-[14px] text-foreground outline-none transition-colors ${
                        touched.name && errors.name ? "border-red-500/50" : "border-white/10 focus:border-[#6EE7FF]/60"
                      }`}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1.5 text-[13px] text-red-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[14px] font-medium text-muted-foreground mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onBlur={() => handleBlur("email")}
                      onChange={() => clearError("email")}
                      className={`w-full bg-black/30 border rounded-md px-4 py-3 text-[14px] text-foreground outline-none transition-colors ${
                        touched.email && errors.email ? "border-red-500/50" : "border-white/10 focus:border-[#6EE7FF]/60"
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1.5 text-[13px] text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Company (Optional) */}
                <div>
                  <label htmlFor="company" className="block text-[14px] font-medium text-muted-foreground mb-2">
                    Company / Brand
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-[14px] text-foreground outline-none transition-colors focus:border-[#6EE7FF]/60"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-[14px] font-medium text-muted-foreground mb-3">
                    Project type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                          type === t
                            ? "bg-[#6EE7FF]/10 text-[#6EE7FF] border-[#6EE7FF]/50"
                            : "bg-black/20 border-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-[14px] font-medium text-muted-foreground mb-3">
                    Timeline
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIMELINES.map((tl) => (
                      <button
                        key={tl}
                        type="button"
                        onClick={() => setTimeline(tl)}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                          timeline === tl
                            ? "bg-[#8B7CFF]/15 text-[#8B7CFF] border-[#8B7CFF]/50"
                            : "bg-black/20 border-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
                        }`}
                      >
                        {tl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-[14px] font-medium text-muted-foreground mb-3">
                    When do you need it?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          setBudget(b);
                          clearError("budget");
                        }}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                          budget === b
                            ? "bg-[#6EE7FF]/10 text-[#6EE7FF] border-[#6EE7FF]/50"
                            : "bg-black/20 border-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {touched.budget && errors.budget && (
                    <p className="mt-2 text-[13px] text-red-400">{errors.budget}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[14px] font-medium text-muted-foreground mb-2">
                    Project details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    onBlur={() => handleBlur("message")}
                    onChange={() => clearError("message")}
                    className={`w-full bg-black/30 border rounded-md px-4 py-3 text-[14px] text-foreground outline-none transition-colors resize-y ${
                      touched.message && errors.message ? "border-red-500/50" : "border-white/10 focus:border-[#6EE7FF]/60"
                    }`}
                  />
                  {touched.message && errors.message && (
                    <p className="mt-1.5 text-[13px] text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 bg-[#F5F5F5] text-[#0A0A0A] py-3.5 rounded-md text-[14px] font-semibold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Let's Build Something Great
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="py-16 text-center">
                <div className="mx-auto size-12 rounded-full bg-[#6EE7FF]/10 flex items-center justify-center mb-6">
                  <Check className="size-6 text-[#6EE7FF]" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Inquiry sent successfully.
                </h3>
                <p className="text-muted-foreground text-[14px]">
                  I'll review your project and get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setBudget("");
                    setType(PROJECT_TYPES[0]);
                    setTimeline(TIMELINES[2]);
                    setErrors({});
                    setTouched({});
                  }}
                  className="mt-8 px-6 py-2 border border-white/10 rounded-full text-[13px] font-medium text-foreground hover:bg-white/5 transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

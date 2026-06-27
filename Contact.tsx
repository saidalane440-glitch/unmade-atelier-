import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import { addInquiry } from "../lib/store";

const services = [
  "Brand Identity",
  "E-commerce Startup Kit",
  "Website Mockup",
  "Packaging & Print",
  "Art Direction",
  "Other",
];

const budgets = ["Under $5k", "$5k – $10k", "$10k – $25k", "$25k – $50k", "$50k+"];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: services[0],
    budget: budgets[1],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please tell us your name.";
    if (!form.email.trim()) e.email = "Please share an email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "That email doesn't look right.";
    if (!form.message.trim() || form.message.trim().length < 12)
      e.message = "Tell us a little more about the project (12+ characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Persist locally + (in production) email the admin via a serverless function.
    // See the /admin page for the live inbox that receives these.
    addInquiry({
      name: form.name,
      email: form.email,
      company: form.company || undefined,
      service: form.service,
      budget: form.budget,
      message: form.message,
    });
    setSubmitted(true);
  };

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-muted">Contact</div>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold tracking-tight md:text-8xl">
            Tell us about your project.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">
            Whether it's a half-formed idea or a fully scoped brief, we want to hear it. We reply
            personally — usually within two working days.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-6 rounded-2xl border border-ink/10 bg-paper p-8 md:p-10"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <Field
                    label="Your name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    error={errors.name}
                    placeholder="Sade Okonkwo"
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    error={errors.email}
                    placeholder="you@studio.com"
                  />
                </div>

                <Field
                  label="Company / brand (optional)"
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v })}
                  placeholder="What are we working on?"
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <SelectField
                    label="Service"
                    value={form.service}
                    options={services}
                    onChange={(v) => setForm({ ...form, service: v })}
                  />
                  <SelectField
                    label="Budget"
                    value={form.budget}
                    options={budgets}
                    onChange={(v) => setForm({ ...form, budget: v })}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-muted">
                    About the project
                  </label>
                  <textarea
                    rows={6}
                    placeholder="A few sentences on what you're building, the audience, and when you'd like to launch."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`mt-2 w-full resize-none border-b bg-transparent py-3 text-base focus:outline-none transition-colors ${
                      errors.message ? "border-accent" : "border-ink/20 focus:border-ink"
                    }`}
                  />
                  {errors.message && (
                    <div className="mt-1 text-xs text-accent">{errors.message}</div>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                  <p className="text-xs text-muted">
                    By submitting you agree to our handling your details per the privacy policy.
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm text-paper hover:bg-accent transition-colors"
                  >
                    Send enquiry
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-cream p-10 md:p-14"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
                  <Check size={20} />
                </div>
                <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
                  Thanks, {form.name.split(" ")[0] || "friend"}.
                </h2>
                <p className="mt-4 max-w-lg text-lg text-ink/75">
                  Your enquiry is in the studio inbox. We'll read every word and reply within two
                  working days from <span className="font-medium">hello@unmadeatelier.co</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", company: "", service: services[0], budget: budgets[1], message: "" });
                  }}
                  className="mt-8 text-sm link-underline text-ink/70 hover:text-ink"
                >
                  Send another enquiry →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="md:col-span-5 space-y-10 md:pl-8 md:border-l md:border-ink/10">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted">Email</div>
            <a href="mailto:hello@unmadeatelier.co" className="mt-2 block font-display text-2xl link-underline">
              hello@unmadeatelier.co
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted">Studio hours</div>
            <p className="mt-2 text-ink/75">Monday – Friday, 09:00 – 18:00 GMT</p>
            <p className="text-ink/60 text-sm">Replies within 2 working days, always from a real human.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted">For press</div>
            <a href="mailto:press@unmadeatelier.co" className="mt-2 block link-underline">press@unmadeatelier.co</a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted">Studio</div>
            <p className="mt-2 text-ink/75">London · Lagos · Remote</p>
            <p className="text-ink/60 text-sm">Working with founders worldwide.</p>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.25em] text-muted">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full border-b bg-transparent py-3 text-base focus:outline-none transition-colors ${
          error ? "border-accent" : "border-ink/20 focus:border-ink"
        }`}
      />
      {error && <div className="mt-1 text-xs text-accent">{error}</div>}
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.25em] text-muted">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-base focus:border-ink focus:outline-none"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
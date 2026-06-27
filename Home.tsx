import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import ProjectArt from "../components/ProjectArt";
import { loadProjects } from "../lib/store";

const services = [
  {
    title: "Brand Identity",
    desc: "Strategy, naming, logos, type systems and the rules that hold them together.",
  },
  {
    title: "E-commerce Startup Kit",
    desc: "From naming to packaging to a launch-ready Shopify store — shipped in 90 days.",
  },
  {
    title: "Website Mockups",
    desc: "High-fidelity design systems and motion-driven prototypes that earn the click.",
  },
  {
    title: "Packaging & Print",
    desc: "Materials, labels, editorial systems and the details that survive production.",
  },
  {
    title: "Art Direction",
    desc: "Photography, campaign concepts and the visual language to scale them.",
  },
  {
    title: "Design Systems",
    desc: "Living component libraries and brand ops that outlive the launch sprint.",
  },
];

const process = [
  { step: "01", title: "Discover", body: "Workshops, audits and a brief that doesn't lie." },
  { step: "02", title: "Explore", body: "AI-assisted concepting, curated by senior designers." },
  { step: "03", title: "Refine", body: "Tight, considered craft — typography, layout, motion." },
  { step: "04", title: "Ship", body: "Production files, hand-off and a launch you can measure." },
];

const clients = ["Norse", "Fold Co.", "Atrium", "Mira", "Field Notes", "Halen", "Wend", "Lumen"];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = loadProjects().slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section ref={heroRef} className="relative grain">
        <motion.div style={{ y, opacity }} className="mx-auto max-w-7xl px-6 pt-16 pb-24 md:px-10 md:pt-28 md:pb-40">
          <Reveal>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Brand · Ecommerce · Digital
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-[clamp(2.6rem,9vw,8.5rem)] font-black leading-[0.95] tracking-[-0.04em] text-ink">
              Brands, <em className="font-display italic font-light">shaped</em>
              <br />
              with intelligence.
              <br />
              <span className="text-ink/40">Finished by hand.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
              <p className="md:col-span-6 max-w-xl text-lg leading-relaxed text-ink/70">
                Unmade Atelier is a contemporary design studio for founders who care about how their
                brand feels. We use AI to explore further, faster — and human craft to make sure
                every detail earns its place.
              </p>
              <div className="md:col-span-6 flex flex-wrap gap-3 md:justify-end">
                <Link
                  to="/work"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-paper hover:bg-accent transition-colors"
                >
                  See selected work
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm text-ink hover:border-ink hover:bg-ink hover:text-paper transition-colors"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.35}>
            <div className="mt-16 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8 md:grid-cols-4">
              {[
                { v: "60+", l: "Brands shipped" },
                { v: "11", l: "Industries" },
                { v: "9", l: "International awards" },
                { v: "92%", l: "Repeat or referred" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl font-bold tracking-tight md:text-5xl">{s.v}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-ink/10 bg-cream py-8 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...clients, ...clients].map((c, i) => (
            <span
              key={i}
              className="mx-10 font-display text-3xl font-semibold tracking-tight text-ink/60 md:text-5xl"
            >
              {c} <span className="mx-6 text-accent">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="text-xs uppercase tracking-[0.3em] text-muted">What we do</div>
              <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-6xl">
                A studio for the parts of your brand that matter most.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-lg leading-relaxed text-ink/70">
                We design the systems that make a business recognisable — and the details that make
                it feel inevitable. Our work spans identity, commerce and the digital experiences
                that connect them.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="group relative h-full bg-paper p-8 transition-colors hover:bg-cream">
                <div className="text-xs uppercase tracking-[0.25em] text-muted">
                  0{i + 1}
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-ink/70 leading-relaxed">{s.desc}</p>
                <ArrowUpRight
                  className="absolute right-6 top-6 text-ink/30 transition-all group-hover:text-ink group-hover:-translate-y-1 group-hover:translate-x-1"
                  size={20}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="flex items-end justify-between gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted">Selected work</div>
              <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-6xl">
                Recent projects.
              </h2>
            </div>
            <Link
              to="/work"
              className="hidden md:inline-flex items-center gap-2 text-sm link-underline"
            >
              View all work →
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <Link
                to={`/work/${p.slug}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="aspect-[4/3]"
                  >
                    <ProjectArt variant={p.cover as any} className="h-full w-full" />
                  </motion.div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-muted">{p.category} · {p.year}</div>
                    <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="mt-2 text-ink/40 transition-all group-hover:text-ink group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.3em] text-paper/50">How we think</div>
            <h2 className="mt-4 max-w-4xl font-display text-5xl font-bold tracking-tight md:text-7xl">
              AI is the canvas.
              <br />
              <em className="font-display italic font-light text-accent">Craft</em> is the answer.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-paper/70">
              We don't hide the tools — we use them. Generative exploration helps us test more
              directions in a week than traditional studios test in a month. But every concept is
              curated, every decision is deliberate, and every final pixel is touched by hand.
              That's the difference between output and design.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-muted">Process</div>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-bold tracking-tight md:text-6xl">
            Four steps. No theatrics.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <div className="border-t border-ink/20 pt-6">
                <div className="font-display text-3xl text-ink/30">{p.step}</div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-ink/70 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.3em] text-muted">From a client</div>
            <blockquote className="mt-8 font-display text-3xl leading-snug tracking-tight md:text-5xl">
              “Unmade didn't just design our brand — they gave us a way to talk about it. Every
              decision after launch got easier because the system was that good.”
            </blockquote>
            <div className="mt-8 text-sm text-ink/60">
              <span className="font-medium text-ink">Eliza Hart</span> · Founder, Hart Studio
            </div>
          </Reveal>
        </div>
      </section>

      {/* STUDIO NOTES — Marco & Max */}
      <section className="border-y border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:px-10 md:py-28">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted">Studio notes</div>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                On craft, AI and taste.
              </h3>
              <p className="mt-5 text-base leading-relaxed text-ink/75">
                "AI is the canvas — craft is the answer. We use generative tools the way a film
                studio uses a Steadicam: to get places that would otherwise be impossible. But
                every frame we ship has been chosen, refined and approved by a human with taste."
              </p>
              <p className="mt-3 text-sm text-ink/60">— Marco, design lead</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted">From Max</div>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                What we actually do, in plain English.
              </h3>
              <p className="mt-5 text-base leading-relaxed text-ink/75">
                "We sell clarity to founders. Brand identity is the vocabulary. Ecommerce startup
                kits are the grammar. Website mockups are the sentence. And the studio is the
                editor — making sure the whole thing sounds like one person, not a department
                store. The AI is invisible in the final output. That's the point."
              </p>
              <p className="mt-3 text-sm text-ink/60">— Max, business descriptor</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 rounded-3xl bg-ink p-10 text-paper md:flex-row md:items-end md:p-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                Have a project in mind?
              </h2>
              <p className="mt-5 text-lg text-paper/70">
                Tell us about your brand, your idea or your launch. We reply within two working
                days — and we read every word.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-medium text-paper hover:bg-paper hover:text-ink transition-colors"
            >
              Start a conversation
              <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
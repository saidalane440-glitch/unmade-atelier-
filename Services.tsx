import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";

const offerings = [
  {
    title: "Brand Identity",
    blurb: "Names, marks, type, colour, voice and the rules that hold them together.",
    bullets: [
      "Brand strategy & positioning",
      "Naming & verbal identity",
      "Logo, wordmark & monogram",
      "Typography & colour systems",
      "Brand guidelines & governance",
    ],
  },
  {
    title: "E-commerce Startup Kit",
    blurb: "Everything a new brand needs to sell — packaged for a 90-day launch.",
    bullets: [
      "Brand foundation",
      "Packaging & unboxing",
      "Shopify or Webflow storefront",
      "Product photography direction",
      "Launch creative & ad system",
    ],
  },
  {
    title: "Website Mockups & Build",
    blurb: "Conversion-led design with the polish of a custom site.",
    bullets: [
      "Sitemap & UX architecture",
      "High-fidelity mockups",
      "Design system & components",
      "Motion & micro-interaction",
      "Webflow / Shopify / Framer build",
    ],
  },
  {
    title: "Packaging & Print",
    blurb: "Materials-first design that survives production and the shelf.",
    bullets: [
      "Structural & graphic packaging",
      "Label & dieline systems",
      "Editorial & publication design",
      "Print production oversight",
    ],
  },
  {
    title: "Art Direction",
    blurb: "The visual language that scales across content and campaigns.",
    bullets: [
      "Photography direction",
      "Campaign concepts",
      "Social & content templates",
      "Ongoing brand stewardship",
    ],
  },
  {
    title: "Design Systems",
    blurb: "Living systems that outlive the launch sprint.",
    bullets: [
      "Component libraries",
      "Token & variable systems",
      "Documentation & onboarding",
      "Handoff to internal teams",
    ],
  },
];

export default function Services() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-muted">Services</div>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold tracking-tight md:text-7xl">
            What we make, end to end.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">
            Pick a service, a kit, or build something custom. Every engagement starts with a
            conversation — no obligations, no funnels.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 md:grid-cols-2">
          {offerings.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05}>
              <div className="group relative h-full bg-paper p-10 transition-colors hover:bg-cream">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.25em] text-muted">0{i + 1}</div>
                  <ArrowUpRight className="text-ink/30 transition-all group-hover:text-ink group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />
                </div>
                <h2 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-4xl">{o.title}</h2>
                <p className="mt-3 max-w-md text-ink/70">{o.blurb}</p>
                <ul className="mt-6 space-y-2 text-sm text-ink/80">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-1 w-3 shrink-0 bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Engagement models</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: "Sprint", p: "from $4,800", d: "2–4 weeks. One focused deliverable — identity refresh, packaging, landing page." },
              { t: "Kit", p: "from $14,000", d: "6–10 weeks. Multi-deliverable launch kit — brand + commerce + web." },
              { t: "Studio", p: "monthly retainer", d: "Ongoing design partnership for active brands. Priority access, weekly cadence." },
            ].map((m, i) => (
              <Reveal key={m.t} delay={i * 0.08}>
                <div className="rounded-2xl border border-paper/15 p-8">
                  <div className="text-xs uppercase tracking-[0.25em] text-paper/50">{m.t}</div>
                  <div className="mt-2 font-display text-3xl font-bold">{m.p}</div>
                  <p className="mt-4 text-paper/70">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-paper hover:bg-paper hover:text-ink transition-colors">
                Start a conversation <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
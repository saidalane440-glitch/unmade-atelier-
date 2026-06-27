import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";

const values = [
  {
    t: "Curiosity first",
    d: "We start every brief with questions, not answers. The strongest brands are the ones we helped their founders articulate.",
  },
  {
    t: "Craft over output",
    d: "AI accelerates exploration. Human judgement decides. Every shipped pixel is touched, considered and approved by a senior designer.",
  },
  {
    t: "Systems that scale",
    d: "We design for the second year of your business, not the launch week. Identity systems and component libraries that keep working.",
  },
  {
    t: "Plain talk",
    d: "Clear briefs. Honest timelines. No jargon. We tell you what we know and what we don't — early.",
  },
];

const team = [
  { name: "Sade O.", role: "Founder & Creative Director" },
  { name: "Linus K.", role: "Design Lead, Identity" },
  { name: "Amelia R.", role: "Design Lead, Digital" },
  { name: "Jules M.", role: "Motion & Art Direction" },
];

export default function About() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-muted">About</div>
          <h1 className="mt-4 max-w-5xl font-display text-5xl font-bold tracking-tight md:text-8xl">
            A small studio for <em className="font-display italic font-light">ambitious</em> brands.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 md:px-10">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7 space-y-6 text-lg leading-relaxed text-ink/75">
              <p>
                Unmade Atelier is a contemporary design studio working at the intersection of brand,
                commerce and digital experience. We help founders turn ambitious ideas into brands
                that feel inevitable.
              </p>
              <p>
                We started with a simple observation: the best work today is made by small,
                opinionated teams who can move quickly. So that's what we are. A senior-led studio
                of four, working alongside a trusted network of writers, photographers and
                developers when projects need them.
              </p>
              <p>
                Our process blends AI-assisted exploration with deliberate craft. Tools help us
                explore further, faster. Our taste decides what survives. The result is work that
                feels current — without ever looking generated.
              </p>
            </div>

            <aside className="md:col-span-5 space-y-6 border-l border-ink/15 pl-6 text-sm text-ink/75">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted">Founded</div>
                <div className="mt-1">2021 — by Sade O., previously design lead at two independent studios.</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted">Based</div>
                <div className="mt-1">London · Lagos · Remote</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted">Working with</div>
                <div className="mt-1">Founders, creative directors, and the occasional CMO.</div>
              </div>
            </aside>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-ink/10 bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">What we believe</h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-ink/10 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.05}>
                <div className="h-full bg-paper p-10">
                  <div className="text-xs uppercase tracking-[0.25em] text-muted">0{i + 1}</div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{v.t}</h3>
                  <p className="mt-3 text-ink/75 leading-relaxed">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">The team</h2>
        </Reveal>
        <div className="mt-12 grid gap-px bg-ink/10 md:grid-cols-4">
          {team.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className="h-full bg-paper p-8">
                <div className="aspect-square w-full overflow-hidden rounded-full bg-cream">
                  <div className="flex h-full w-full items-center justify-center font-display text-5xl font-black text-ink/15">
                    {p.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                </div>
                <div className="mt-5 font-display text-xl font-semibold">{p.name}</div>
                <div className="mt-1 text-sm text-muted">{p.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl">
              We don't claim to be AI or to hide it.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-paper/70">
              The brief says "AI inspiration, professional tone, not annoying." That's exactly our
              position. We use the tools. We're candid about it. And our work earns its keep on
              craft, not novelty.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-cream p-10 md:flex-row md:items-center">
            <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Want to work with us?</h3>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper hover:bg-accent transition-colors">
              Send a brief <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
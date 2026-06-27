import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import ProjectArt from "../components/ProjectArt";
import { loadProjects } from "../lib/store";
import type { ProjectCategory } from "../lib/types";

const categories: ("All" | ProjectCategory)[] = [
  "All",
  "Brand Identity",
  "E-commerce Kit",
  "Website Mockup",
  "Packaging",
  "Editorial",
  "Art Direction",
];

export default function Work() {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const projects = useMemo(() => loadProjects(), []);
  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-muted">Work</div>
          <h1 className="mt-4 font-display text-6xl font-bold tracking-tight md:text-8xl">
            Selected projects.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">
            A growing archive of brands, storefronts and digital experiences built with the
            founders who trusted us.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 md:px-10">
        <div className="flex flex-wrap gap-2 border-b border-ink/10 pb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                filter === c
                  ? "bg-ink text-paper"
                  : "border border-ink/15 text-ink/70 hover:border-ink hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.1}>
              <Link to={`/work/${p.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl bg-cream">
                  <div className="aspect-[4/3] overflow-hidden">
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]">
                      <ProjectArt variant={p.cover as any} className="h-full w-full" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted">
                      <span>{p.category}</span>
                      <span className="h-1 w-1 rounded-full bg-ink/30" />
                      <span>{p.year}</span>
                    </div>
                    <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-md text-ink/70">{p.summary}</p>
                  </div>
                  <ArrowUpRight className="mt-2 shrink-0 text-ink/40 transition-all group-hover:text-ink group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-ink/60">
            No projects in this category yet — try another filter.
          </div>
        )}
      </section>
    </div>
  );
}
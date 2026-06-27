import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { loadProjects } from "../lib/store";
import ProjectArt from "../components/ProjectArt";
import Reveal from "../components/Reveal";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = loadProjects().find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl font-bold">Project not found</h1>
        <p className="mt-4 text-ink/60">The project you're looking for doesn't exist.</p>
        <Link to="/work" className="mt-8 inline-flex items-center gap-2 text-sm link-underline">
          <ArrowLeft size={16} /> Back to all work
        </Link>
      </div>
    );
  }

  const others = loadProjects().filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pt-12 md:px-10">
        <Link to="/work" className="inline-flex items-center gap-2 text-sm link-underline text-ink/70 hover:text-ink">
          <ArrowLeft size={16} /> All work
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="text-xs uppercase tracking-[0.3em] text-muted">{project.category} · {project.year}</div>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-ink/70">{project.description}</p>
          </div>
          <div className="md:col-span-4">
            <dl className="space-y-6 border-l border-ink/15 pl-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-muted">Client</dt>
                <dd className="mt-1 font-medium">{project.client}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-muted">Services</dt>
                <dd className="mt-1">{project.services.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-muted">Tags</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/70">{t}</span>
                  ))}
                </dd>
              </div>
              {project.results && (
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-muted">Results</dt>
                  <dd className="mt-1 text-ink/80">
                    <ul className="space-y-1">
                      {project.results.map((r) => <li key={r}>— {r}</li>)}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="overflow-hidden rounded-3xl">
            <ProjectArt variant={project.cover as any} className="h-full w-full" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">The brief</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">{project.description}</p>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">
            We worked alongside the founding team from discovery through launch — building the
            identity, the commerce system and the digital surface that ties them together.
          </p>
        </Reveal>
      </section>

      {others.length > 0 && (
        <section className="border-t border-ink/10 bg-cream">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Next projects</h2>
              <Link to="/work" className="text-sm link-underline">View all →</Link>
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {others.map((p) => (
                <Link key={p.id} to={`/work/${p.slug}`} className="group">
                  <div className="overflow-hidden rounded-xl bg-paper">
                    <div className="aspect-[4/3] overflow-hidden">
                      <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]">
                        <ProjectArt variant={p.cover as any} className="h-full w-full" />
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold group-hover:text-accent">{p.title}</h3>
                  <div className="mt-1 text-xs uppercase tracking-[0.25em] text-muted">{p.category}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-ink p-10 text-paper md:flex-row md:items-center">
          <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Like this? Let's talk.</h3>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm text-paper hover:bg-paper hover:text-ink transition-colors">
            Start a project <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
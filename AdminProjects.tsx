import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus, Search, Trash2, Edit3, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { loadProjects, upsertProject, deleteProject } from "../../lib/store";
import type { Project, ProjectCategory } from "../../lib/types";
import ProjectArt from "../../components/ProjectArt";

const categories: ProjectCategory[] = [
  "Brand Identity",
  "E-commerce Kit",
  "Website Mockup",
  "Packaging",
  "Editorial",
  "Art Direction",
];

const covers = ["ceramics", "fold", "atrium", "mira", "field", "halen"] as const;

const emptyDraft = (): Project => ({
  id: "p_" + Math.random().toString(36).slice(2, 9),
  slug: "",
  title: "",
  client: "",
  year: String(new Date().getFullYear()),
  category: "Brand Identity",
  tags: [],
  summary: "",
  description: "",
  cover: "ceramics",
  accent: "#0a0a0a",
  services: [],
});

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Project | null>(null);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    setProjects(loadProjects());
    if (params.get("new") === "1") {
      setEditing(emptyDraft());
      params.delete("new");
      setParams(params, { replace: true });
    }
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return projects;
    const needle = q.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(needle) ||
        p.client.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle)
    );
  }, [projects, q]);

  const handleSave = (p: Project) => {
    const next = upsertProject(p);
    setProjects(next);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setProjects(deleteProject(id));
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted">Projects</div>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">Manage work</h1>
        </div>
        <button
          onClick={() => setEditing(emptyDraft())}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper hover:bg-accent"
        >
          <Plus size={14} /> New project
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-ink/10 bg-paper px-4 py-2.5">
        <Search size={16} className="text-ink/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects…"
          className="w-full bg-transparent text-sm focus:outline-none"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-paper">
        <table className="w-full text-sm">
          <thead className="bg-cream text-left text-xs uppercase tracking-[0.2em] text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Project</th>
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Year</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-cream/60">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 overflow-hidden rounded-md bg-cream">
                      <ProjectArt variant={p.cover as any} className="h-full w-full" />
                    </div>
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-xs text-muted">/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink/70">{p.client}</td>
                <td className="px-5 py-3 text-ink/70">{p.category}</td>
                <td className="px-5 py-3 text-ink/70">{p.year}</td>
                <td className="px-5 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button
                      onClick={() => setEditing(p)}
                      className="rounded-md p-2 text-ink/70 hover:bg-ink hover:text-paper"
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="rounded-md p-2 text-ink/70 hover:bg-accent hover:text-paper"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-ink/60">
                  No projects match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editing && (
          <ProjectEditor
            key={editing.id}
            project={editing}
            onClose={() => setEditing(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectEditor({
  project,
  onClose,
  onSave,
}: {
  project: Project;
  onClose: () => void;
  onSave: (p: Project) => void;
}) {
  const [draft, setDraft] = useState<Project>(project);
  const [tagInput, setTagInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");

  const addTag = () => {
    const v = tagInput.trim();
    if (!v) return;
    setDraft({ ...draft, tags: [...draft.tags, v] });
    setTagInput("");
  };
  const addService = () => {
    const v = serviceInput.trim();
    if (!v) return;
    setDraft({ ...draft, services: [...draft.services, v] });
    setServiceInput("");
  };

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const valid = draft.title.trim() && draft.slug.trim() && draft.client.trim() && draft.summary.trim();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 backdrop-blur-sm md:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-3xl bg-paper p-6 md:rounded-3xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 hover:bg-ink/5">
          <X size={18} />
        </button>
        <div className="text-xs uppercase tracking-[0.25em] text-muted">
          {project.title ? "Edit project" : "New project"}
        </div>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">{draft.title || "Untitled project"}</h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <TextField label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v, slug: draft.slug || slugify(v) })} />
          <TextField label="Slug (URL)" value={draft.slug} onChange={(v) => setDraft({ ...draft, slug: slugify(v) })} />
          <TextField label="Client" value={draft.client} onChange={(v) => setDraft({ ...draft, client: v })} />
          <TextField label="Year" value={draft.year} onChange={(v) => setDraft({ ...draft, year: v })} />

          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-muted">Category</label>
            <select
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value as ProjectCategory })}
              className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-base focus:border-ink focus:outline-none"
            >
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-muted">Cover artwork</label>
            <div className="mt-2 grid grid-cols-6 gap-2">
              {covers.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setDraft({ ...draft, cover: c })}
                  className={`overflow-hidden rounded-md ring-1 transition-all ${
                    draft.cover === c ? "ring-2 ring-accent" : "ring-ink/10"
                  }`}
                >
                  <div className="aspect-[4/3]">
                    <ProjectArt variant={c} className="h-full w-full" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-xs uppercase tracking-[0.25em] text-muted">Summary</label>
          <textarea
            rows={2}
            value={draft.summary}
            onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
            className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-base focus:border-ink focus:outline-none"
          />
        </div>

        <div className="mt-5">
          <label className="text-xs uppercase tracking-[0.25em] text-muted">Description</label>
          <textarea
            rows={5}
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-base focus:border-ink focus:outline-none"
          />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-muted">Tags</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {draft.tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDraft({ ...draft, tags: draft.tags.filter((x) => x !== t) })}
                  className="rounded-full bg-ink px-3 py-1 text-xs text-paper"
                >
                  {t} ✕
                </button>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add tag, press Enter"
                className="flex-1 border-b border-ink/20 bg-transparent py-1 text-sm focus:border-ink focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-muted">Services</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {draft.services.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setDraft({ ...draft, services: draft.services.filter((x) => x !== s) })}
                  className="rounded-full border border-ink/15 px-3 py-1 text-xs hover:bg-ink/5"
                >
                  {s} ✕
                </button>
              ))}
              <input
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
                placeholder="Add service, press Enter"
                className="flex-1 border-b border-ink/20 bg-transparent py-1 text-sm focus:border-ink focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-muted">Slug: /work/{draft.slug || "—"}</div>
          <div className="flex gap-2">
            <button onClick={onClose} className="rounded-full border border-ink/15 px-5 py-2.5 text-sm hover:border-ink">
              Cancel
            </button>
            <button
              disabled={!valid}
              onClick={() => onSave(draft)}
              className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper hover:bg-accent disabled:opacity-50"
            >
              Save project
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.25em] text-muted">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-base focus:border-ink focus:outline-none"
      />
    </div>
  );
}
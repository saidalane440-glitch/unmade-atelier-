import { Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowUpRight, FolderKanban, Inbox, Mail, TrendingUp } from "lucide-react";
import { loadProjects, loadInquiries } from "../../lib/store";
import { formatRelative } from "../../lib/utils";

export default function AdminDashboard() {
  const projects = useMemo(() => loadProjects(), []);
  const inquiries = useMemo(() => loadInquiries(), []);
  const newInquiries = inquiries.filter((i) => i.status === "new");

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted">Dashboard</div>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">Good to see you.</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/projects" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper hover:bg-accent">
            <FolderKanban size={14} /> New project
          </Link>
          <Link to="/admin/inquiries" className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-sm hover:border-ink">
            <Inbox size={14} /> Inbox ({newInquiries.length})
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total projects" value={projects.length} icon={FolderKanban} />
        <Stat label="New enquiries" value={newInquiries.length} icon={Mail} accent />
        <Stat label="All enquiries" value={inquiries.length} icon={Inbox} />
        <Stat label="Reply rate" value={`${Math.round(((inquiries.length - newInquiries.length) / Math.max(inquiries.length, 1)) * 100)}%`} icon={TrendingUp} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-ink/10 bg-paper p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Recent enquiries</h2>
            <Link to="/admin/inquiries" className="text-xs text-ink/60 hover:text-ink link-underline">View all →</Link>
          </div>
          <div className="mt-4 divide-y divide-ink/10">
            {inquiries.slice(0, 5).map((i) => (
              <Link
                key={i.id}
                to={`/admin/inquiries`}
                className="group flex items-start justify-between gap-4 py-4 hover:bg-cream -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${i.status === "new" ? "bg-accent" : "bg-ink/30"}`} />
                    <span className="font-medium truncate">{i.name}</span>
                    <span className="text-xs text-muted">· {i.service}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink/65 line-clamp-1">{i.message}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted">{formatRelative(i.createdAt)}</div>
                  <ArrowUpRight size={14} className="ml-auto mt-1 text-ink/30 group-hover:text-ink" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-paper p-6">
          <h2 className="font-display text-xl font-semibold">Quick actions</h2>
          <div className="mt-4 space-y-2">
            <QuickAction to="/admin/projects?new=1" label="Post a new project" />
            <QuickAction to="/admin/inquiries" label="Reply to enquiries" />
            <QuickAction to="/" label="View public site" external />
            <QuickAction to="/admin/projects" label="Edit existing project" />
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-ink/10 bg-paper p-6">
        <h2 className="font-display text-xl font-semibold">How the admin works</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3 text-sm text-ink/75">
          <Step n="01" t="Auth" d="Sign in at /admin/login. The public site has no knowledge of this area — different routes, different layout, different storage." />
          <Step n="02" t="Manage projects" d="Create, edit or delete projects. Changes are live on the public site immediately." />
          <Step n="03" t="Reply to enquiries" d="Enquiries from the public contact form land in the inbox. Reply with the built-in email composer — sends via SMTP or Resend." />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon, accent = false }: any) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-paper p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.25em] text-muted">{label}</div>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent ? "bg-accent/10 text-accent" : "bg-ink/5 text-ink/70"}`}>
          <Icon size={14} />
        </div>
      </div>
      <div className="mt-3 font-display text-3xl font-bold">{value}</div>
    </div>
  );
}

function QuickAction({ to, label, external }: { to: string; label: string; external?: boolean }) {
  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-ink/10 px-4 py-3 text-sm hover:bg-cream">
        {label}
        <ArrowUpRight size={14} className="text-ink/40" />
      </a>
    );
  }
  return (
    <Link to={to} className="flex items-center justify-between rounded-lg border border-ink/10 px-4 py-3 text-sm hover:bg-cream">
      {label}
      <ArrowUpRight size={14} className="text-ink/40" />
    </Link>
  );
}

function Step({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-ink/30">{n}</div>
      <h3 className="mt-2 font-display text-lg font-semibold">{t}</h3>
      <p className="mt-2 text-ink/65 leading-relaxed">{d}</p>
    </div>
  );
}
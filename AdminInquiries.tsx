import { useEffect, useMemo, useState } from "react";
import { Search, Send, Mail, MailOpen, Archive, Inbox as InboxIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { loadInquiries, updateInquiry } from "../../lib/store";
import { formatRelative } from "../../lib/utils";
import type { Inquiry } from "../../lib/types";

export default function AdminInquiries() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "new" | "replied" | "archived">("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [sentFlash, setSentFlash] = useState(false);

  useEffect(() => {
    const all = loadInquiries();
    setItems(all);
    if (all.length && !activeId) setActiveId(all[0].id);
  }, []);

  const filtered = useMemo(() => {
    let list = items;
    if (status !== "all") list = list.filter((i) => i.status === status);
    if (q.trim()) {
      const n = q.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(n) ||
          i.email.toLowerCase().includes(n) ||
          i.message.toLowerCase().includes(n) ||
          i.service.toLowerCase().includes(n)
      );
    }
    return list;
  }, [items, q, status]);

  const active = items.find((i) => i.id === activeId);

  const refresh = (next: Inquiry[]) => setItems(next);

  const handleSend = () => {
    if (!active || !reply.trim()) return;
    const updated = updateInquiry(active.id, {
      status: "replied",
      thread: [
        ...(active.thread || []),
        {
          id: "t_" + Math.random().toString(36).slice(2, 9),
          from: "admin",
          subject: `Re: ${active.service} enquiry`,
          body: reply,
          at: new Date().toISOString(),
        },
      ],
    });
    refresh(updated);
    setReply("");
    setSentFlash(true);
    setTimeout(() => setSentFlash(false), 1800);
  };

  const toggleArchive = (i: Inquiry) => {
    const next = updateInquiry(i.id, { status: i.status === "archived" ? "replied" : "archived" });
    refresh(next);
  };

  const newCount = items.filter((i) => i.status === "new").length;

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted">Inquiries</div>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">Studio inbox</h1>
          <p className="mt-1 text-sm text-ink/60">
            {newCount} new {newCount === 1 ? "enquiry" : "enquiries"} · {items.length} total
          </p>
        </div>
        <div className="text-xs text-ink/60 hidden md:block">
          Replies sent from <span className="font-medium text-ink">studio@unmadeatelier.co</span> via Resend / SMTP
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {[
          { k: "all", l: "All" },
          { k: "new", l: `New (${newCount})` },
          { k: "replied", l: "Replied" },
          { k: "archived", l: "Archived" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setStatus(t.k as any)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              status === t.k ? "bg-ink text-paper" : "border border-ink/15 text-ink/70 hover:border-ink hover:text-ink"
            }`}
          >
            {t.l}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 rounded-xl border border-ink/10 bg-paper px-4 py-2.5 min-w-[260px]">
          <Search size={16} className="text-ink/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search inbox…"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[360px_1fr]">
        <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper">
          {filtered.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-ink/60">
              <InboxIcon className="mx-auto mb-3 text-ink/30" />
              No enquiries match.
            </div>
          )}
          {filtered.map((i) => (
            <button
              key={i.id}
              onClick={() => setActiveId(i.id)}
              className={`flex w-full items-start gap-3 border-b border-ink/5 px-4 py-4 text-left transition-colors ${
                activeId === i.id ? "bg-cream" : "hover:bg-cream/60"
              }`}
            >
              <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${i.status === "new" ? "bg-accent" : i.status === "replied" ? "bg-ink/30" : "bg-ink/10"}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-medium">{i.name}</span>
                  <span className="shrink-0 text-[10px] text-muted">{formatRelative(i.createdAt)}</span>
                </div>
                <div className="truncate text-xs text-ink/60">{i.service} · {i.budget}</div>
                <p className="mt-1 line-clamp-2 text-sm text-ink/70">{i.message}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-ink/10 bg-paper overflow-hidden">
          {active ? (
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-6 py-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-muted">{active.service}</div>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">{active.name}</h2>
                  <div className="mt-1 text-sm text-ink/70">
                    <a href={`mailto:${active.email}`} className="link-underline">{active.email}</a>
                    {active.company && <> · {active.company}</>}
                    · {active.budget}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      active.status === "new"
                        ? "bg-accent/10 text-accent"
                        : active.status === "replied"
                        ? "bg-ink/5 text-ink/70"
                        : "bg-ink/5 text-ink/40"
                    }`}
                  >
                    {active.status}
                  </span>
                  <button
                    onClick={() => toggleArchive(active)}
                    className="rounded-full p-2 text-ink/60 hover:bg-ink/5"
                    title={active.status === "archived" ? "Unarchive" : "Archive"}
                  >
                    <Archive size={14} />
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-6">
                <Bubble from="client" name={active.name} body={active.message} at={active.createdAt} />
                {(active.thread || []).map((t) => (
                  <Bubble key={t.id} from={t.from} name={t.from === "admin" ? "Studio" : active.name} body={t.body} at={t.at} />
                ))}
              </div>

              <div className="border-t border-ink/10 p-4">
                <textarea
                  rows={4}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder={`Reply to ${active.name}…`}
                  className="w-full resize-none rounded-xl border border-ink/10 bg-cream p-4 text-sm focus:border-ink focus:outline-none"
                />
                <div className="mt-3 flex items-center justify-between">
                  <AnimatePresence>
                    {sentFlash && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2 text-xs text-ink/70"
                      >
                        <MailOpen size={12} /> Reply queued to {active.email}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={handleSend}
                    disabled={!reply.trim()}
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper hover:bg-accent disabled:opacity-50"
                  >
                    <Send size={14} /> Send reply
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[400px] items-center justify-center text-sm text-ink/50">
              <Mail className="mr-2" /> Select an enquiry to view it.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Bubble({
  from,
  name,
  body,
  at,
}: {
  from: "admin" | "client";
  name: string;
  body: string;
  at: string;
}) {
  const isAdmin = from === "admin";
  return (
    <div className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
          isAdmin ? "bg-ink text-paper" : "bg-cream text-ink"
        }`}
      >
        <div className={`text-[10px] uppercase tracking-[0.25em] ${isAdmin ? "text-paper/60" : "text-ink/50"}`}>
          {isAdmin ? "Studio" : name} · {formatRelative(at)}
        </div>
        <p className="mt-2 whitespace-pre-wrap">{body}</p>
      </div>
    </div>
  );
}
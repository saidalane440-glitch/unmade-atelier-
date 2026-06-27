import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderKanban, Inbox, LogOut, ArrowLeft } from "lucide-react";
import Logo from "./Logo";
import { clearSession } from "../lib/store";

export default function AdminShell() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate("/admin/login");
  };

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/projects", label: "Projects", icon: FolderKanban },
    { to: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="hidden md:flex flex-col border-r border-ink/10 bg-paper">
          <div className="px-6 py-6 border-b border-ink/10">
            <Logo showSubtitle className="scale-[0.6] origin-left" />
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1 text-xs text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Studio admin
            </div>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-1">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                    isActive ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  }`
                }
              >
                <n.icon size={16} />
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-ink/10 p-4 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink/70 hover:bg-ink/5 hover:text-ink"
            >
              <ArrowLeft size={14} /> Back to site
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink/70 hover:bg-ink/5 hover:text-ink"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between border-b border-ink/10 bg-paper px-4 py-3">
          <Logo showSubtitle className="scale-[0.5] origin-left" />
          <div className="flex gap-1">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
                    isActive ? "bg-ink text-paper" : "text-ink/70"
                  }`
                }
              >
                <n.icon size={14} />
              </NavLink>
            ))}
            <button onClick={handleLogout} className="rounded-lg px-3 py-2 text-xs text-ink/70">
              <LogOut size={14} />
            </button>
          </div>
        </div>

        <main className="overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
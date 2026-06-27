import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-paper/85 backdrop-blur-md border-b border-ink/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="block">
          <Logo className="text-ink scale-[0.6] origin-left" showSubtitle />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm tracking-wide link-underline ${
                  isActive ? "text-ink" : "text-ink/70 hover:text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper hover:bg-accent transition-colors"
        >
          Start a project →
        </Link>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-ink"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden border-t border-ink/10 bg-paper transition-[max-height] duration-300 ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `py-3 text-base ${isActive ? "text-ink" : "text-ink/70"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm text-paper"
          >
            Start a project →
          </Link>
        </div>
      </div>
    </header>
  );
}
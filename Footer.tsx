import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Instagram = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

const Linkedin = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10v7" />
    <circle cx="8" cy="7" r="0.6" fill="currentColor" />
    <path d="M12 17v-4a2 2 0 0 1 4 0v4" />
    <path d="M12 10v7" />
  </svg>
);
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-24">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="light" showSubtitle className="scale-[0.8] origin-left" />
            <p className="mt-6 max-w-sm text-paper/70 leading-relaxed">
              A design atelier crafting brand identities, ecommerce startup kits and website
              mockups — built with AI exploration, finished by hand.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] text-paper/50">Studio</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/about" className="link-underline">About</Link></li>
              <li><Link to="/services" className="link-underline">Services</Link></li>
              <li><Link to="/work" className="link-underline">Work</Link></li>
              <li><Link to="/contact" className="link-underline">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] text-paper/50">Reach us</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="mailto:hello@unmadeatelier.co" className="link-underline">hello@unmadeatelier.co</a></li>
              <li className="text-paper/60">London · Lagos · Remote</li>
              <li>
                <Link to="/admin/login" className="link-underline text-paper/60 hover:text-paper">
                  Studio admin
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-paper/50">Newsletter</h4>
            <p className="mt-5 text-sm text-paper/70">
              A monthly dispatch — new work, notes from the studio, no noise.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-2 border-b border-paper/30 pb-2"
            >
              <input
                placeholder="you@studio.com"
                className="w-full bg-transparent text-sm placeholder:text-paper/40 focus:outline-none"
              />
              <button aria-label="Subscribe" className="text-paper/80 hover:text-paper">
                <ArrowUpRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <a href="#" aria-label="Instagram" className="hover:text-paper"><Instagram size={16} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-paper"><Linkedin size={16} /></a>
          </div>
          <div>© {new Date().getFullYear()} Unmade Atelier. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
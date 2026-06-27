import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import Logo from "../../components/Logo";
import { setSession } from "../../lib/store";

const VALID_EMAIL = "studio@unmadeatelier.co";
const VALID_PASS = "atelier2025";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASS) {
        setSession(email);
        navigate("/admin");
      } else {
        setError("Those credentials don't match. Try the demo: studio@unmadeatelier.co / atelier2025");
      }
      setLoading(false);
    }, 350);
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-ink p-12 text-paper">
        <Logo variant="light" showSubtitle className="scale-[0.7] origin-left" />
        <div>
          <h2 className="font-display text-5xl font-bold tracking-tight">
            The studio, behind the studio.
          </h2>
          <p className="mt-4 max-w-md text-paper/70">
            Edit projects, post new work, and respond to enquiries — all from one quiet room.
          </p>
        </div>
        <div className="text-xs text-paper/40">
          Separate from the public site. Auth-protected. demo@unmadeatelier.co / atelier2025
        </div>
      </div>

      <div className="flex items-center justify-center bg-paper p-8">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="w-full max-w-sm"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-cream">
            <Lock size={18} />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-ink/60">
            Welcome back. Use the demo credentials below to enter the studio.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="text-xs uppercase tracking-[0.25em] text-muted">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="studio@unmadeatelier.co"
                className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-base focus:border-ink focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.25em] text-muted">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-base focus:border-ink focus:outline-none"
              />
            </div>

            {error && <div className="text-sm text-accent">{error}</div>}

            <button
              disabled={loading}
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-paper hover:bg-accent transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Enter studio"}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="mt-10 rounded-xl bg-cream p-4 text-xs text-ink/70">
            <div className="font-medium text-ink">Demo credentials</div>
            <div className="mt-1">studio@unmadeatelier.co · atelier2025</div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
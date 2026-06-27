import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminShell from "./components/AdminShell";

import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminInquiries from "./pages/admin/AdminInquiries";

import { getSession } from "./lib/store";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const location = useLocation();
  useEffect(() => {
    setAuthed(!!getSession());
  }, [location.pathname]);

  if (authed === null) return null;
  if (!authed) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const loc = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [loc.pathname]);

  return (
    <Routes>
      {/* ADMIN ROUTES (subdomain-style: /admin/*) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminShell />
          </RequireAuth>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="inquiries" element={<AdminInquiries />} />
      </Route>

      {/* PUBLIC ROUTES */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/work"
        element={
          <PublicLayout>
            <Work />
          </PublicLayout>
        }
      />
      <Route
        path="/work/:slug"
        element={
          <PublicLayout>
            <ProjectDetail />
          </PublicLayout>
        }
      />
      <Route
        path="/services"
        element={
          <PublicLayout>
            <Services />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
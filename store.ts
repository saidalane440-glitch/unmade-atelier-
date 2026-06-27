import type { Project, Inquiry } from "./types";

const STORAGE_KEYS = {
  projects: "ua.projects.v1",
  inquiries: "ua.inquiries.v1",
  session: "ua.session.v1",
};

export const seedProjects: Project[] = [
  {
    id: "p1",
    slug: "norse-ceramics",
    title: "Norse Ceramics",
    client: "Norse Ceramics",
    year: "2025",
    category: "Brand Identity",
    tags: ["Identity", "Packaging", "Art Direction"],
    summary: "A grounded, earth-toned identity for a Nordic ceramics studio.",
    description:
      "We crafted an identity rooted in raw materiality. The wordmark, monogram and editorial system lean into the weight of clay, the softness of kiln-fired glaze and the quiet drama of negative space.",
    cover: "ceramics",
    accent: "#c9b89a",
    services: ["Brand strategy", "Wordmark & monogram", "Packaging system", "Photography direction"],
    results: ["42% lift in DTC sales in launch quarter", "Featured in It's Nice That"],
  },
  {
    id: "p2",
    slug: "fold-supply-co",
    title: "Fold Supply Co.",
    client: "Fold Supply Co.",
    year: "2025",
    category: "E-commerce Kit",
    tags: ["E-commerce", "Identity", "Shopify"],
    summary: "A complete launch system for a modular luggage startup.",
    description:
      "From naming to packaging to a launch-ready Shopify storefront, Fold needed to ship a brand and a shop in 90 days. We delivered a modular identity, hero imagery system, and product page architecture that converts.",
    cover: "fold",
    accent: "#0a0a0a",
    services: ["Naming", "Identity", "Packaging", "Shopify theme", "Launch strategy"],
    results: ["$180k pre-orders in first 30 days", "3.4x ROAS on launch ads"],
  },
  {
    id: "p3",
    slug: "atrium-realty",
    title: "Atrium Realty",
    client: "Atrium",
    year: "2024",
    category: "Website Mockup",
    tags: ["Web", "UX", "Brand"],
    summary: "A high-trust digital presence for a luxury property group.",
    description:
      "Atrium sells spaces, not square footage. We translated that into a website experience built around cinematic scroll, layered storytelling and a private viewing request flow that feels inevitable.",
    cover: "atrium",
    accent: "#1f3a5f",
    services: ["UX architecture", "Visual design", "Webflow build", "Motion"],
    results: ["+68% qualified leads month-over-month"],
  },
  {
    id: "p4",
    slug: "mira-skincare",
    title: "Mira Skincare",
    client: "Mira",
    year: "2024",
    category: "Packaging",
    tags: ["Packaging", "Identity", "Print"],
    summary: "Botanical-forward packaging for a clinical skincare line.",
    description:
      "Mira needed a packaging system that could move from clinic counter to bathroom shelf without losing either audience. We built a flexible label architecture and a typographic system that breathes.",
    cover: "mira",
    accent: "#7c8a6b",
    services: ["Packaging", "Label system", "Photography", "Retail toolkit"],
  },
  {
    id: "p5",
    slug: "field-notes-coffee",
    title: "Field Notes Coffee",
    client: "Field Notes",
    year: "2024",
    category: "Brand Identity",
    tags: ["Identity", "Editorial"],
    summary: "An editorial identity for a single-origin roaster.",
    description:
      "Field Notes treats coffee like reportage. The identity leans into newspaper typography, broadsheet grids and a dispatch-style logotype for each origin release.",
    cover: "field",
    accent: "#3b2a1f",
    services: ["Identity", "Editorial system", "Subscription packaging"],
  },
  {
    id: "p6",
    slug: "halen-saas",
    title: "Halen SaaS",
    client: "Halen",
    year: "2025",
    category: "Website Mockup",
    tags: ["Web", "SaaS", "Brand"],
    summary: "A confident web presence for an early-stage analytics SaaS.",
    description:
      "Halen sells clarity. We built a website that demonstrates it — a quiet, rigorous layout system, two deliberate typography voices, and an explainer sequence that earns the click.",
    cover: "halen",
    accent: "#ff5b1f",
    services: ["Brand refresh", "Web design", "Motion system"],
    results: ["Demo conversion up 2.1x post launch"],
  },
];

export const seedInquiries: Inquiry[] = [
  {
    id: "i1",
    name: "Eliza Hart",
    email: "eliza@hartstudio.com",
    company: "Hart Studio",
    budget: "$10k – $25k",
    service: "Brand Identity",
    message:
      "Hi! We're a small interior design studio launching our own product line and need a full identity plus packaging. Would love to chat about timelines.",
    status: "new",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: "i2",
    name: "Marcus O.",
    email: "marcus@fold.co",
    company: "Fold Supply",
    budget: "$25k – $50k",
    service: "E-commerce Kit",
    message: "Following up — ready to start scope. Will share brief this week.",
    status: "replied",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    notes: [
      { id: "n1", text: "Send scoping doc & Stripe deposit link", at: new Date().toISOString() },
    ],
    thread: [
      {
        id: "t1",
        from: "admin",
        subject: "Re: E-commerce kit",
        body: "Hi Marcus — thanks for following up. I'll send a short scoping doc tomorrow morning so we can lock the first milestone. Best, Unmade.",
        at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      },
    ],
  },
  {
    id: "i3",
    name: "Priya N.",
    email: "priya@atrium.io",
    company: "Atrium",
    budget: "$50k+",
    service: "Website Mockup",
    message: "Phase 2 discussion — interested in extending our system to the new listings portal.",
    status: "new",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
  },
];

// ---------------- Projects ----------------
export function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.projects);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(seedProjects));
      return seedProjects;
    }
    return JSON.parse(raw) as Project[];
  } catch {
    return seedProjects;
  }
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
}

export function upsertProject(p: Project) {
  const all = loadProjects();
  const idx = all.findIndex((x) => x.id === p.id);
  if (idx >= 0) all[idx] = p;
  else all.unshift(p);
  saveProjects(all);
  return all;
}

export function deleteProject(id: string) {
  const all = loadProjects().filter((p) => p.id !== id);
  saveProjects(all);
  return all;
}

// ---------------- Inquiries ----------------
export function loadInquiries(): Inquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.inquiries);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.inquiries, JSON.stringify(seedInquiries));
      return seedInquiries;
    }
    return JSON.parse(raw) as Inquiry[];
  } catch {
    return seedInquiries;
  }
}

export function saveInquiries(items: Inquiry[]) {
  localStorage.setItem(STORAGE_KEYS.inquiries, JSON.stringify(items));
}

export function addInquiry(input: Omit<Inquiry, "id" | "status" | "createdAt">): Inquiry {
  const all = loadInquiries();
  const created: Inquiry = {
    ...input,
    id: "i_" + Math.random().toString(36).slice(2, 9),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  all.unshift(created);
  saveInquiries(all);
  return created;
}

export function updateInquiry(id: string, patch: Partial<Inquiry>) {
  const all = loadInquiries();
  const idx = all.findIndex((x) => x.id === id);
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...patch };
    saveInquiries(all);
  }
  return all;
}

// ---------------- Session ----------------
export function getSession(): { email: string; loggedInAt: string } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.session);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(email: string) {
  sessionStorage.setItem(
    STORAGE_KEYS.session,
    JSON.stringify({ email, loggedInAt: new Date().toISOString() })
  );
}

export function clearSession() {
  sessionStorage.removeItem(STORAGE_KEYS.session);
}
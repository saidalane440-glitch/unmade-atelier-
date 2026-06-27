export type ProjectCategory =
  | "Brand Identity"
  | "E-commerce Kit"
  | "Website Mockup"
  | "Packaging"
  | "Editorial"
  | "Art Direction";

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: ProjectCategory;
  tags: string[];
  summary: string;
  description: string;
  cover: string;       // gradient or solid CSS background identifier
  accent: string;      // accent color
  services: string[];
  results?: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  budget: string;
  service: string;
  message: string;
  status: "new" | "replied" | "archived";
  createdAt: string; // ISO
  notes?: { id: string; text: string; at: string }[];
  thread?: { id: string; from: "admin" | "client"; subject?: string; body: string; at: string }[];
}

export interface AdminSession {
  email: string;
  loggedInAt: string;
}
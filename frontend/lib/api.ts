import qs from "qs";
import type {
  ContactFormInput,
  Page,
  Project,
  Service,
  SiteSettings,
  TeamMember,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";

// Population map for the Page dynamic zone: each section component needs its
// own populate rule since Strapi does not deep-populate `on` blocks with `populate=*`.
const PAGE_POPULATE = {
  seo: true,
  sections: {
    on: {
      "sections.page-title": { populate: ["backgroundImage"] },
      "sections.hero": { populate: { slides: { populate: ["backgroundImage"] } } },
      "sections.about": { populate: ["image", "cta"] },
      "sections.services-grid": { populate: { services: { populate: ["image", "hoverImage"] } } },
      "sections.projects-grid": { populate: { projects: { populate: ["coverImage"] } } },
      "sections.team-grid": { populate: { members: { populate: ["image"] } } },
      "sections.stats": { populate: ["backgroundImage", "counters"] },
      "sections.contact": true,
      "sections.cta-banner": { populate: ["backgroundImage", "cta"] },
    },
  },
};

async function strapiFetch<T>(path: string, query?: Record<string, unknown>): Promise<T> {
  const queryString = query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : "";
  const res = await fetch(`${API_URL}/api${path}${queryString}`, {
    headers: {
      "Content-Type": "application/json",
      ...(process.env.STRAPI_API_TOKEN
        ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
        : {}),
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed (${res.status}): ${path}`);
  }

  const json = await res.json();
  return json.data as T;
}

export const fetchPage = (slug: string) =>
  strapiFetch<Page[]>("/pages", {
    filters: { slug: { $eq: slug } },
    populate: PAGE_POPULATE,
  }).then((pages) => pages[0]);

export const fetchServices = (category?: Service["category"]) =>
  strapiFetch<Service[]>("/services", {
    populate: ["image", "hoverImage"],
    sort: ["order:asc"],
    ...(category ? { filters: { category: { $eq: category } } } : {}),
  });

export const fetchProjects = () =>
  strapiFetch<Project[]>("/projects", {
    populate: ["coverImage"],
    sort: ["order:asc"],
  });

export const fetchProjectBySlug = (slug: string) =>
  strapiFetch<Project[]>("/projects", {
    filters: { slug: { $eq: slug } },
    populate: ["coverImage", "gallery"],
  }).then((projects) => projects[0]);

export const fetchTeam = () =>
  strapiFetch<TeamMember[]>("/team-members", {
    populate: ["image"],
    sort: ["order:asc"],
  });

export const fetchSettings = () =>
  strapiFetch<SiteSettings>("/site-setting", {
    populate: ["logo", "favicon", "social"],
  });

export const submitContactForm = async (data: ContactFormInput) => {
  const res = await fetch(`${API_URL}/api/contact-messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    throw new Error("Échec de l'envoi du message de contact");
  }

  return res.json();
};

export const strapiMediaUrl = (url: string) =>
  url.startsWith("http") ? url : `${API_URL}${url}`;

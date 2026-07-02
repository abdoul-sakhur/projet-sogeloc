# Plan d'Exécution - Artemis Construction Website

## Phase 1 : Mise en Place Infrastructure

### 1.1 Initialiser le Projet Next.js
```bash
npx create-next-app@latest artemis-construction --typescript --tailwind --app
cd artemis-construction
```

### 1.2 Initialiser Strapi
```bash
mkdir backend
cd backend
npx create-strapi-app@latest . --quickstart
```

### 1.3 Structure du Projet
```
artemis-project/
├── frontend/                  # Next.js App
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Accueil
│   │   ├── about/page.tsx    # À Propos
│   │   ├── services/page.tsx # Services
│   │   ├── projects/page.tsx # Projets
│   │   ├── team/page.tsx     # Équipe
│   │   └── contact/page.tsx  # Contact
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSlider.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── ProjectsGrid.tsx
│   │   │   ├── TeamGrid.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── PageBuilder.tsx
│   ├── lib/
│   │   ├── api.ts            # Appels API Strapi
│   │   ├── types.ts          # Types TypeScript
│   │   └── constants.ts
│   ├── public/
│   │   └── images/
│   └── styles/               # CSS global
│
└── backend/                  # Strapi CMS
    ├── src/
    │   ├── api/             # Collections
    │   │   ├── page/
    │   │   ├── service/
    │   │   ├── project/
    │   │   ├── team-member/
    │   │   ├── hero-slide/
    │   │   └── settings/
    │   ├── admin/
    │   └── config/
    └── package.json
```

---

## Phase 2 : Configuration Strapi

### 2.1 Collections à Créer (dans Strapi Admin UI)

**Page Collection:**
- slug (slug, unique, required)
- title (string)
- metaDescription (text)
- sections (relation, many-to-many with Section)

**Section Collection:**
- type (enum: hero, about, services-grid, projects-grid, team-grid, contact)
- title (string)
- subtitle (string)
- content (richtext)
- image (media)
- backgroundColor (string)
- order (number)
- items (relation with SectionItem, many)

**Service Collection:**
- title (string, required)
- slug (slug, unique)
- description (richtext)
- shortDescription (text)
- image (media)
- icon (media)
- details (array of strings)

**Project Collection:**
- title (string, required)
- slug (slug, unique)
- description (richtext)
- status (enum: en-cours, completed)
- location (string)
- images (media, multiple)
- thumbnail (media, single)

**TeamMember Collection:**
- firstName (string, required)
- lastName (string, required)
- position (string)
- bio (richtext)
- image (media)
- email (email)
- phone (string)

**HeroSlide Collection:**
- title (string, required)
- description (richtext)
- backgroundImage (media, required)
- ctaText (string)
- ctaLink (string)
- order (number)

**Settings (Singleton):**
- siteName (string)
- logo (media)
- phone (string)
- email (email)
- address (string)
- heroSlides (relation with HeroSlide, many)

---

## Phase 3 : Configuration Next.js

### 3.1 Installation des dépendances
```bash
npm install axios swr zustand next-image-export-optimizer
npm install -D @types/node @types/react
```

### 3.2 Fichier `.env.local`
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
```

### 3.3 Types TypeScript (`lib/types.ts`)
```typescript
export interface Page {
  id: number;
  slug: string;
  title: string;
  metaDescription: string;
  sections: Section[];
  publishedAt: string;
}

export interface Section {
  id: number;
  type: 'hero' | 'about' | 'services-grid' | 'projects-grid' | 'team-grid' | 'contact';
  title: string;
  subtitle?: string;
  content?: string;
  image?: Media;
  backgroundColor?: string;
  order: number;
  items?: SectionItem[];
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: Media;
  details: string[];
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  images: Media[];
  status: 'en-cours' | 'completed';
  location: string;
}

export interface TeamMember {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  image: Media;
  email: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  backgroundImage: Media;
  ctaText?: string;
  ctaLink?: string;
  order: number;
}

export interface Media {
  id: number;
  name: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Settings {
  siteName: string;
  logo: Media;
  phone: string;
  email: string;
  heroSlides: HeroSlide[];
}
```

### 3.4 API Helper (`lib/api.ts`)
```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
  },
});

export const fetchPage = async (slug: string) => {
  const { data } = await api.get(`/pages?filters[slug][$eq]=${slug}&populate=*`);
  return data.data[0];
};

export const fetchServices = async () => {
  const { data } = await api.get('/services?populate=*');
  return data.data;
};

export const fetchProjects = async () => {
  const { data } = await api.get('/projects?populate=*');
  return data.data;
};

export const fetchTeam = async () => {
  const { data } = await api.get('/team-members?populate=*');
  return data.data;
};

export const fetchSettings = async () => {
  const { data } = await api.get('/settings?populate=*');
  return data.data[0];
};

export const submitContactForm = async (formData: any) => {
  const { data } = await api.post('/contact-messages', { data: formData });
  return data;
};
```

---

## Phase 4 : Composants React

### 4.1 PageBuilder Component
```typescript
// components/PageBuilder.tsx
import { Section } from '@/lib/types';
import HeroSlider from './sections/HeroSlider';
import AboutSection from './sections/AboutSection';
import ServicesGrid from './sections/ServicesGrid';
import ProjectsGrid from './sections/ProjectsGrid';
import TeamGrid from './sections/TeamGrid';
import ContactForm from './sections/ContactForm';

interface Props {
  sections: Section[];
}

export default function PageBuilder({ sections }: Props) {
  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <HeroSlider key={section.id} section={section} />;
          case 'about':
            return <AboutSection key={section.id} section={section} />;
          case 'services-grid':
            return <ServicesGrid key={section.id} section={section} />;
          case 'projects-grid':
            return <ProjectsGrid key={section.id} section={section} />;
          case 'team-grid':
            return <TeamGrid key={section.id} section={section} />;
          case 'contact':
            return <ContactForm key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
```

---

## Phase 5 : Intégration des Données Scrapées

### 5.1 Migration des contenus HTML vers Strapi
Les fichiers HTML/CSS scrapés aideront à :
- Identifier la structure des sections
- Copier les contenus textuels
- Récupérer les images (à re-télécharger dans Strapi)
- Mapper les couleurs et styles CSS

### 5.2 Import des images
```bash
# Script pour importer les images dans Strapi
node scripts/import-images.js
```

---

## Phase 6 : Déploiement

### Frontend (Vercel)
```bash
git push
# Deployer via Vercel Dashboard
```

### Backend (Render ou Railway)
```bash
# Déployer Strapi sur Render
```

---

## 📅 Timeline Estimée

| Phase | Durée | Tâches |
|-------|-------|--------|
| 1 | 2 jours | Setup infrastructure |
| 2 | 3 jours | Configuration Strapi |
| 3 | 2 jours | Config Next.js |
| 4 | 5 jours | Développement composants |
| 5 | 2 jours | Migration données |
| 6 | 2 jours | Tests & déploiement |
| **Total** | **~16 jours** | |

---

## ✅ Checklist de Lancement

- [ ] Strapi configuré et prêt
- [ ] Collections remplies avec données
- [ ] Next.js connecté à l'API Strapi
- [ ] Composants responsifs testés
- [ ] SEO optimisé (meta tags, sitemap)
- [ ] Formulaire de contact fonctionnel
- [ ] Performance optimisée (images, cache)
- [ ] Déploiement en production
- [ ] Documentation pour le client

---

## 🔗 Ressources

- Structure scrapisée : `/screenshots/`
- Architecture Strapi : `ARCHITECTURE_STRAPI.md`
- Tailwind CSS : Pour le styling
- Next.js Image Optimization : Pour les médias

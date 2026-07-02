# Guide de Développement - Artemis Construction Website

## 🎯 Objectifs Clés

### Frontend (Next.js)
1. ✅ Reproduire le design du site scrapisé
2. ✅ Rendre toutes les pages dynamiques
3. ✅ Optimiser les performances (images, temps de chargement)
4. ✅ Responsive design (mobile, tablet, desktop)
5. ✅ SEO optimisé

### Backend (Strapi)
1. ✅ Gérer tout le contenu editorial
2. ✅ Permettre l'upload de médias
3. ✅ Sécuriser l'accès via API tokens
4. ✅ Structures flexibles et réutilisables

---

## 🛠️ Technologies & Conventions

### Frontend Stack
- **Framework** : Next.js 14+ (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **HTTP Client** : Axios ou native `fetch`
- **State Management** : Zustand (si nécessaire)
- **Image Optimization** : Next.js Image component

### Backend Stack
- **CMS** : Strapi v4+
- **Database** : SQLite (dev) / PostgreSQL (prod)
- **File Storage** : Local (dev) / AWS S3 (prod)

### Naming Conventions

#### Fichiers & Dossiers
```
✅ Good:
  components/sections/HeroSlider.tsx
  lib/api.ts
  app/projects/[slug]/page.tsx
  styles/globals.css

❌ Bad:
  components/heroSlider.tsx
  lib/API.ts
  app/project/[projectId]/page.tsx
```

#### Variables & Fonctions
```typescript
✅ Good:
const heroSlides: HeroSlide[] = [];
const fetchProjectBySlug = async (slug: string) => {};
const isProjectFeatured = true;

❌ Bad:
const hs = [];
const getProject = () => {};
const featured = true;
```

---

## 📐 Structure des Composants

### Anatomie d'un Composant

```typescript
// components/sections/HeroSlider.tsx
import { Section, HeroSlide } from '@/lib/types';
import Image from 'next/image';

interface Props {
  section: Section;
}

export default function HeroSlider({ section }: Props) {
  // State & Hooks
  const [current, setCurrent] = useState(0);
  
  // Render logic
  return (
    <section className="hero-slider">
      {/* Contenu */}
    </section>
  );
}
```

### Best Practices

1. **Toujours typer les props** avec TypeScript
2. **Utiliser Next.js Image** pour l'optimization
3. **Composants réutilisables** et modulaires
4. **Props drilling minimal** (utiliser Context si nécessaire)
5. **Comments pour la logique complexe**

---

## 🔌 Intégration API Strapi

### Patterns de Récupération de Données

#### Côté Serveur (préféré)
```typescript
// app/projects/page.tsx
import { fetchProjects } from '@/lib/api';

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  
  return (
    <main>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </main>
  );
}
```

#### Côté Client (formulaires, interactions)
```typescript
// components/ContactForm.tsx
'use client';

import { submitContactForm } from '@/lib/api';

export default function ContactForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitContactForm(formData);
    // Handle result
  };
  
  return <form onSubmit={handleSubmit}>{/* Form */}</form>;
}
```

---

## 🎨 Styling Conventions

### Tailwind CSS Structure

```tsx
// ✅ Bien organisé
<section className="
  py-20 px-6
  bg-gradient-to-b from-blue-50 to-white
  md:py-32 md:px-12
  lg:px-20
">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
      Titre
    </h1>
  </div>
</section>

// ❌ Non-organisé
<section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-white md:py-32 md:px-12 lg:px-20">
```

### Couleurs du Design (à extraire du CSS scrapisé)
```css
/* À intégrer dans tailwind.config.js */
theme: {
  colors: {
    primary: '#1a3a52',    /* Bleu foncé */
    secondary: '#ff6b35',  /* Orange */
    accent: '#ffd700',     /* Or */
    light: '#f5f5f5',
  }
}
```

---

## 🔐 Sécurité & Bonnes Pratiques

### Variables d'Environnement
```env
# .env.local (NE PAS committer)
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=super_secret_token_here

# Variables publiques (Safe)
NEXT_PUBLIC_SITE_NAME=Artemis Construction
NEXT_PUBLIC_GA_ID=UA-12345678-1
```

### Validation des Données
```typescript
// lib/validation.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactForm = z.infer<typeof contactFormSchema>;
```

### Gestion des Erreurs
```typescript
// lib/api.ts
export const fetchProjects = async () => {
  try {
    const { data } = await api.get('/projects?populate=*');
    return data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};
```

---

## 📊 SEO & Métadonnées

### Page Metadata
```typescript
// app/projects/page.tsx
export const metadata = {
  title: 'Nos Projets | Artemis Construction',
  description: 'Découvrez nos réalisations en construction et BTP',
  keywords: 'construction, bâtiment, projets, côte d\'ivoire',
};
```

### Structured Data
```typescript
// lib/seo.ts
export const projectSchema = (project: Project) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.description,
  image: project.images?.[0]?.url,
  datePublished: project.createdAt,
});
```

---

## ⚡ Performance Optimization

### Image Optimization
```typescript
// ✅ Correct
import Image from 'next/image';

<Image
  src={project.image.url}
  alt={project.title}
  width={600}
  height={400}
  priority={false}
  loading="lazy"
/>

// ❌ Incorrect (utilise <img> HTML)
<img src={project.image.url} alt={project.title} />
```

### Code Splitting
```typescript
// ✅ Lazy load des composants lourds
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Chargement...</div>,
});
```

### Caching
```typescript
// app/projects/page.tsx
export const revalidate = 3600; // ISR - revalidate every hour
```

---

## 📝 Testing

### Unit Tests
```typescript
// components/__tests__/ServiceCard.test.tsx
import { render, screen } from '@testing-library/react';
import ServiceCard from '@/components/ServiceCard';

describe('ServiceCard', () => {
  it('renders service title', () => {
    const service = { id: 1, title: 'Bâtiment', description: '...' };
    render(<ServiceCard service={service} />);
    expect(screen.getByText('Bâtiment')).toBeInTheDocument();
  });
});
```

---

## 🚀 Déploiement

### Frontend (Vercel)
```bash
# .vercel/project.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

### Backend (Render / Railway)
```bash
# Configuration DATABASE_URL
postgresql://user:password@host:port/dbname
```

---

## 📚 Ressources Importantes

| Ressource | URL |
|-----------|-----|
| Strapi Docs | https://docs.strapi.io |
| Next.js Docs | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com |
| HTML/CSS Scrapisés | `./screenshots/` |
| Architecture Strapi | `./ARCHITECTURE_STRAPI.md` |
| Plan Exécution | `./PLAN_EXECUTION.md` |

---

## 🎓 Points Importants à Retenir

1. **Séparation Frontend/Backend** : Le frontend ne connaît que l'API Strapi
2. **Contenu Dynamique** : Tout ce qui change doit être dans Strapi
3. **Performance** : Images optimisées, lazy loading, caching
4. **SEO** : Métadonnées, structured data, open graph
5. **Accessibilité** : alt tags, semantic HTML, keyboard navigation
6. **Maintenabilité** : Code propre, commentaires, documentation

---

## 🤝 Prochaines Étapes

1. ✅ Créer le dépôt Git
2. ⬜ Initialiser Next.js et Strapi
3. ⬜ Configurer les collections Strapi
4. ⬜ Développer les composants React
5. ⬜ Intégrer les données scrapées
6. ⬜ Tests et optimisations
7. ⬜ Déploiement

**Prêt à commencer le développement ? 🚀**

# Architecture Strapi - Site Artemis Construction

## 📊 Vue d'ensemble

Le site présente une structure organisée autour de **pages principales** et de **composants réutilisables**. Chaque page est constitée de sections qui seront gérées dynamiquement via Strapi.

---

## 🏗️ Structure des Collections Strapi

### 1. **Pages** (Collection Singleton ou Multi-pages)
Chaque page principale du site

```
Page
├── slug (Text, unique, required)
├── title (Text, required)
├── metaDescription (Text, long)
├── metaKeywords (Text, long)
├── sections (Relation, many-to-many) → Section
└── publishedAt (Date)
```

**Pages à créer :**
- Accueil (home)
- À Propos (about)
- Services (services)
- Projets (projects)
- Équipe (team)
- Contact (contact)

---

### 2. **Sections** (Collection - Contenu flexible par page)
Chaque section est un bloc de contenu réutilisable

```
Section
├── id (unique)
├── type (Enum) [hero, about, services-grid, projects-grid, team-grid, testimonials, cta, contact-form]
├── title (Text)
├── subtitle (Text)
├── content (RichText)
├── image (Media, single)
├── backgroundImage (Media, single)
├── backgroundColor (Text - hex color)
├── order (Integer - pour trier les sections)
├── items (Relation) → SectionItem (many)
└── publishedAt (Date)
```

---

### 3. **Services** (Collection)
Gestion des services proposés

```
Service
├── id (unique)
├── title (Text, required) → "BÂTIMENT", "ROUTES", etc.
├── slug (Text, unique)
├── description (RichText, required)
├── shortDescription (Text)
├── image (Media, single)
├── backgroundImage (Media, single)
├── icon (Media, single)
├── details (Text[]) → ["Constructions neuves", "Réhabilitation"]
└── publishedAt (Date)
```

---

### 4. **Projets** (Collection)
Gestion des projets de construction

```
Project
├── id (unique)
├── title (Text, required) → "SYMPHONIA", "REDSTONE", etc.
├── slug (Text, unique)
├── description (RichText)
├── shortDescription (Text)
├── status (Enum) [en-cours, completed]
├── startDate (Date)
├── endDate (Date)
├── location (Text)
├── category (Text) → Type de projet
├── images (Media, multiple) → Galerie photos
├── thumbnail (Media, single)
├── details (Relation) → ProjectDetail (many)
└── publishedAt (Date)
```

---

### 5. **Équipe** (Collection)
Gestion des membres de l'équipe

```
TeamMember
├── id (unique)
├── firstName (Text, required)
├── lastName (Text, required)
├── position (Text, required) → "Directeur Général", "Manager", etc.
├── bio (RichText)
├── image (Media, single)
├── email (Email)
├── phone (Text)
├── socialLinks (JSON) → {linkedin, twitter, facebook}
└── publishedAt (Date)
```

---

### 6. **Paramètres Globaux** (Singleton)
Configuration générale du site

```
Settings (Singleton)
├── siteName (Text) → "ARTEMIS"
├── siteDescription (Text)
├── logo (Media, single)
├── favicon (Media, single)
├── heroSlides (Relation) → HeroSlide (many)
├── phone (Text)
├── email (Email)
├── address (Text)
├── socialLinks (JSON) → {linkedin, facebook, youtube}
├── companyInfo (RichText) → Texte "À Propos" principal
└── cta (Relation) → CTA section
```

---

### 7. **Slides** (Collection)
Carrousel/Slider principal

```
HeroSlide
├── id (unique)
├── title (Text, required)
├── description (RichText)
├── backgroundImage (Media, single, required)
├── ctaText (Text)
├── ctaLink (Text)
├── order (Integer)
└── publishedAt (Date)
```

---

### 8. **CTA (Appels à l'action)** (Collection)
Boutons et appels à l'action dynamiques

```
CTA
├── id (unique)
├── label (Text, required) → "En savoir plus", "Voir la vidéo", etc.
├── link (Text)
├── type (Enum) [button, link, popup-video]
├── icon (Text) → Classe d'icône ou SVG
├── color (Enum) [primary, secondary]
└── publishedAt (Date)
```

---

### 9. **Contact** (Collection)
Gestion des messages de contact

```
ContactMessage
├── id (unique)
├── firstName (Text, required)
├── lastName (Text, required)
├── email (Email, required)
├── phone (Text)
├── message (Text, required, long)
├── subject (Text)
├── isRead (Boolean)
├── createdAt (DateTime, auto)
└── updatedAt (DateTime, auto)
```

---

## 🔗 Relations entre Collections

```
Page
  ├── has many → Section
  │   └── has many → SectionItem
  │       └── can reference → Service, Project, TeamMember
  │
  └── has many → HeroSlide (pour la page d'accueil)

Settings (Global)
  ├── has many → HeroSlide
  └── has many → CTA
```

---

## 📱 Types de Sections Dynamiques

### Hero Section
```
{
  type: "hero",
  title: "Bâtir l'avenir en toute quiétude!",
  subtitle: "Slide 1",
  backgroundImage: media,
  content: "Fournir un service...",
  cta: relation(CTA)
}
```

### About Section
```
{
  type: "about",
  title: "À PROPOS",
  subtitle: "BATIR L'AVENIR...",
  content: RichText,
  image: media,
  cta: relation(CTA)
}
```

### Services Grid
```
{
  type: "services-grid",
  title: "SERVICES",
  items: relation(Service) many
}
```

### Projects Grid
```
{
  type: "projects-grid",
  title: "NOS PROJETS",
  items: relation(Project) many,
  featuredOnly: Boolean
}
```

### Team Grid
```
{
  type: "team-grid",
  title: "NOTRE ÉQUIPE",
  items: relation(TeamMember) many
}
```

### Contact Form
```
{
  type: "contact-form",
  title: "NOUS CONTACTER",
  description: Text,
  formEndpoint: Text (pour Strapi)
}
```

---

## 🎨 Permissions & Rôles

### Admin
- Accès complet à toutes les collections
- Gestion des utilisateurs

### Editor
- Gestion des contenus (Services, Projets, Équipe, Pages)
- Pas d'accès aux Settings globaux

### Viewer
- Lecture seule

---

## 🚀 Cas d'Usage - Exemples de Modélisation

### Exemple 1 : Page Accueil

```json
{
  "slug": "home",
  "title": "ARTEMIS - Construction & Travaux",
  "sections": [
    {
      "type": "hero",
      "title": "Bâtir l'avenir",
      "order": 1,
      "items": [HeroSlide1, HeroSlide2, HeroSlide3]
    },
    {
      "type": "about",
      "title": "À Propos",
      "order": 2,
      "image": AboutImage,
      "content": "...",
      "cta": ButtonLink
    },
    {
      "type": "services-grid",
      "title": "Nos Services",
      "order": 3,
      "items": [Service1, Service2, Service3, ...]
    }
  ]
}
```

---

## 📋 Next Steps

1. ✅ Créer les collections Strapi
2. ✅ Configurer les relations
3. ✅ Mettre en place les permissions
4. ✅ Remplir les données initiales
5. ⬜ Créer les composants Next.js
6. ⬜ Connecter Next.js à l'API Strapi
7. ⬜ Tester et déployer

---

## 📚 Ressources

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi API](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/introduction.html)
- [Next.js & Strapi Integration](https://strapi.io/resource-center)

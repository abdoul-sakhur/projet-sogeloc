# ARTEMIS Construction & Travaux — Extraction de contenu du site actuel

Source : pages HTML scrapées dans `C:\Users\DELL\Desktop\sogeloc\screenshots\`.
Thème sous-jacent : template HTML "Promina" (voir commentaire en tête de `style_css.css`).
Note : `home.html` et `index_html.html` sont strictement identiques (page d'accueil dupliquée). Tous les fichiers CSS (`css.css`, `style_css.css`, `libraries_css.css`) sont identiques d'une page à l'autre — un seul jeu de styles partagé.

---

## 1. Palette de couleurs

Pas de variables CSS (`:root { --var }`) dans le thème — toutes les couleurs sont codées en dur en hexadécimal. Fréquence d'occurrence dans `style_css.css` entre parenthèses.

| Couleur | Hex | Usage probable |
|---|---|---|
| **Orange primaire (marque)** | `#ff6e00` (125 occurrences) | Couleur d'accent principale : liens (`a`), boutons primaires (`.btn__primary`), sous-titres de section (`.heading__subtitle`), soulignements, `::selection`, overlays d'images services (`.bg-overlay-theme` en `rgba(254, 90, 14, 0.85)`), classe utilitaire `.bg-theme` |
| **Blanc** | `#ffffff` / `#fff` (115 + 15) | Fond de page (`body`), texte sur fonds sombres/orange, boutons |
| **Noir/anthracite très foncé** | `#1b1a1a` (53) | Couleur des titres (h1–h6), fonds sombres (`.bg-color-dark`), dégradés d'overlay sur bannières |
| **Gris moyen** | `#9b9b9b` (24) | Couleur de texte courant du `body` (paragraphes) |
| **Gris foncé (bouton secondaire)** | `#434343` (22) | `.btn__secondary` (fond), variante `.btn__link.btn__secondary` |
| **Gris clair** | `#eaeaea` (12) | Bordures, séparateurs |
| **Gris texte alternatif** | `#333333` (9) | Texte secondaire |
| **Blanc cassé (fond section)** | `#f9f9f9` (8) | Fond de sections claires, `.heading-light .heading__subtitle` |
| **Fond section services** | `#f4f4f4` (6) | Fonds de blocs |
| **Orange hover foncé** | `#732500` | Couleur des liens au survol (`a:hover`) |
| **Orange secondaire (bg-theme2)** | `#f5570e` | Variante d'accent (`.bg-theme2`) |
| **Icônes réseaux sociaux (couleurs de marque, non thème)** | `#4267b2` (Facebook), `#1da0f0` (Twitter), `#ea4335` (Google/Gmail) | Probablement classes fontawesome de couleur pour icônes sociales, peu utilisées en pratique (icônes du footer sont stylées en blanc/orange, pas en couleurs de marque) |

**Résumé pour le développeur** : palette "construction" classique — fond blanc, texte gris (#9b9b9b), titres presque noirs (#1b1a1a), un unique orange vif (#ff6e00) comme couleur de marque/CTA, et un gris anthracite (#434343) comme couleur secondaire pour les boutons secondaires et le footer.

---

## 2. Typographie

- **Police des titres (h1–h6)** : `Barlow`, sans-serif — graisses chargées via `@font-face` : 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold). Les titres utilisent `font-weight: 700`.
- **Police du corps de texte** : `Roboto`, sans-serif — graisses 400, 500, 700. Utilisée sur `body` (`font-size: 15px`, `color: #9b9b9b`).
- Chargement via Google Fonts : `https://fonts.googleapis.com/css?family=Barlow:400,500,600,700|Roboto:400,500,700&display=swap`

### Échelle des titres (par défaut, hors classes utilitaires)
| Élément | Taille | Poids | Couleur |
|---|---|---|---|
| h1 | 52px | 700 | #1b1a1a |
| h2 | 42px | 700 | #1b1a1a |
| h3 | 38px | 700 | #1b1a1a |
| h4 | 32px | 700 | #1b1a1a |
| h5 | 24px | 700 | #1b1a1a |
| h6 | 18px | 700 | #1b1a1a |
| p (défaut) | 14px, line-height 24px | 400 | hérite #9b9b9b |

### Classes de titres utilitaires récurrentes (utilisées dans presque toutes les sections)
- `.heading__subtitle` — 15px, bold (700), couleur `#ff6e00` (le petit label orange au-dessus des titres, ex. "A propos", "Services", "Projets")
- `.heading__title` — 34px (40px en variante `.heading-layout2`), couleur `#1b1a1a` ou blanc en `.heading-light`
- `.heading__desc` — 16px, line-height 27px, justifié
- `.pagetitle__subheading` (bannières de page intérieure) — 15px bold, couleur `#f9f9f9`
- `.pagetitle__heading` — grand titre H1 des bannières de pages intérieures
- `.text__block-title` — 25px (ex. "A savoir" sur les pages projet)

Responsive : `.heading__title` descend à 30px (≤992px) puis 23px (mobile 320–767px).

---

## 3. Contenu textuel réel par page

### 3.1 Page d'accueil (`home.html` / `index_html.html`)

**Slider Hero (3 slides, carrousel automatique, 10s)**
1. Titre : *"Simplifier la complexité"* — Texte : *"La réalisation des travaux est assurée par des techniciens de grandes expériences dans le domaine selectionnés avec soin dans le but de fournir un travail répondant aux attentes."*
2. Titre : *"Bâtir l'avenir en toute quiétude!"* — Texte : *"Fournir un service moderne et fiable par des solutions originales et efficaces en misant sur un esprit d'excellence et sur la responsabilisation de ses ressources."*
3. Titre : *"Livrer ce qui est planifié"* — Texte : *"Grâce à une stratégie qui a fait ses preuves et un esprit d'excellence, ACT SARL est en mesure de rendre l'impossible ... possible."*

**Section "À propos" (accueil)**
- Sous-titre : "A propos"
- Titre : *"BATIR L'AVENIR EN TOUTE QUIETUDE…"*
- Paragraphe 1 : *"Opérationnelle depuis six (06) ans, **CONSTRUCTION & TRAVAUX**, filiale du groupe **KAYDAN**, offre une gamme diverse de services en Bâtiments et Travaux Publics."*
- Paragraphe 2 : *"Dans le domaine de la construction en Côte d'ivoire, notre entreprise fait partie des plus importantes sociétés grâce d'une part à la qualité de ses services et ses réalisations et d'autre part à ses partenariats stratégiques aussi bien au plan local qu'à l'international."*
- CTA : *"Tout savoir"* → lien `apropos.html`
- Bandeau vidéo sur l'image : *"ACT SARL, fournir une satisfaction totale à notre clientèle"* — bouton *"En vidéo"* (lien YouTube popup)

**Section Services (carrousel de 9 services)** — sous-titre "Services", titre *"Fournir des services modernes et fiables…"*. Contenu détaillé section 3 ci-dessous (identique à la page Services).

**Section Projets (carrousel, extraits des 4 projets)** — sous-titre "Projets", titre *"Notre travail est la résultante d'une cohesion et d'une expertise efficace."* Cartes : Symphonia, Redstone, Callisto-etoile, Symphonium (détails section 3.5).

**Section "Artemis en chiffre" (bannière stats, fond image parallax)**
- Sous-titre : *"Artemis en chiffre."*
- Titre : *"Construire les personnes et les projets qui améliorent l'infrastructure Africaine."*
- Compteurs : "3" Projets de bâtiment réalisés / "1" Projets de voiries et réseaux divers / "0" Projet de routes / "1" Années d'expérience dans le domaine de la construction

**Section Contact / Carte (accueil)**
- Titre : "NOUS CONTACTER"
- Bloc : "ACT SARL" — Adresse : *"08 Bp 2553 ABJ 08, Abidjan, Cocody - Riviéra Jardin"* — E-mail : `infos@artemisconstruction-ci.com` — Horaires : *"Lun - Ven: 08h00 – 18h30"*
- Carte Leaflet/OpenStreetMap centrée sur Abidjan, Cocody-Riviéra Jardin (coord. 5.3489182, -3.9798831)

**Footer** (identique sur toutes les pages, voir section 6)

---

### 3.2 Page "À propos" (`apropos_html.html`)

**Bannière de page (page-title)**
- Sous-titre : *"A propos de ARTEMIS"*
- H1 : *"Construire les personnes et les projets qui améliorent l'infrastructure africaine."*

**Section À propos / présentation dirigeant**
- Titre : *"BATIR L'AVENIR EN TOUTE QUIETUDE…"*
- *"Opérationnelle depuis six (06) ans, ARTEMIS CONSTRUCTION & TRAVAUX, filiale du groupe KAYDAN, offre une gamme diverse de services en Bâtiments et Travaux Publics."*
- *"Dans le domaine de la construction en Côte d'ivoire, notre entreprise fait partie des plus importantes sociétés grâce d'une part à la qualité de ses services et ses réalisations et d'autre part à ses partenariats stratégiques aussi bien au plan local qu'à l'international."*
- **Notre mission** : *"est de fournir à nos clients des services modernes et fiables en leur proposant des solutions originales et efficaces, en misant sur un esprit d'Excellence et sur la responsabilisation de nos ressources."*
- **Notre engagement** : *"Simplifier la complexité et livrer ce qui est planifié"*
- Encart photo : *"Tiemoko DIOMANDÉ — Directeur Général"*

**Section vidéo institutionnelle (bannière split)**
- Sous-titre : "Vidéo institutionnelle"
- Titre : *"ARTEMIS CONSTRUCTION & TRAVAUX"*
- Texte : *"Nous attaquons et résolvons les problèmes difficiles en utilisant la pensée créative et le travail d'équipe. Nous nous efforçons constamment de trouver de nouveaux moyens et méthodes pour effectuer des tâches de manière plus efficace, rentable et sûre. Nous développons continuellement notre base de connaissances et partageons ces connaissances au sein de l'organisation."*
- Bouton lecture vidéo + texte : *"Regarder notre vidéo"* (lien YouTube popup)

**Section compteurs**
- "1" Projets de bâtiment réalisés / "0" Projets de voiries et réseaux divers / "0" Projet de routes / "1" Années d'expérience dans le domaine de la construction
(NB : chiffres différents de ceux affichés sur l'accueil — probablement incohérence à corriger côté contenu Strapi)

---

### 3.3 Page "Nos services" (`services_html.html`)

**Bannière de page**
- Sous-titre : *"Nos services"*
- H1 : *"Fournir une qualité de service moderne et fiable."*

**Bloc "SERVICES" (6 cartes)**
1. **BATIMENT** — *"ARTEMIS assure la mise en oeuvre et la réalisation de batiment pour des entreprises et des particuliers, tout en respectant les normes requises afin de satisfaire sa clientèle. - Constructions neuves - Réhabilitation de Bâtiments"*
2. **ROUTES** — *"ARTEMIS contribue chaque année à améliorer la qualité du réseau et des infrastructures routières. De la voirie communale à l'autoroute, en passant par les pistes villageoises dans le domaine public ou privé. - Routes Bitumées - Routes en terre (Ouverture de voies, Reprofilage, traitements de points critiques…)"*
3. **VOIRIES ET RESEAUX DIVERS** — *"C'est le rassemblement des différents raccordements et branchements réalisés sur un terrain pour qu'il soit viabilisé. Cela désigne aussi la mise en place des diverses voies permettant à un territoire d'être desservi par les différents réseaux routiers, d'assainissement, d'eau, d'électricité, de télécommunication."*
4. **GENIE CIVIL** — *"ARTEMIS génie civil réalise des chantiers complexes sur l'étendue du territoire : ouvrages d'art, industriels et commerciaux, travaux souterrains, assainissement, réhabilitation de bâtiments."*
5. **CONSTRUCTION** — *"Maîtres d'ouvrage, constructeurs, investisseurs, propriétaires ou gestionnaires de parcs immobiliers, ARTEMIS vous accompagne à chaque étape de vos projets de construction puis tout au long du cycle de vie de vos bâtiments.."*
6. **INFRASTRUCTURES DE TRANSPORTS** — *"La construction et l'entretien des infrastructures routières constituent un domaine de prédilection de notre entreprise. Ainsi, nous réalisons des routes et assurons l'entretien quelque soit la nature..."*

**Bloc "NATURE D'INTERVENTION" (3 cartes, séparées par une ligne horizontale)**
1. **ETUDES** — *"ARTEMIS CONSTRUCTION & TRAVAUX réalise diverses études en Génie civil notamment des études technico-économiques de faisabilité de projet de Génie civil, les études techniques d'exécution, établissement des DAO, …"*
2. **REALISATION DES TRAVAUX** — *"ARTEMIS CONSTRUCTION & TRAVAUX assure la réalisation des travaux de bâtiment, travaux publics et Voirie et réseaux divers. Nous disposons d'une ressource humaine jeune et dynamique dévoué à l'accomplissement de ces travaux."*
3. **ENCADREMENT – OPC** — *"ARTEMIS CONSTRUCTION & TRAVAUX assiste ses clients dans la mise en œuvre de leurs projets. ARTEMIS CONSTRUCTION & TRAVAUX assure également l'Ordonnancement, le Pilotage et la Coordination dans le cadre de la gestion de projets."*

(Ces 9 services au total sont aussi ceux affichés dans le carrousel de la page d'accueil — contenu strictement identique.)

---

### 3.4 Page "Nos projets" (liste — `projets_html.html`)

**Bannière de page**
- Sous-titre : *"Nos projets"*
- H1 : *"Notre travail est la résultante d'une cohesion et d'une expertise efficace."*

**Filtre** : un seul filtre actif "Tous les travaux" (le système de filtrage par catégorie — data-filter — existe dans le CSS/markup mais aucun bouton de catégorie supplémentaire n'est rendu ; les classes `filter-construction`, `filter-route`, `filter-renovations` sont posées sur les items).

**Grille de 4 projets** (titre + catégorie affichée) :
1. **Symphonium** — catégorie : Construction
2. **Redstone** — catégories : Construction, Immobilier
3. **Symphonia** — catégorie : Construction
4. **Callisto-etoile** — catégorie : Construction

---

### 3.5 Pages projets individuelles (détail)

Toutes partagent la même bannière de page que "Nos projets" (sous-titre "Nos projets", H1 *"Notre travail est la résultante d'une cohesion et d'une expertise efficace."*), une galerie photo, puis un bloc **"A savoir"**.

**Symphonia** (`projet_symphonia_html.html`)
- Catégories : Construction, Immobilier
- A savoir : *"Travaux de construction de 84 Villas Duplex sur 300 et 600 m2 et 14 immeubles R+1 et 1,5km de voirie pour le compte de KAYDAN REAL ESTATE"*
- Client : KAYDAN REAL ESTATE
- Localisation : Cocody Faya
- Services : Réalisation des travaux
- Galerie : 10 images (`symphonia/1.jpg` … `10.jpg`)

**Redstone** (`projet_redstone_html.html`)
- Catégories : Construction, Immobilier
- A savoir : *"Travaux de construction d'un immeuble R+3 à usage d'habitation à Cocody Riviera – GENIE 2000"*
- Client : Particulier
- Localisation : Cocody Riviera
- Services : Etude et réalisation des travaux
- Galerie : 5 images (`redstone/1.jpg` … `5.jpg`)

**Callisto Etoile** (`projet_callisto_etoile_html.html`)
- Catégories : Construction, Immobilier
- A savoir : *"Travaux de construction de 74 Villas Duplex"*
- Client : KAYDAN REAL ESTATE
- Localisation : Cocody Faya
- Services : Réalisation des travaux
- Galerie : 18 images (`callisto-etoile/1.jpg` … `18.jpg`)

**Symphonium** (`projet_symphonium_html.html`)
- Catégorie : Construction
- A savoir : *"Travaux de construction 5 immeubles R+2 dont 16 Magasins et 20 Appartements de 3 pièces."*
- Client : KAYDAN REAL ESTATE
- Services : Réalisation des travaux
- (pas de champ "Localisation" renseigné pour ce projet)
- Galerie : 17 images (numérotation non séquentielle : 1–7, 9–17, dossier `symphonium/`)

---

### 3.6 Page "Notre équipe" (`equipe_html.html`)

**Bannière de page**
- Sous-titre : *"Notre équipe"*
- H1 : *"Des Experts Travaillant En Étroite Collaboration."*

**Membres de l'équipe (4)**
| Nom | Poste | Image |
|---|---|---|
| Tiémoko DIOMANDE | Directeur Général | `assets/images/team/tiemoko.jpg` |
| Eric OBODJI | Directeur des Opérations | `assets/images/team/obodji.jpg` |
| Abdel Aziz BAMBA | Directeur Technique | `assets/images/team/bamba.jpg` |
| Aboubacar DIALLO | Responsable Bureau Etudes | `assets/images/team/aboubacar.jpg` |

---

### 3.7 Page "Contact" (`contacts_html.html`)

Pas de bannière page-title classique sur cette page — elle commence directement par la carte.

**Bloc informations (colonne gauche du panneau contact)**
- **Adresse** : *"08 Bp 2553 Abj 08, Abidjan, Cocody - Riviéra Jardin"*
- **E-mail** : `infos@artemisconstruction-ci.com`
- **Horaires d'ouverture** : *"08:00 - 18:30, Fermé, Samedi et Dimanche"*
- Téléphone : `(225) 27 22 46 90 37` (lien `tel:002252722469037`)

**Formulaire de contact** (colonne droite)
- Titre : *"Nous Contactez"*
- Texte : *"Le contrôle complet des produits nous permet de garantir à nos clients les meilleurs prix et services de qualité. Faites nous confiance."*
- Champs : Nom complet (text, requis), E-mail (email, requis), Téléphone (text, requis), Message (textarea, requis)
- Bouton : *"Envoyer"*
- Action du formulaire : `assets/php/contact.php` (méthode POST — backend PHP à remplacer par une route Strapi/API)

---

## 4. Structure des sections par page (ordre d'apparition)

| Page | Sections dans l'ordre | Classes CSS principales |
|---|---|---|
| **Accueil** | Header/Nav → Hero slider (3 slides) → À propos (texte + image + CTA vidéo) → Services (carrousel 9 items) → Projets (carrousel 4 items) → Stats "Artemis en chiffre" (fond parallax) → Contact + Carte → Footer | `.header.header-transparent`, `.slider.slider-layout1`, `.about-layout1.bg-img`, `.features-layout2.bg_service`, `.portfolio-carousel.artmis_projet.bg_projet`, `.banner-layout3.bg-overlay.bg-parallax`, `.google-map-layout2.bg_map`, `.footer` |
| **À propos** | Header/Nav → Page-title (bannière) → À propos (texte + portrait DG) → Bannière vidéo institutionnelle (split 2 col.) → Compteurs → Footer | `.page-title.page-title-layout1`, `.about-layout1`, `.banner-layout4`, `.counters.artemis_bg_counter`, `.footer` |
| **Services** | Header/Nav → Page-title → Bloc "SERVICES" (6 cartes) → séparateur `<hr>` → Bloc "NATURE D'INTERVENTION" (3 cartes) → Footer | `.services-layout1.bg_service`, `.service-item`, `.footer` |
| **Projets (liste)** | Header/Nav → Page-title → Filtre catégories → Grille 4 projets → Footer | `.page-title-layout1`, `.portfolio-grid`, `.portfolio-filter`, `.portfolio-item`, `.footer` |
| **Projet individuel** (x4) | Header/Nav → Page-title (réutilise bannière "Nos projets") → Titre projet + catégories → Galerie photo (grille) → Bloc "A savoir" (description + méta Client/Localisation/Services) → Footer | `.portfolio-single`, `.portfolio-gallery`, `.text__block.text__block-layout2`, `.portfolio__meta-list`, `.footer` |
| **Équipe** | Header/Nav → Page-title → Grille membres (4 cartes) → Footer | `.page-title-layout1`, `.team-layout2.artemis_team_ACT`, `.member`, `.footer` |
| **Contact** | Header/Nav (variante `header-light`, pas transparente) → Carte plein écran → Panneau Contact (infos + formulaire) → Footer | `.header.header-light`, `.google-map.p-0`, `.contact-layout1`, `.contact-panel`, `.contact__panel-info`, `.contact__panel-form`, `.footer` |

Le **header** est transparent (`header-transparent`) sur toutes les pages sauf Contact, qui utilise `header-light` (fond clair, probablement car pas d'image de fond derrière). Le **footer** est identique sur les 9 pages.

---

## 5. Images référencées (chemins vus dans le HTML/CSS)

Remarque : seuls les CSS et le HTML ont été scrapés — les fichiers images eux-mêmes ne sont pas présents dans ce dossier (à l'exception des captures d'écran PNG pleine page, une par page, utiles comme référence visuelle mais non listées ici individuellement). Ci-dessous les chemins déclarés dans le code.

- **Logo** : `assets/images/logo/logo-ARTEMIS.png` (utilisé dans le header et le footer sur toutes les pages ; variante `logo-dark`/`logo-light` présente uniquement sur `contacts.html`)
- **Favicon** : `assets/images/favicon/favicon.png`
- **Slider hero (accueil)** : `assets/images/sliders/1.jpg`, `2.jpg`, `3.jpg` (chantiers/bâtiments)
- **Fond section À propos** : `assets/images/backgrounds/2.png`
- **Portrait dirigeant** : `assets/images/about/dg.png` (Tiémoko Diomandé, utilisé accueil + à propos)
- **Bannière vidéo (à propos)** : `assets/images/banners/2.jpg`
- **Bannière stats (accueil, "Artemis en chiffre")** : `assets/images/banners/4.jpg`
- **Fond section services** : `assets/images/backgrounds/imm.png` (`.bg_service`)
- **Fond section carrousel projets** : `assets/images/backgrounds/bg_projet.jpg` (`.bg_projet`)
- **Fond carte (section accueil)** : `assets/images/backgrounds/map.png` (`.bg_map`)
- **Images des 9 services** (photo + variante "BG" pour l'overlay au survol), dossier `assets/images/services/` :
  - `services_construction.jpg` / `services_construction_BG.jpg` — Bâtiment
  - `services_revet.jpg` / `services_revet_BG.jpg` — Routes
  - `services_Vrd.jpg` (utilisée aussi comme BG) — VRD
  - `services_genie2.jpg` / `service_bg_genie2.jpg` — Génie civil
  - `services_construction2.jpg` / `services_construction_BG2.jpg` — Construction
  - `services_Ins_trans.jpg` / `services_Ins_trans_BG.jpg` — Infrastructures de transports
  - `services_genie.jpg` / `services_genie_BG.jpg` — Études
  - `services_realisation.jpg` / `service_realisation_bg.jpg` — Réalisation des travaux
  - `services_opc.jpg` / `service_opc_bg.jpg` — Encadrement/OPC
- **Bannières intérieures (page-title) par page** : `assets/images/page-titles/1.jpg` (À propos), `2.jpg` (Services), `3.jpg` (Projets + pages projet), `4.jpg` (Équipe)
- **Photos projets (couvertures utilisées en listing/carrousel)** :
  - `assets/images/portfolio/symphonia/cover_symphonia.jpg`
  - `assets/images/portfolio/wide/2.jpg` (couverture Redstone)
  - `assets/images/portfolio/callisto-etoile/cover_callisto.jpg`
  - `assets/images/portfolio/symphonium/cover_symphonium.jpg`
- **Galeries projets** (photos chantier numérotées) :
  - `assets/images/portfolio/symphonia/1.jpg` à `10.jpg` (10 images)
  - `assets/images/portfolio/redstone/1.jpg` à `5.jpg` (5 images)
  - `assets/images/portfolio/callisto-etoile/1.jpg` à `18.jpg` (18 images)
  - `assets/images/portfolio/symphonium/` : 1–7, 9–17 (17 images, numérotation non séquentielle)
- **Photos équipe**, dossier `assets/images/team/` : `tiemoko.jpg`, `obodji.jpg`, `bamba.jpg`, `aboubacar.jpg`
- **Marqueurs carte Leaflet** : `marker-icon.png`, `marker-shadow.png` (chargés depuis `https://artemisconstruction-ci.com/assets/js/images/` — donc le domaine de production réel du site est `artemisconstruction-ci.com`)

---

## 6. Informations de contact / entreprise

- **Nom commercial** : ARTEMIS (aussi désignée "ARTEMIS CONSTRUCTION & TRAVAUX" / historiquement "ACT SARL")
- **Filiale de** : GROUPE KAYDAN (mention footer : *"Filiale du GROUPE KAYDAN"*)
- **Téléphone** : (225) 27 22 46 90 37 — affiché dans le header sur toutes les pages ; lien `tel:` incohérent selon les pages (`tel:+22521329690` dans le header partagé vs `tel:002252722469037` sur la page contact — à corriger/uniformiser)
- **E-mail** : `infos@artemisconstruction-ci.com`
- **Adresse** : 08 BP 2553 ABJ 08, Abidjan, Cocody - Riviéra Jardin, Côte d'Ivoire
- **Coordonnées GPS** (carte) : lat 5.3489182, lng -3.9798831
- **Horaires** : Lun–Ven 08h00–18h30 ; Fermé Samedi et Dimanche
- **Domaine de production** : artemisconstruction-ci.com (déduit des URLs d'assets Leaflet en dur dans le HTML)
- **Réseaux sociaux** : icônes Facebook, Instagram, Twitter dans le footer — mais tous les liens pointent vers `#` (aucune URL réelle définie sur le site scrapé)
- **Copyright / mentions footer** : *"© 2021 ARTEMIS. Réalisation DATARIUM"* (DATARIUM = agence/prestataire ayant réalisé le site, lien `#` non fonctionnel)

---

## 7. Composants UI récurrents

### Navigation principale (identique sur toutes les pages)
1. Accueil → `index.html`
2. Artemis → `apropos.html`
3. Nos Services → `services.html`
4. Nos Projets → `projets.html`
5. Notre Equipe → `equipe.html`
6. Nous Contacter → `contacts.html` (libellé "Nous Contacts" par erreur de frappe sur la page contact elle-même)

Chaque lien porte la classe `dropdown-toggle` et `with-dropdown` mais aucun sous-menu déroulant n'est réellement présent dans le HTML (probablement vestige du thème, pas utilisé). Le lien de la page courante reçoit la classe `active`. Le numéro de téléphone est affiché à droite du menu avec une icône téléphone (`icon-phone`) sur toutes les pages sauf le formulaire contact où il réapparaît aussi dans le panneau info.

### Boutons CTA (texte exact)
- *"Tout savoir"* — bouton secondaire (fond gris `#434343`), lien vers À propos, icône flèche
- *"En vidéo"* / *"Regarder notre vidéo"* — déclenche une popup vidéo YouTube (lien : `https://www.youtube.com/watch?v=aFyvYIJjvUQ`)
- *"Envoyer"* — bouton primaire (fond orange `#ff6e00`), soumission du formulaire de contact, icône flèche
- Flèche seule (icône `icon-arrow-right`) — bouton "en savoir plus" (`.btn__loadMore`) sur chaque carte projet, mène vers la page détail du projet
- *"Itinéraire"* — lien Google Maps dans la popup du marqueur de carte

### Formulaire de contact (`contacts_html.html`)
Champs, dans l'ordre :
1. Nom complet — `input[type=text]`, requis, placeholder "Nom complet"
2. E-mail — `input[type=email]`, requis, placeholder "E-mail"
3. Téléphone — `input[type=text]`, requis, placeholder "téléphone"
4. Message — `textarea`, requis, placeholder "Message!"
5. Bouton submit : "Envoyer"

Action actuelle : POST vers `assets/php/contact.php` (à remplacer par un endpoint Strapi / API route Next.js).

### Cartes/éléments répétés
- **Carte service** (`.service-item`) : image + titre (H4, majuscules) + description + overlay orange au survol avec image de fond dédiée
- **Carte projet** (`.portfolio-item`) : image de couverture + catégorie(s) + titre + description courte + bouton flèche vers le détail
- **Carte membre équipe** (`.member`) : photo + nom (H5) + poste
- **Bloc compteur** (`.counter-item`) : chiffre (H4) + libellé descriptif — présent sur Accueil et À propos avec des valeurs différentes (incohérence à corriger dans le futur CMS)
- **Bloc "A savoir"** (page projet) : description + liste méta Client / Localisation (optionnelle) / Services

### Carte interactive
Leaflet.js + tuiles OpenStreetMap, centrée sur le siège social (Cocody-Riviéra Jardin), marqueur avec popup affichant nom de l'entreprise, adresse courte et lien "Itinéraire" vers Google Maps. Présente sur Accueil (intégrée à la section contact) et sur la page Contact (pleine largeur, 500px de haut).

---

## Points d'attention pour la reconstruction Next.js + Strapi

- Les chiffres des compteurs ("Artemis en chiffre") diffèrent entre la page Accueil et la page À propos pour les mêmes indicateurs — à clarifier avec le client avant migration.
- Les liens `tel:` sont incohérents selon les pages (`+22521329690` vs `002252722469037`) — uniformiser en `+225 27 22 46 90 37`.
- Aucun lien de réseau social réel (`href="#"` partout) — demander les vraies URLs.
- Le projet "Symphonium" n'a pas de champ "Localisation" renseigné contrairement aux 3 autres — vérifier si c'est voulu.
- Le lien footer "DATARIUM" est un `#` — ancien prestataire, probablement à retirer.
- Toutes les images listées en section 5 ne sont pas présentes dans le dossier scrapé (seuls le HTML/CSS et les captures d'écran PNG le sont) — il faudra récupérer les fichiers images réels sur `artemisconstruction-ci.com` ou les redemander au client.

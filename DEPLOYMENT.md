# Déploiement sur un VPS Hostinger

Guide pas-à-pas pour mettre le site SOGELOC (Next.js + Strapi) en production sur
un VPS Hostinger (Ubuntu). Remplace `VOTRE_DOMAINE` et `VOTRE_IP` par tes
vraies valeurs partout où ils apparaissent.

Architecture cible :

```
Internet
  │
  ├── https://VOTRE_DOMAINE       → Nginx → Next.js (port 3000, PM2)
  └── https://api.VOTRE_DOMAINE   → Nginx → Strapi  (port 1337, PM2)
                                              │
                                          PostgreSQL (local)
```

---

## 0. Prérequis

- VPS Hostinger provisionné, avec Ubuntu 22.04 (ou plus récent)
- Accès SSH root (ou utilisateur sudo)
- Un nom de domaine, avec accès à la zone DNS (chez Hostinger ou ailleurs)

---

## 1. Connexion et mise à jour du système

```bash
ssh root@VOTRE_IP
apt update && apt upgrade -y
```

## 2. Installer Node.js (v22 LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
node -v   # doit afficher v22.x
```

## 3. Installer PostgreSQL

```bash
apt install -y postgresql postgresql-contrib
sudo -u postgres psql
```

Dans le prompt `psql` :

```sql
CREATE DATABASE sogeloc;
CREATE USER sogeloc WITH ENCRYPTED PASSWORD 'CHOISIS_UN_MOT_DE_PASSE_FORT';
GRANT ALL PRIVILEGES ON DATABASE sogeloc TO sogeloc;
\q
```

## 4. Installer PM2, Nginx, Certbot, Git

```bash
npm install -g pm2
apt install -y nginx certbot python3-certbot-nginx git
```

## 5. Créer un utilisateur non-root (recommandé)

```bash
adduser sogeloc
usermod -aG sudo sogeloc
su - sogeloc
```

(Toutes les commandes suivantes s'exécutent en tant que cet utilisateur.)

## 6. Cloner le dépôt

```bash
git clone https://github.com/abdoul-sakhur/projet-sogeloc.git
cd projet-sogeloc
```

## 7. Configurer le backend (Strapi)

```bash
cd backend
cp .env.example .env
nano .env
```

Remplis `.env` avec :

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=<génère 4 valeurs aléatoires séparées par des virgules>
API_TOKEN_SALT=<valeur aléatoire>
ADMIN_JWT_SECRET=<valeur aléatoire>
TRANSFER_TOKEN_SALT=<valeur aléatoire>
JWT_SECRET=<valeur aléatoire>
ENCRYPTION_KEY=<valeur aléatoire>
NODE_ENV=production

DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=sogeloc
DATABASE_USERNAME=sogeloc
DATABASE_PASSWORD=<le mot de passe choisi à l'étape 3>
DATABASE_SSL=false
```

Pour générer une valeur aléatoire pour chaque secret :

```bash
openssl rand -base64 32
```

Installe et build :

```bash
npm install
npm run build
```

## 8. Configurer le frontend (Next.js)

```bash
cd ../frontend
cp .env.example .env.local
nano .env.local
```

```env
NEXT_PUBLIC_STRAPI_API_URL=https://api.VOTRE_DOMAINE
STRAPI_API_TOKEN=<à générer après le premier démarrage de Strapi, voir étape 12>
NEXT_PUBLIC_SITE_URL=https://VOTRE_DOMAINE
```

Installe et build :

```bash
npm install
npm run build
```

## 9. Démarrer les deux applications avec PM2

```bash
cd ~/projet-sogeloc/backend
pm2 start ecosystem.config.js

cd ~/projet-sogeloc/frontend
pm2 start ecosystem.config.js

pm2 save
pm2 startup   # exécute la commande qu'il affiche (une seule fois)
```

Vérifie que tout tourne : `pm2 status` (les deux apps doivent être `online`).

## 10. Configurer Nginx

Les templates sont dans `deploy/nginx-frontend.conf` et `deploy/nginx-backend.conf`
du dépôt.

```bash
sudo cp ~/projet-sogeloc/deploy/nginx-frontend.conf /etc/nginx/sites-available/sogeloc-frontend
sudo cp ~/projet-sogeloc/deploy/nginx-backend.conf /etc/nginx/sites-available/sogeloc-backend

sudo nano /etc/nginx/sites-available/sogeloc-frontend   # remplace VOTRE_DOMAINE
sudo nano /etc/nginx/sites-available/sogeloc-backend    # remplace VOTRE_DOMAINE

sudo ln -s /etc/nginx/sites-available/sogeloc-frontend /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/sogeloc-backend /etc/nginx/sites-enabled/

sudo nginx -t   # doit dire "syntax is ok"
sudo systemctl reload nginx
```

## 11. DNS

Chez ton registrar (ou dans le hPanel Hostinger si le domaine y est aussi) :

| Type | Nom | Valeur |
|---|---|---|
| A | @ | VOTRE_IP |
| A | www | VOTRE_IP |
| A | api | VOTRE_IP |

Attends la propagation (quelques minutes à quelques heures).

## 12. HTTPS avec Certbot

Une fois le DNS propagé (teste avec `ping VOTRE_DOMAINE`) :

```bash
sudo certbot --nginx -d VOTRE_DOMAINE -d www.VOTRE_DOMAINE
sudo certbot --nginx -d api.VOTRE_DOMAINE
```

Certbot modifie automatiquement les configs Nginx pour rediriger en HTTPS.

## 13. Créer le compte admin Strapi et un token API

1. Va sur `https://api.VOTRE_DOMAINE/admin`, crée ton compte admin (comme en local)
2. Vérifie que le rôle **Public** a bien les permissions attendues (Settings →
   Users & Permissions → Roles → Public) — normalement déjà fait automatiquement
   par le bootstrap du projet, mais vérifie
3. Crée un token API en lecture seule : Settings → API Tokens → Create new
   API Token (type "Read-only"), copie le token
4. Renseigne-le dans `frontend/.env.local` → `STRAPI_API_TOKEN=...`
5. Rebuild le frontend : `cd ~/projet-sogeloc/frontend && npm run build && pm2 restart sogeloc-frontend`

## 14. Transférer le contenu depuis le dev local (optionnel mais recommandé)

La base de production démarre **vide** (nouveau Postgres) — le contenu que tu
as saisi en local (pages, services, articles, logo, images...) n'y est pas
automatiquement. Strapi a un outil intégré pour ça :

Sur ta machine locale :

```bash
cd backend
npx strapi transfer --to https://api.VOTRE_DOMAINE/admin
```

Il te demandera un token de transfert, généré dans l'admin de production :
Settings → Transfer Tokens → Create new Transfer Token (type "Full access").

⚠️ Ça **remplace** le contenu de la cible — à faire une seule fois, sur une
base de prod encore vide.

## 15. Vérifications finales

- [ ] `https://VOTRE_DOMAINE` charge le site avec le contenu attendu
- [ ] `https://api.VOTRE_DOMAINE/admin` accessible
- [ ] Formulaire de contact sur `/contact` envoie bien un message (vérifie dans
      Strapi → Content Manager → Contact Message)
- [ ] Images (logo, hero, services...) s'affichent correctement
- [ ] `pm2 status` montre les deux apps `online`
- [ ] `pm2 save` a bien été fait (pour survivre à un redémarrage du VPS)

## Mises à jour futures

```bash
cd ~/projet-sogeloc
git pull

cd backend && npm install && npm run build && pm2 restart sogeloc-backend
cd ../frontend && npm install && npm run build && pm2 restart sogeloc-frontend
```

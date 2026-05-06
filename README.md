# BTS SIO SISR 2026 — Plateforme de Révision

Plateforme complète de révision pour le BTS SIO option SISR — Session 2026.

## Accès en ligne (GitHub Pages)
https://delcoco95.github.io/bts-revision/

## Matières couvertes
- SISR (Systèmes, Réseaux, Infrastructure)
- Cybersécurité
- CEJM (Culture Éco-Juridique et Managériale)
- Mathématiques
- Anglais
- Culture Générale (thème 2026)
- Épreuves E5, E6, E7

## Lancer en local (avec IA)
```bash
cd backend
npm install
node server.js
```
Puis ouvrir http://localhost:3000

## Architecture
- `frontend/` — Interface web statique (HTML/CSS/JS)
- `frontend/data/` — Données JSON (cours, quiz, sujets)
- `backend/` — Serveur Node.js/Express (pour l'IA et les APIs)
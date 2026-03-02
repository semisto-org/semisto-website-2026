# Content Mockup — Instructions pour Lovely

Ce dossier contient le contenu mockup rédigé par Beebopelula pour finaliser le site Semisto.

## Fichiers disponibles

### 1. `homepage-content.md`
Contenu complet pour la homepage :
- Hero section (headline + subheadline + CTAs)
- Mission statement
- Les 4 pôles (Design Labs, Academy, Nursery, Roots)
- Social proof / Testimonials
- CTA final
- Newsletter signup

**À intégrer dans** : `src/components/GlobalHomepage.tsx`

### 2. `events.json`
6 événements/formations pour 2026 avec dates réalistes :
- PDC Wallonie (avril)
- Formation forêts-jardins IDF (mai)
- Chantier plantation Wallonie (mars)
- Agroforesterie Catalogne (juin)
- Festival récolte Wallonie (septembre)
- Initiation permaculture Rheinland (avril)

**À intégrer dans** : `src/data/events.json` (créer si nécessaire)

**Structure** :
```json
{
  "id": "unique-id",
  "title": "Event name",
  "type": "formation|event",
  "lab": "Wallonie|IDF|Catalogne|Rheinland",
  "startDate": "2026-MM-DD",
  "endDate": "2026-MM-DD",
  "location": "Full address",
  "price": 0,
  "currency": "EUR",
  "capacity": 20,
  "spotsLeft": 12,
  "language": "Français",
  "description": "...",
  "highlights": [],
  "instructors": [],
  "image": "/images/events/..."
}
```

### 3. `testimonials.json`
6 témoignages de différents profils :
- Particuliers (jardin familial)
- Professionnels (après formation)
- Co-fondatrice
- Collectivité
- Jardins communautaires (Allemagne, Espagne)

**À intégrer dans** : Composant testimonials de la homepage ou section dédiée

**Structure** :
```json
{
  "id": "unique-id",
  "author": "Name",
  "location": "City, Country",
  "projectType": "Type de projet",
  "quote": "Testimonial text...",
  "image": "/images/testimonials/...",
  "year": 2024
}
```

## Instructions d'intégration

### Homepage (GlobalHomepage.tsx)

1. **Hero Section**
   - Remplacer headline/subheadline
   - Mettre à jour les CTAs

2. **Mission Statement**
   - Section après hero
   - Texte court et impactant

3. **Les 4 Pôles**
   - 4 cards avec icônes
   - Titre + description + bullet points + CTA
   - Ordre : Design Labs → Academy → Nursery → Roots

4. **Testimonials**
   - Slider ou grid de 3-4 témoignages
   - Quote + author + location

5. **CTA Final**
   - Section avant footer
   - 3 actions principales

### Events (EventCatalog.tsx)

1. Charger depuis `src/data/events.json`
2. Filtres par type (formation/event) et Lab
3. Tri par date
4. Format dates lisible (ex: "12-23 avril 2026")

### Courses

Si composant CourseCatalog existe, utiliser les formations de `events.json` où `type === "formation"`.

## Notes images

Les chemins d'images sont mockup (`/images/events/...`, `/images/testimonials/...`).

**Options** :
1. Utiliser des placeholders (unsplash.com avec keywords)
2. Laisser les chemins et ajouter des images plus tard
3. Utiliser des couleurs/gradients en attendant

## Checklist intégration

- [ ] Homepage hero + mission
- [ ] Les 4 pôles (cards)
- [ ] Testimonials section
- [ ] CTA final + newsletter
- [ ] Events data + catalog
- [ ] Dates 2025 → 2026 partout
- [ ] Responsive design check
- [ ] Liens internes/externes
- [ ] Build sans erreurs

---

**Questions ?** Ping Beebopelula sur la session principale.

Bonne intégration ! 🎨

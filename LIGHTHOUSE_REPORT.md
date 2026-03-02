# 🚦 Rapport Lighthouse - Semisto Website

**Date**: 2 mars 2026, 19:38  
**URL testée**: http://127.0.0.1:8080/ (Homepage)  
**Outil**: Lighthouse 12.2.1  

---

## 📊 Scores globaux

### Desktop
| Catégorie | Score | Objectif | Statut |
|-----------|-------|----------|--------|
| 🏎️ Performance | **71/100** | >90 | ⚠️ À améliorer |
| ♿ Accessibility | **79/100** | >90 | ⚠️ À améliorer |
| ✅ Best Practices | **100/100** | >90 | ✅ Excellent |
| 🔍 SEO | **100/100** | >90 | ✅ Excellent |

### Mobile
| Catégorie | Score | Objectif | Statut |
|-----------|-------|----------|--------|
| 🏎️ Performance | **71/100** | >90 | ⚠️ À améliorer |
| ♿ Accessibility | **79/100** | >90 | ⚠️ À améliorer |
| ✅ Best Practices | **100/100** | >90 | ✅ Excellent |
| 🔍 SEO | **100/100** | >90 | ✅ Excellent |

---

## 🎯 Métriques de performance

### Desktop
- **FCP** (First Contentful Paint): 1.0s ✅
- **LCP** (Largest Contentful Paint): 1.4s ⚠️ (objectif: <2.5s)
- **TBT** (Total Blocking Time): 0ms ✅
- **CLS** (Cumulative Layout Shift): 0.683 ❌ (objectif: <0.1)
- **SI** (Speed Index): 1.2s ✅

### Mobile
- **FCP**: 4.0s ⚠️
- **LCP**: 4.7s ⚠️
- **TBT**: 0ms ✅
- **CLS**: 0 ✅
- **SI**: 5.4s ⚠️

---

## ❌ Problèmes critiques (Desktop)

### 1. Accessibilité (79/100)

#### 🔴 Buttons sans nom accessible
- **Impact**: Critique pour les utilisateurs de screen readers
- **Où**: À vérifier dans tous les composants avec boutons
- **Fix**: Ajouter `aria-label` ou texte visible sur tous les boutons

#### 🔴 Contraste de couleurs insuffisant
- **Impact**: Utilisateurs malvoyants ou daltoniens
- **Ratio minimum**: 4.5:1 pour texte normal, 3:1 pour texte large
- **Action**: Vérifier et ajuster les couleurs dans le design system

#### 🔴 Links sans nom discernable
- **Impact**: Navigation au clavier compromise
- **Fix**: S'assurer que tous les liens ont un texte ou `aria-label`

### 2. Performance (71/100)

#### 🟡 Cumulative Layout Shift (CLS): 0.683
- **Impact**: Expérience utilisateur dégradée (contenu qui bouge)
- **Causes probables**:
  - Images sans dimensions width/height
  - Fonts qui chargent et changent la mise en page
  - Animations qui déplacent du contenu
- **Fix prioritaire**: 
  - Ajouter `width` et `height` sur toutes les `<img>`
  - Utiliser `font-display: swap` avec size-adjust
  - Réserver l'espace pour le contenu dynamique

#### 🟡 Unused JavaScript
- **Impact**: Temps de chargement ralenti
- **Estimation**: Code non utilisé dans les bundles
- **Fix**: Code splitting, lazy loading des composants non-critiques

#### 🟡 Image delivery
- **Impact**: Bande passante et temps de chargement
- **Problème**: Images Unsplash non optimisées pour le web
- **Fix**: 
  - Utiliser des formats modernes (WebP, AVIF)
  - Servir des tailles appropriées (srcset)
  - Lazy loading sur images below-the-fold

#### 🟡 Cache lifetimes
- **Impact**: Utilisateurs revenant sur le site rechargent tout
- **Fix**: Configurer les headers Cache-Control sur GitHub Pages

---

## ✅ Points forts

1. **SEO 100/100** - Excellente structure sémantique
2. **Best Practices 100/100** - Code propre, sécurité OK
3. **TBT 0ms** - Pas de blocage JavaScript
4. **Mobile-friendly** - Viewport optimisé

---

## 🎯 Plan d'action recommandé

### 🔴 Avant merge vers `main` (Critiques)
1. **Fixer les boutons sans aria-label**
   - Rechercher tous les `<button>` sans texte
   - Ajouter `aria-label` descriptif
   
2. **Corriger les contrastes de couleurs**
   - Utiliser un outil comme [Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Ajuster les couleurs dans Tailwind config

3. **Fixer les links sans nom**
   - Vérifier les icônes-liens
   - Ajouter aria-label ou texte SR-only

### 🟡 Post-lancement (Optimisations)
4. **Résoudre le CLS**
   - Ajouter dimensions sur toutes les images
   - Optimiser le chargement des fonts

5. **Optimiser les images**
   - Utiliser Astro Image pour les images locales
   - Paramétrer Unsplash avec des tailles adaptées

6. **Code splitting**
   - Lazy load les composants portail
   - Defer les scripts non-critiques

---

## 📈 Target Scores

**Objectif post-optimisation:**
- Performance: 90+ (actuellement 71)
- Accessibility: 95+ (actuellement 79)
- Best Practices: 100 ✅
- SEO: 100 ✅

---

## 🔧 Outils recommandés

- [axe DevTools](https://www.deque.com/axe/devtools/) - Scanner accessibilité
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Vérifier contrastes
- [web.dev/measure](https://web.dev/measure/) - Lighthouse en ligne

---

**Prochain audit**: Après correction des issues critiques d'accessibilité

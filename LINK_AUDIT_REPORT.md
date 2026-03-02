# 🔗 Rapport d'audit des liens - Semisto Website

**Date**: 2 mars 2026, 19:35  
**Outil**: Linkinator  
**Pages scannées**: 92 liens  
**Durée**: 4.6 secondes  

## ❌ Résumé

**30 liens cassés détectés**

## 📋 Détails des liens cassés

### Réseaux sociaux (liens placeholder)
- ❌ `https://youtube.com/semisto` (404) - **répété sur TOUTES les pages** (footer global)
- ❌ `https://youtube.com/@semistowallonie` (404) - page Wallonie

### Médias externes (liens mockup)
- ❌ `https://podcast-regeneration.fr/semisto` (status 0) - page Press
- ❌ `https://lemonde.fr/forets-comestibles-villes` (404) - page Press
- ❌ `https://lavanguardia.com/boscos-comestibles` (404) - page Press
- ❌ `https://wdr.de/waldgarten-koln` (410 Gone) - page Press
- ❌ `https://rtbf.be/jardins-forets-belgique` (404) - page Press

## ✅ Points positifs

- Tous les liens internes fonctionnent correctement
- Les ressources PDF sont accessibles
- Les images Unsplash et images.spr.so chargent bien
- Les liens Facebook, Instagram, LinkedIn fonctionnent

## 🎯 Recommandations

### Priorité HAUTE (avant déploiement)
1. **Corriger le lien YouTube global** dans le footer
   - Soit créer la chaîne YouTube `https://youtube.com/@semisto`
   - Soit retirer temporairement le lien

### Priorité MOYENNE (post-lancement)
2. **Page Press**: remplacer les liens médias mockup par:
   - Des vrais articles quand ils seront publiés
   - OU retirer la section temporairement
   - OU ajouter un disclaimer "À venir"

3. **Créer les chaînes YouTube spécifiques**:
   - `https://youtube.com/@semistowallonie`
   - Ou retirer ces liens des pages lab

## 📊 Impact utilisateur

- **Critique**: Le lien YouTube cassé dans le footer apparaît sur **toutes les pages** (estimation: ~150+ occurrences)
- **Moyen**: Les liens médias sont sur une seule page (Press), impact limité
- **Faible**: Les autres liens YT spécifiques sont sur des pages lab individuelles

## 🔧 Action requise

@Lovely: Merci de corriger au minimum le lien YouTube du footer avant le merge vers `main`.

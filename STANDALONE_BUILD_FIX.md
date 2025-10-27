# 🔧 Fix : Images manquantes en production avec Standalone Build

## 🐛 Problème Identifié

Les images apparaissent en développement (`npm run dev`) mais pas en production déployée sur Render.

### Cause

Avec la configuration `output: 'standalone'` dans `next.config.js`, Next.js crée un build optimisé mais **ne copie pas automatiquement** :
- Le dossier `public/`
- Le dossier `.next/static/`

Ces fichiers doivent être copiés manuellement dans `.next/standalone/` pour être servis.

## ✅ Solution Implémentée

### 1. Script de Copie Automatique

**Fichier créé** : `scripts/copy-standalone.js`

Ce script copie automatiquement :
- `public/` → `.next/standalone/public/`
- `.next/static/` → `.next/standalone/.next/static/`

### 2. Modification du Build

**Fichier modifié** : `package.json`

```json
"scripts": {
  "build": "next build && node scripts/copy-standalone.js"
}
```

Le build exécute maintenant :
1. `next build` (build Next.js normal)
2. `node scripts/copy-standalone.js` (copie des assets)

### 3. Configuration du Cache

**Fichier modifié** : `next.config.js`

Le cache des images est maintenant intelligent :
- **Développement** : `no-cache` (images rafraîchies immédiatement)
- **Production** : `max-age=31536000` (cache d'1 an pour performance)

## 🚀 Commandes de Déploiement

### Build Local (pour tester)

```bash
# Build avec copie automatique
npm run build

# Tester le serveur standalone
cd .next/standalone
node server.js
```

Le serveur sera disponible sur `http://localhost:3000`

### Déploiement Render

**Build Command :**
```bash
npm install && npm run build
```

**Start Command :**
```bash
cd .next/standalone && node server.js
```

⚠️ **CRITIQUE** : La start command doit absolument inclure `cd .next/standalone` pour utiliser le build optimisé.

## 🧪 Test de Vérification

Après le build, vérifiez que les fichiers sont copiés :

```bash
# Vérifier les images
ls -la .next/standalone/public/images/

# Vérifier les fichiers statiques
ls -la .next/standalone/.next/static/
```

Les deux dossiers doivent contenir tous vos fichiers.

## 📊 Résultat Attendu

### Avant le Fix
- ✅ Images visibles en dev (`npm run dev`)
- ❌ Images manquantes en prod (placeholders gris)
- ❌ Erreurs 404 dans les logs

### Après le Fix
- ✅ Images visibles en dev
- ✅ Images visibles en prod
- ✅ Performance optimale avec standalone
- ✅ Taille du build réduite

## 🔍 Logs de Succès

Après `npm run build`, vous devriez voir :

```
✓ Compiled successfully
✓ Generating static pages
📁 Copying files for standalone build...
📁 Copying public/ directory...
📁 Copying .next/static/ directory...
✅ Standalone build is ready!
```

## 📝 Fichiers Modifiés

1. ✅ `scripts/copy-standalone.js` (nouveau)
2. ✅ `package.json` (build script modifié)
3. ✅ `next.config.js` (cache intelligent)
4. ✅ `RENDER_DEPLOYMENT.md` (documentation mise à jour)

## 🎯 Points Clés

1. **Le mode standalone est conservé** → Meilleure performance
2. **Les assets sont copiés automatiquement** → Plus d'oubli
3. **Le cache est optimisé** → Rapide en prod, flexible en dev
4. **Compatible Render** → Fonctionne avec leur infrastructure

---

**Date** : 27 Octobre 2025  
**Status** : ✅ Résolu et Testé  
**Impact** : Toutes les images maintenant visibles en production


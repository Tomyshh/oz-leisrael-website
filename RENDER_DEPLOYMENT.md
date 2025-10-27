# 🚀 Guide de Déploiement sur Render

## ✅ Correctifs Appliqués pour la Production

### Problème Résolu : Crash du serveur dû aux images trop lourdes

Les images suivantes ont été optimisées :
- ✅ `cover.png` : 17.77MB → 0.46MB (-97.4%) → converti en `cover.jpg`
- ✅ `zionism-community.jpg` : 5.28MB → 0.40MB (-92.4%)
- ✅ `physical-preparation.png` : 0.68MB → 0.08MB (-88.2%) → converti en `.jpg`
- ✅ `spiritual-preparation.jpg` : 0.29MB → 0.12MB (-58.2%)
- ✅ `logo.png` : 1.19MB → 0.05MB (-95.4%)

**Économie totale : ~24MB → ~1MB**

### Configuration Next.js Optimisée

- ✅ Suppression du format AVIF (cause des problèmes sur Render)
- ✅ Format WebP uniquement pour de meilleures performances
- ✅ Mode `standalone` pour builds optimisés
- ✅ Script automatique de copie des fichiers public/ et static/
- ✅ Suppression du code splitting webpack agressif

## 📋 Étapes pour le Déploiement

### 1. Commit et Push des Changements

```bash
git add .
git commit -m "fix: Configuration standalone avec copie automatique des assets"
git push origin main
```

### 2. Configuration Render

Dans le dashboard Render, vérifiez :

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
cd .next/standalone && node server.js
```

**Environment Variables:**
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

⚠️ **IMPORTANT** : La commande de démarrage doit absolument être `cd .next/standalone && node server.js` pour utiliser le mode standalone optimisé.

### 3. Variables d'Environnement Recommandées

Ajoutez dans Render Dashboard :
- `NODE_ENV` = `production`
- `NEXT_TELEMETRY_DISABLED` = `1`

### 4. Augmenter les Ressources (si nécessaire)

Si le serveur crash encore :
- Passer au plan "Standard" (512MB RAM minimum)
- Ou augmenter le timeout à 60 secondes

## 🔧 Configuration Render.yaml (Optionnel)

Créez `render.yaml` à la racine :

```yaml
services:
  - type: web
    name: oz-leisrael
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: NEXT_TELEMETRY_DISABLED
        value: 1
    healthCheckPath: /
```

## 📊 Métriques Attendues

Après le déploiement, vous devriez voir :

### Temps de Réponse
- Page d'accueil : < 2 secondes (cold start)
- Pages suivantes : < 500ms
- Images : < 200ms

### Utilisation Mémoire
- Démarrage : ~150-200MB
- Runtime : ~250-350MB
- Pic : < 450MB

## 🐛 Troubleshooting

### Si le serveur crash toujours :

1. **Vérifier les logs Render** :
   ```
   Look for "502" errors or "Out of memory"
   ```

2. **Augmenter la mémoire** :
   - Dashboard Render > Settings > Instance Type
   - Choisir "Standard" (512MB)

3. **Vérifier les images** :
   ```bash
   cd public/images
   ls -lh *.jpg *.png
   # Aucune image ne devrait dépasser 500KB
   ```

4. **Tester localement en mode production** :
   ```bash
   npm run build
   npm start
   # Ouvrir http://localhost:3000
   ```

### Si les images ne se chargent pas :

1. **Vérifier le build** :
   ```bash
   npm run build
   # Vérifier qu'il n'y a pas d'erreurs
   ```

2. **Vérifier les chemins** :
   - Les chemins doivent commencer par `/images/`
   - Pas de `./` ou `../`

3. **Clear cache Render** :
   - Dashboard > Manual Deploy > Clear build cache

## 📝 Commandes Utiles

```bash
# Réoptimiser les images
npm run optimize-images

# Build local
npm run build

# Démarrer en production
npm start

# Vérifier la taille des images
du -sh public/images/*
```

## ✅ Checklist Avant Déploiement

- [ ] Images optimisées (< 500KB chacune)
- [ ] Build local réussi (`npm run build`)
- [ ] Test local en production (`npm start`)
- [ ] Git commit et push effectués
- [ ] Variables d'environnement configurées sur Render
- [ ] Build command correct : `npm install && npm run build`
- [ ] Start command correct : `npm start`

## 🎉 Résultat Attendu

Après ces optimisations :
- ✅ Le serveur ne crash plus
- ✅ Les images se chargent rapidement
- ✅ Temps de chargement < 3 secondes
- ✅ Utilisation mémoire < 400MB
- ✅ Pas d'erreurs 502

---

**Date** : Octobre 2025  
**Status** : ✅ Optimisé pour Production Render


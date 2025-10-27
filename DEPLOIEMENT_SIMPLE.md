# 🚀 Guide de Déploiement Simple - Oz LeIsrael

## ✅ Ce qui se fait AUTOMATIQUEMENT

Quand vous faites `npm run build`, le système :
1. ✅ Compile votre application Next.js
2. ✅ Copie automatiquement toutes les images du dossier `public/`
3. ✅ Copie tous les fichiers statiques nécessaires
4. ✅ Crée un build standalone optimisé
5. ✅ Tout est prêt pour la production !

Vous n'avez **RIEN** à faire manuellement ! 🎉

---

## 📦 Déploiement sur Render (3 étapes)

### Étape 1 : Pusher vos changements

```bash
git add .
git commit -m "Vos modifications"
git push origin main
```

**C'est tout !** Render détecte automatiquement le push et lance le déploiement.

---

### Étape 2 : Vérifier la Configuration Render (une seule fois)

Allez dans votre Dashboard Render et vérifiez ces paramètres :

#### Build Command
```bash
npm install && npm run build
```

#### Start Command ⚠️ IMPORTANT
```bash
cd .next/standalone && node server.js
```

> ⚠️ La commande `cd .next/standalone` est ESSENTIELLE pour que les images s'affichent !

#### Variables d'Environnement
- `NODE_ENV` = `production`
- `NEXT_TELEMETRY_DISABLED` = `1`

---

### Étape 3 : Attendre le Déploiement

Render va automatiquement :
1. 📥 Récupérer votre code depuis GitHub
2. 📦 Installer les dépendances (`npm install`)
3. 🏗️ Construire l'application (`npm run build`)
   - → Le script copie automatiquement vos images
4. 🚀 Démarrer le serveur
5. ✅ Votre site est en ligne !

**Temps estimé** : 3-5 minutes

---

## 🧪 Test en Local (Optionnel)

Pour tester le build de production en local avant de déployer :

```bash
# Build l'application (avec copie automatique des assets)
npm run build

# Démarrer le serveur standalone
cd .next/standalone
node server.js
```

Ouvrez `http://localhost:3000` - tout devrait fonctionner comme en production !

---

## 📋 Checklist de Déploiement

- [ ] J'ai testé mon site en local (`npm run dev`)
- [ ] Toutes mes images sont dans le dossier `public/images/`
- [ ] J'ai commité et pushé mes changements
- [ ] La Start Command sur Render contient `cd .next/standalone`
- [ ] Le déploiement Render est terminé sans erreur
- [ ] J'ai testé le site en production

---

## 🎯 Commandes Rapides

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Pousser les changements (déclenche le déploiement automatique)
git add .
git commit -m "Description de vos changements"
git push origin main
```

---

## ❓ Problèmes Courants

### Les images n'apparaissent pas en production

**Solution** : Vérifiez la Start Command sur Render :
```bash
cd .next/standalone && node server.js
```
Le `cd .next/standalone` est essentiel !

### Le build échoue sur Render

1. Vérifiez que le build fonctionne en local : `npm run build`
2. Vérifiez les logs dans le Dashboard Render
3. Assurez-vous que toutes les dépendances sont dans `package.json`

### Le site est lent au premier chargement

C'est normal ! Render met le serveur en veille après inactivité.
- Première visite : 5-10 secondes (cold start)
- Visites suivantes : < 1 seconde

Pour éviter ça, passez au plan payant de Render ou utilisez un service de monitoring qui ping votre site régulièrement.

---

## 📚 Documentation Complète

- **Configuration détaillée** : `RENDER_DEPLOYMENT.md`
- **Fix du build standalone** : `STANDALONE_BUILD_FIX.md`
- **Optimisations** : `OPTIMIZATIONS.md`

---

**Dernière mise à jour** : 27 Octobre 2025  
**Status** : ✅ Tout fonctionne automatiquement !


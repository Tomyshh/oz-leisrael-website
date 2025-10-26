# Oz LeIsrael - Site Web

Site web officiel du programme Oz LeIsrael, combinant préparation spirituelle et physique pour l'élite de Tsahal.

## 🚀 Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Framer Motion** - Animations
- **React Icons** - Icônes
- **Custom i18n** - Support multilingue (FR/EN)

## 📁 Structure du projet

```
website/
├── src/
│   ├── app/              # Pages et routes
│   ├── components/       # Composants réutilisables
│   ├── locales/         # Fichiers de traduction
│   └── lib/             # Utilitaires et configurations
├── public/              # Assets statiques
│   ├── images/          # Images
│   ├── videos/          # Vidéos
│   └── fonts/           # Polices personnalisées
└── package.json         # Dépendances
```

## 🛠️ Installation et développement

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Construire pour la production**
   ```bash
   npm run build
   ```

4. **Lancer en production**
   ```bash
   npm start
   ```

## 🌐 Fonctionnalités

- **Site bilingue** : Français et Anglais avec changement dynamique
- **Design responsive** : Optimisé pour mobile, tablette et desktop
- **Galerie média** : Photos et vidéos avec filtres
- **Formulaire de contact** : Avec validation et intégration WhatsApp
- **Animations** : Transitions fluides avec Framer Motion
- **SEO optimisé** : Métadonnées, sitemap, robots.txt

## 📱 Pages principales

1. **Accueil** : Vidéo hero, piliers du programme, témoignages
2. **Le Programme** : Galerie média, journée type, témoignages détaillés
3. **Notre Approche** : Les deux piliers (Kodesh/Hol), processus d'intégration
4. **La Yeshiva** : Mission, partenariat avec Or Vishua, valeurs
5. **Contact** : Formulaire de candidature, WhatsApp direct

## 🎨 Personnalisation

### Couleurs (Tailwind)
- **Primary** : Bleu (diverses nuances)
- **Secondary** : Orange/Kaki
- **Accent** : Orange vif

### Polices
- **Sans-serif** : Montserrat
- **Display** : Oswald

## 📝 Contenu à préparer

Pour compléter le site, vous devez fournir :

1. **Vidéos** :
   - `hero-video.mp4` : Vidéo de fond pour la page d'accueil (15-20s)
   - Vidéos de témoignages
   - Vidéos d'entraînement et de cours

2. **Images** :
   - Photos haute résolution des activités
   - Images des piliers (spirituel, physique, sionisme)
   - Photos de la Yeshiva Or Vishua
   - Portraits pour les témoignages

3. **Textes** :
   - Descriptions détaillées des programmes
   - Témoignages complets
   - Informations sur la Yeshiva

## 🔧 Configuration

### Variables d'environnement
Créez un fichier `.env.local` pour les variables sensibles :
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ANALYTICS_ID=
```

### Déploiement
Le site est prêt pour être déployé sur :
- Vercel (recommandé pour Next.js)
- Netlify
- Tout serveur Node.js

## 📞 Support

Pour toute question technique, contactez l'équipe de développement.

---

© 2024 Oz LeIsrael - Tous droits réservés

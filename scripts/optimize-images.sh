#!/bin/bash

# Script pour optimiser les images trop lourdes

echo "🖼️  Optimisation des images..."

# Vérifier si ImageMagick est installé
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick n'est pas installé. Installation..."
    echo "Sur Mac: brew install imagemagick"
    echo "Sur Linux: sudo apt-get install imagemagick"
    exit 1
fi

cd "$(dirname "$0")/../public/images"

# Optimiser cover.png (18MB -> ~2MB)
if [ -f "cover.png" ]; then
    echo "📸 Optimisation de cover.png..."
    mv cover.png cover-original.png
    convert cover-original.png -quality 85 -resize 1920x1920\> cover.jpg
    echo "✅ cover.png optimisé"
fi

# Optimiser zionism-community.jpg (5.3MB -> ~500KB)
if [ -f "zionism-community.jpg" ]; then
    echo "📸 Optimisation de zionism-community.jpg..."
    mv zionism-community.jpg zionism-community-original.jpg
    convert zionism-community-original.jpg -quality 85 -resize 1920x1920\> zionism-community.jpg
    echo "✅ zionism-community.jpg optimisé"
fi

# Optimiser physical-preparation.png (700KB -> ~200KB)
if [ -f "physical-preparation.png" ]; then
    echo "📸 Optimisation de physical-preparation.png..."
    mv physical-preparation.png physical-preparation-original.png
    convert physical-preparation-original.png -quality 85 -resize 1920x1920\> physical-preparation.jpg
    echo "✅ physical-preparation.png optimisé"
fi

# Optimiser spiritual-preparation.jpg
if [ -f "spiritual-preparation.jpg" ]; then
    echo "📸 Optimisation de spiritual-preparation.jpg..."
    mv spiritual-preparation.jpg spiritual-preparation-original.jpg
    convert spiritual-preparation-original.jpg -quality 85 -resize 1920x1920\> spiritual-preparation.jpg
    echo "✅ spiritual-preparation.jpg optimisé"
fi

echo ""
echo "✅ Optimisation terminée!"
echo "📊 Nouvelles tailles:"
ls -lh *.jpg *.png 2>/dev/null | awk '{print $9 " - " $5}'


#!/bin/bash

# Script de build pour production avec standalone
echo "🚀 Building Next.js application..."
npm run build

# Copier le dossier public dans standalone
if [ -d ".next/standalone" ]; then
  echo "📁 Copying public files to standalone..."
  cp -r public .next/standalone/
  echo "📁 Copying .next/static to standalone..."
  cp -r .next/static .next/standalone/.next/
  echo "✅ Build completed successfully!"
else
  echo "⚠️  Warning: .next/standalone directory not found"
  echo "Using standard build mode"
fi


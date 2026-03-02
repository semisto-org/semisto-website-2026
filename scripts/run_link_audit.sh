#!/bin/bash
set -e

echo "🔍 Linkinator - Audit des liens du site Semisto"
echo "================================================"

# Build d'abord si nécessaire
if [ ! -d "dist/client" ]; then
  echo "📦 Build du site..."
  npm run build
fi

# Installer linkinator si pas présent
if ! command -v linkinator &> /dev/null; then
  echo "📥 Installation de linkinator..."
  npm install -g linkinator
fi

# Lancer l'audit
echo ""
echo "🔗 Vérification des liens..."
echo ""

linkinator dist/client \
  --recurse \
  --skip "https://fonts.googleapis.com" \
  --skip "https://www.googletagmanager.com" \
  --format json > link-audit-results.json

# Afficher un résumé
echo ""
echo "📊 Résumé de l'audit:"
cat link-audit-results.json | jq '{
  total: .links | length,
  broken: [.links[] | select(.state == "BROKEN")] | length,
  ok: [.links[] | select(.state == "OK")] | length
}'

# Afficher les liens cassés s'il y en a
BROKEN_COUNT=$(cat link-audit-results.json | jq '[.links[] | select(.state == "BROKEN")] | length')

if [ "$BROKEN_COUNT" -gt 0 ]; then
  echo ""
  echo "⚠️  Liens cassés détectés:"
  cat link-audit-results.json | jq -r '.links[] | select(.state == "BROKEN") | "  ❌ \(.url) → \(.status) (\(.failureDetails.type // "unknown"))"'
  exit 1
else
  echo ""
  echo "✅ Tous les liens sont valides!"
fi

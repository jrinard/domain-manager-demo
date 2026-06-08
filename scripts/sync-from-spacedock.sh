#!/usr/bin/env bash
# Copies Domain Manager and dependencies from Spacedock into this repo's packages/ folder.
# Usage: ./scripts/sync-from-spacedock.sh [/path/to/spacedock]
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SPACEDOCK="${1:-$(cd "$REPO_ROOT/../spacedock" 2>/dev/null && pwd || true)}"

if [[ ! -d "$SPACEDOCK/packages/interfaces/domain-manager" ]]; then
  echo "Error: Spacedock not found at: $SPACEDOCK"
  echo "Usage: $0 /path/to/spacedock"
  exit 1
fi

echo "Syncing from Spacedock: $SPACEDOCK"
echo "Into portfolio repo:     $REPO_ROOT"

# Package trees to vendor (relative to spacedock/packages/)
PACKAGE_DIRS=(
  interfaces/domain-manager
  domain
  falcon
  falcon-ui
  bento
  cargo-bay
  chaincode
  comlink
  data-validation
  dossier
  file-download
  manifest
  md-wysiwyg
  md-viewer
  navigator
  noonian
  origins
  starliner
  tricorder
  tryyb-services
  use-param-number
  use-number
  usedom
  image-crop
  tailwind-patterns
  tardis
  holoprojector
  tryyb-dnd
  syyncronyyzed
  lore
  tyto
  holodeck/router
)

mkdir -p "$REPO_ROOT/packages"

for rel in "${PACKAGE_DIRS[@]}"; do
  src="$SPACEDOCK/packages/$rel"
  dest="$REPO_ROOT/packages/$rel"
  if [[ ! -d "$src" ]]; then
    echo "WARN: missing $src — skipping"
    continue
  fi
  echo "  → packages/$rel"
  mkdir -p "$(dirname "$dest")"
  rm -rf "$dest"
  rsync -a --exclude node_modules --exclude dist "$src/" "$dest/"
done

# TypeScript path aliases
cp "$SPACEDOCK/tsconfig.base.json" "$REPO_ROOT/tsconfig.base.json"

# MSW service worker (if present)
if [[ -f "$SPACEDOCK/apps/storybook/public/mockServiceWorker.js" ]]; then
  mkdir -p "$REPO_ROOT/public"
  cp "$SPACEDOCK/apps/storybook/public/mockServiceWorker.js" "$REPO_ROOT/public/"
  echo "  → public/mockServiceWorker.js"
fi

# Portfolio-only patches (Spacedock source stays unchanged)
"$SCRIPT_DIR/patch-for-portfolio.sh"

echo ""
echo "Done. Next:"
echo "  cd $REPO_ROOT"
echo "  pnpm install"
echo "  pnpm dev"

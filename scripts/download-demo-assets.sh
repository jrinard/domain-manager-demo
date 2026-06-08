#!/usr/bin/env bash
# One-time fetch of demo assets from Cherry (run locally; paths wired in src/demo/demoAssetPaths.ts).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BASE="https://cherry.mocaworks.com"
OUT="$ROOT/public/demo-assets"

mkdir -p "$OUT/bg-images" "$OUT/menu-icons/small-icons" "$OUT/trait-icons" "$OUT/logos" "$OUT/profile"

fetch() {
  local url="$1"
  local dest="$2"
  mkdir -p "$(dirname "$dest")"
  if [[ -f "$dest" ]]; then
    echo "  skip (exists) $dest"
    return 0
  fi
  echo "  get $dest"
  curl -fsSL "$url" -o "$dest"
}

echo "→ bg-images"
fetch "$BASE/v2/domains/551/images/packages/bg-images/PrismBg1-black.jpg" "$OUT/bg-images/PrismBg1-black.jpg"
fetch "$BASE/v2/domains/551/images/packages/bg-images/PrismBg1-white.jpg" "$OUT/bg-images/PrismBg1-white.jpg"
fetch "$BASE/v2/domains/551/images/packages/bg-images/Purple_Top_Down.jpg" "$OUT/bg-images/Purple_Top_Down.jpg"
fetch "$BASE/v2/domains/551/images/packages/bg-images/Blue_Top_Down.jpg" "$OUT/bg-images/Blue_Top_Down.jpg"
fetch "$BASE/v2/domains/551/images/packages/bg-images/Red_Top_Down.jpg" "$OUT/bg-images/Red_Top_Down.jpg"
fetch "$BASE/v2/domains/551/images/packages/bg-images/Tryyb_Back.jpg" "$OUT/bg-images/Tryyb_Back.jpg"

echo "→ logos & profile"
fetch "$BASE/v2/domains/551/images/home_link.png" "$OUT/logos/logo-light.png"
fetch "$BASE/v2/domains/551/images/top-menu-icons/ppf-logo.png" "$OUT/logos/logo-dark.png"
fetch "$BASE/v2/domains/551/assets/1960713_tsc3eykcizn_200px.jpg" "$OUT/profile/demo-user.jpg"

echo "→ menu-icons"
MENU_ICONS=(
  "10X-Employee-Team-Plus.png"
  "10X.png"
  "Ability-List.png"
  "Bug.png"
  "Catalog.png"
  "Category-Manager.png"
  "Courses.png"
  "Credit-Types.png"
  "Dashboard.png"
  "Event-Templates.png"
  "Exams.png"
  "icon-playbook.png"
  "icon-restore-user.png"
  "icon-security-role.png"
  "icon-service-request.png"
  "Manage.png"
  "News.png"
  "Plan-Templates.png"
  "ppf-logo.png"
  "Projects.png"
  "r3-logo.png"
  "search-2.png"
  "Statistics.png"
  "Surveys.png"
  "Team.png"
  "TPA.png"
  "VCEP-Editor.png"
  "CEO Icons_R3.png"
  "CEO Icons_inbox.png"
  "CEO Icons_library.png"
  "CEO Icons_teamboards.png"
  "CEO Icons_training.png"
  "CEO Icons_to do.png"
  "CEO Icons_events.png"
)
for f in "${MENU_ICONS[@]}"; do
  enc="${f// /%20}"
  fetch "$BASE/v2/domains/551/images/top-menu-icons/$enc" "$OUT/menu-icons/$f"
done

SMALL_ICONS=(
  "events.png"
  "inbox.png"
  "library.png"
  "manage.png"
  "news.png"
  "PPF.png"
  "projects.png"
  "search.png"
  "statistics.png"
  "training.png"
  "VCEP.png"
  "to dos.png"
  "10X Action Plan.png"
)
for f in "${SMALL_ICONS[@]}"; do
  enc="${f// /%20}"
  fetch "$BASE/v2/domains/551/images/top-menu-icons/small-icons/$enc" "$OUT/menu-icons/small-icons/$f"
done

fetch "$BASE/v2/domains/1825957/images/top-menu-icons/External%20Link.png" "$OUT/menu-icons/external-link.png"

echo "→ trait-icons (menu picker sample)"
TRAIT_ICONS=(
  trait268_hah04mos.png
  trait227_devidy5j.png
  trait115_3jorhvxz.png
  trait581_vye424fz.png
  trait146_zshiknb0.png
)
for f in "${TRAIT_ICONS[@]}"; do
  fetch "$BASE/v2/domains/551/traitIcons/$f" "$OUT/trait-icons/$f"
done

echo "Done. Assets in public/demo-assets/"

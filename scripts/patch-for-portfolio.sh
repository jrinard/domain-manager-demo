#!/usr/bin/env bash
# Applies portfolio-only changes to vendored Spacedock packages.
# Spacedock itself stays untouched — run this after sync-from-spacedock.sh.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
HEADER="$REPO_ROOT/packages/interfaces/domain-manager/src/presentation/layouts/DomainHeader.tsx"
FACTORY="$REPO_ROOT/packages/falcon/tailwind/src/config-factory.js"

if [[ ! -f "$HEADER" ]]; then
  echo "WARN: DomainHeader not found — run sync-from-spacedock.sh first"
  exit 0
fi

if ! grep -q 'IS_PORTFOLIO_DEMO' "$HEADER"; then
  echo "  → patching DomainHeader for portfolio demo"
  python3 - "$HEADER" <<'PY'
import sys
from pathlib import Path

path = Path(sys.argv[1])
text = path.read_text()

demo_constants = """
/** Portfolio demo: only Tryyb / Menu / Mastery tabs; no wizard or create-domain flows. */
const IS_PORTFOLIO_DEMO = import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true'
const PORTFOLIO_DEMO_TAB_IDS = new Set(['tryyb', 'menu', 'mastery'])
"""

needle = "interface DomainHeaderProps extends React.PropsWithChildren {\n  teamID: number\n}\n\nconst DomainHeader"
if needle not in text:
    raise SystemExit("DomainHeader structure changed — update patch-for-portfolio.sh")

text = text.replace(
    needle,
    "interface DomainHeaderProps extends React.PropsWithChildren {\n  teamID: number\n}\n"
    + demo_constants
    + "\nconst DomainHeader",
    1,
)

text = text.replace(
    "    tabs.sort((a, b) => a.order - b.order)\n\n    return tabs\n  }, [props.teamID, permissions])",
    "    tabs.sort((a, b) => a.order - b.order)\n\n"
    "    if (IS_PORTFOLIO_DEMO) {\n"
    "      return tabs.filter((tab) => PORTFOLIO_DEMO_TAB_IDS.has(tab.id))\n"
    "    }\n\n"
    "    return tabs\n  }, [props.teamID, permissions])",
    1,
)

text = text.replace(
    "            <div className=\"flex justify-end gap-4\">\n"
    "              <Button\n"
    "                disabled={false}\n"
    "                variant=\"outline\"\n"
    "                onClick={() => {\n"
    "                  setShowSetupWizard((cur) => !cur)\n"
    "                }}\n"
    "              >\n"
    "                Setup Wizard\n"
    "              </Button>",
    "            <div className=\"flex justify-end gap-4\">\n"
    "              {!IS_PORTFOLIO_DEMO && (\n"
    "                <Button\n"
    "                  disabled={false}\n"
    "                  variant=\"outline\"\n"
    "                  onClick={() => {\n"
    "                    setShowSetupWizard((cur) => !cur)\n"
    "                  }}\n"
    "                >\n"
    "                  Setup Wizard\n"
    "                </Button>\n"
    "              )}",
    1,
)

text = text.replace(
    "              <Button\n"
    "                disabled={!hasDomainAddPerms}\n"
    "                variant=\"outline\"\n"
    "                onClick={() => {\n"
    "                  if (hasDomainAddPerms) {\n"
    "                    setCreateNewDomainDialogOpen(!createNewDomainDialogOpen)\n"
    "                  }\n"
    "                }}\n"
    "              >\n"
    "                Create Domain\n"
    "              </Button>",
    "              {!IS_PORTFOLIO_DEMO && (\n"
    "                <Button\n"
    "                  disabled={!hasDomainAddPerms}\n"
    "                  variant=\"outline\"\n"
    "                  onClick={() => {\n"
    "                    if (hasDomainAddPerms) {\n"
    "                      setCreateNewDomainDialogOpen(!createNewDomainDialogOpen)\n"
    "                    }\n"
    "                  }}\n"
    "                >\n"
    "                  Create Domain\n"
    "                </Button>\n"
    "              )}",
    1,
)

text = text.replace(
    "          <NewDomainWizard\n"
    "            domainID={domainID || 0}\n"
    "            open={showSetupWizard}\n"
    "            onOpenChange={setShowSetupWizard}\n"
    "          />\n\n"
    "          {createNewDomainDialogOpen && (",
    "          {!IS_PORTFOLIO_DEMO && (\n"
    "            <NewDomainWizard\n"
    "              domainID={domainID || 0}\n"
    "              open={showSetupWizard}\n"
    "              onOpenChange={setShowSetupWizard}\n"
    "            />\n"
    "          )}\n\n"
    "          {!IS_PORTFOLIO_DEMO && createNewDomainDialogOpen && (",
    1,
)

path.write_text(text)
PY
else
  echo "  → DomainHeader already patched for portfolio demo"
fi

if [[ -f "$HEADER" ]] && grep -q "label: 'TRYYB'" "$HEADER" && ! grep -q "IS_PORTFOLIO_DEMO ? 'HOME'" "$HEADER"; then
  echo "  → patching DomainHeader Home tab label"
  sed -i '' "s/label: 'TRYYB'/label: IS_PORTFOLIO_DEMO ? 'HOME' : 'TRYYB'/" "$HEADER"
fi

VERSION_CONTROL="$REPO_ROOT/packages/interfaces/domain-manager/src/presentation/pages/version-control/VersionControl.tsx"
if [[ -f "$VERSION_CONTROL" ]] && ! grep -q 'function pageSectionLabel' "$VERSION_CONTROL"; then
  echo "  → patching VersionControl Home section labels"
  python3 - "$VERSION_CONTROL" <<'PY'
import sys
from pathlib import Path

path = Path(sys.argv[1])
text = path.read_text()

demo_block = """
type VersionControlPage =
  | 'tryyb'
  | 'menu'
  | 'mastery'
  | 'images'
  | 'custom-names'
  | 'r3'
  | 'services'

const IS_PORTFOLIO_DEMO = import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true'

function pageSectionLabel(page: VersionControlPage): string {
  if (IS_PORTFOLIO_DEMO && page === 'tryyb') return 'HOME'
  return page.toUpperCase()
}

function pageSectionLabelClassName(page: VersionControlPage): string {
  if (IS_PORTFOLIO_DEMO && page === 'tryyb') return 'text-primary mr-2'
  return 'text-primary mr-2 capitalize'
}

interface VersionControlProps {
"""

needle = "interface VersionControlProps {"
if needle not in text:
    raise SystemExit("VersionControl structure changed — update patch-for-portfolio.sh")

text = text.replace(needle, demo_block, 1)

text = text.replace(
    "  page:\n    | 'tryyb'\n    | 'menu'\n    | 'mastery'\n    | 'images'\n    | 'custom-names'\n    | 'r3'\n    | 'services'",
    "  page: VersionControlPage",
    1,
)

text = text.replace(
    "{page.toUpperCase()}",
    "{pageSectionLabel(page)}",
)

text = text.replace(
    'className="text-primary mr-2 capitalize"',
    'className={pageSectionLabelClassName(page)}',
)

text = text.replace(
    "    { value: 'Home', item: 'Home' },",
    "    {\n"
    "      value: 'Home',\n"
    "      item: IS_PORTFOLIO_DEMO ? 'HOME' : 'Home',\n"
    "    },",
    1,
)

text = text.replace(
    "    { value: 'Orange/Black (Tryyb)', item: 'Orange/Black (Tryyb)' },",
    "    {\n"
    "      value: 'Orange/Black (Tryyb)',\n"
    "      item: IS_PORTFOLIO_DEMO ? 'Orange/Black' : 'Orange/Black (Tryyb)',\n"
    "    },",
    1,
)

path.write_text(text)
PY
elif [[ -f "$VERSION_CONTROL" ]]; then
  echo "  → VersionControl already patched for Home labels"
fi

TEAM_HEADER="$REPO_ROOT/packages/interfaces/domain-manager/src/presentation/layouts/TeamHeader.tsx"
if [[ -f "$TEAM_HEADER" ]] && grep -q "label: 'TRYYB'" "$TEAM_HEADER" && ! grep -q "IS_PORTFOLIO_DEMO ? 'HOME'" "$TEAM_HEADER"; then
  echo "  → patching TeamHeader Home tab label"
  if ! grep -q 'IS_PORTFOLIO_DEMO' "$TEAM_HEADER"; then
    sed -i '' "/import { DOMAIN_MANAGER_PATHS }/a\\
\\
const IS_PORTFOLIO_DEMO = import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true'
" "$TEAM_HEADER"
  fi
  sed -i '' "s/label: 'TRYYB'/label: IS_PORTFOLIO_DEMO ? 'HOME' : 'TRYYB'/" "$TEAM_HEADER"
fi

if [[ -f "$FACTORY" ]] && ! grep -q 'Portfolio demo: no Nx workspace' "$FACTORY"; then
  echo "  → patching tailwind config-factory (remove Nx dependency)"
  python3 - "$FACTORY" <<'PY'
import sys
from pathlib import Path

path = Path(sys.argv[1])
text = path.read_text()
old = """const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { workspaceRoot } = require('@nx/devkit')
const { join } = require('node:path')"""
new = """const { join } = require('node:path')
// Portfolio demo: no Nx workspace — repo root is four levels up from this file
const workspaceRoot = join(__dirname, '../../../..')
const createGlobPatternsForDependencies = () => []"""
if old not in text:
    raise SystemExit("config-factory structure changed — update patch-for-portfolio.sh")
path.write_text(text.replace(old, new, 1))
PY
elif [[ -f "$FACTORY" ]]; then
  echo "  → tailwind config-factory already patched"
fi

DIALOG_TITLE="$REPO_ROOT/packages/falcon-ui/src/molecules/dialog/DialogTitle.tsx"
DIALOG_CONTENT="$REPO_ROOT/packages/falcon-ui/src/molecules/dialog/DialogContent.tsx"

if [[ -f "$DIALOG_TITLE" ]] && ! grep -q 'text-site-fg text-xl font-bold uppercase' "$DIALOG_TITLE"; then
  echo "  → patching DialogTitle for portal text color"
  sed -i '' "s/'font-body text-xl font-bold uppercase leading-none'/'font-body text-site-fg text-xl font-bold uppercase leading-none'/" "$DIALOG_TITLE"
elif [[ -f "$DIALOG_TITLE" ]]; then
  echo "  → DialogTitle already patched"
fi

if [[ -f "$DIALOG_CONTENT" ]] && ! grep -q 'bg-site-bg text-site-fg state-open' "$DIALOG_CONTENT"; then
  echo "  → patching DialogContent for portal text color"
  sed -i '' "s/'bg-site-bg state-open/'bg-site-bg text-site-fg state-open/" "$DIALOG_CONTENT"
elif [[ -f "$DIALOG_CONTENT" ]]; then
  echo "  → DialogContent already patched"
fi

echo "  → portfolio patches applied"

LAYOUT_BG="$REPO_ROOT/packages/interfaces/domain-manager/src/presentation/organisms/layoutBuilder/LayoutBackground.tsx"
MENU_FALLBACK="$REPO_ROOT/packages/interfaces/domain-manager/src/presentation/organisms/menuBuilder/MenuDataFallback.ts"

if [[ -f "$LAYOUT_BG" ]] && grep -q 'cherry.mocaworks.com' "$LAYOUT_BG"; then
  echo "  → patching LayoutBackground for local demo assets"
  python3 - "$LAYOUT_BG" <<'PY'
import sys
from pathlib import Path
path = Path(sys.argv[1])
text = path.read_text()
text = text.replace(
    "// TODO Plan make additional background options package",
    "// Portfolio demo: local presets in public/demo-assets/bg-images/",
    1,
)
replacements = [
    ("https://cherry.mocaworks.com/v2/domains/551/images/packages/bg-images/PrismBg1-black.jpg", "/demo-assets/bg-images/PrismBg1-black.jpg"),
    ("https://cherry.mocaworks.com/v2/domains/551/images/packages/bg-images/PrismBg1-white.jpg", "/demo-assets/bg-images/PrismBg1-white.jpg"),
    ("https://cherry.mocaworks.com/v2/domains/551/images/packages/bg-images/Purple_Top_Down.jpg", "/demo-assets/bg-images/Purple_Top_Down.jpg"),
    ("https://cherry.mocaworks.com/v2/domains/551/images/packages/bg-images/Blue_Top_Down.jpg", "/demo-assets/bg-images/Blue_Top_Down.jpg"),
    ("https://cherry.mocaworks.com/v2/domains/551/images/packages/bg-images/Red_Top_Down.jpg", "/demo-assets/bg-images/Red_Top_Down.jpg"),
    ("https://cherry.mocaworks.com/v2/domains/551/images/packages/bg-images/Tryyb_Back.jpg", "/demo-assets/bg-images/Tryyb_Back.jpg"),
]
for old, new in replacements:
    text = text.replace(old, new)
path.write_text(text)
PY
elif [[ -f "$LAYOUT_BG" ]]; then
  echo "  → LayoutBackground already uses local demo assets"
fi

if [[ -f "$MENU_FALLBACK" ]] && grep -q '/v2/domains/551/images/top-menu-icons/' "$MENU_FALLBACK"; then
  echo "  → patching MenuDataFallback for local demo assets"
  python3 - "$MENU_FALLBACK" <<'PY'
import sys
from pathlib import Path
path = Path(sys.argv[1])
text = path.read_text()
text = text.replace("/v2/domains/1825957/images/top-menu-icons/External Link.png", "/demo-assets/menu-icons/external-link.png")
text = text.replace("/v2/domains/551/images/top-menu-icons/small-icons/", "/demo-assets/menu-icons/small-icons/")
text = text.replace("/v2/domains/551/images/top-menu-icons/", "/demo-assets/menu-icons/")
path.write_text(text)
PY
elif [[ -f "$MENU_FALLBACK" ]]; then
  echo "  → MenuDataFallback already uses local demo assets"
fi

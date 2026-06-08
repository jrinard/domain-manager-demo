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

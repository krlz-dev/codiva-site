#!/usr/bin/env bash
# Capture a live site screenshot and optimize it to webp for the codiva portfolio.
#
# Usage (run from the codiva-site project root):
#   .claude/skills/adding-portfolio-items/scripts/capture.sh <url> <slug>
#
# Produces: public/portfolio/<slug>.webp  (~1200px wide, webp quality 82)
set -euo pipefail

URL="${1:-}"
SLUG="${2:-}"
if [[ -z "$URL" || -z "$SLUG" ]]; then
  echo "Usage: capture.sh <url> <slug>" >&2
  exit 1
fi

# Must run from the project root (needs the project's sharp install + public/portfolio).
if [[ ! -d node_modules/sharp ]]; then
  echo "Error: run this from the codiva-site project root (node_modules/sharp not found)." >&2
  exit 1
fi
mkdir -p public/portfolio

# Resolve a Chrome/Chromium binary.
CHROME=""
for c in google-chrome google-chrome-stable chromium chromium-browser chrome; do
  if command -v "$c" >/dev/null 2>&1; then CHROME="$c"; break; fi
done
if [[ -z "$CHROME" ]]; then
  echo "Error: no google-chrome/chromium binary found on PATH." >&2
  exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
PNG="$TMP/shot.png"

# Above-the-fold desktop capture; virtual-time-budget lets JS/render settle.
"$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1280,800 --virtual-time-budget=9000 \
  --screenshot="$PNG" "$URL" >/dev/null 2>&1 || true

if [[ ! -s "$PNG" ]]; then
  echo "Error: screenshot failed or empty for $URL" >&2
  exit 1
fi

OUT="public/portfolio/${SLUG}.webp"
node -e '
  const sharp = require("sharp");
  const fs = require("fs");
  const [src, out] = process.argv.slice(1);
  sharp(src).resize(1200).webp({ quality: 82 }).toFile(out)
    .then(() => {
      const kb = Math.round(fs.statSync(out).size / 1024);
      console.log("Wrote " + out + " (" + kb + " KB)");
    })
    .catch((e) => { console.error(e.message); process.exit(1); });
' "$PNG" "$OUT"

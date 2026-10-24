#!/usr/bin/env bash
# Regenerates the resume preview image shown in the popup on the Resume card.
# Run it whenever public/resume/Rohit-Kumar-Singh-Resume.pdf is replaced.
# Needs poppler (pdftoppm) and the project's sharp dependency.
set -euo pipefail
cd "$(dirname "$0")/.."
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
pdftoppm -r 170 -png -f 1 -l 1 public/resume/Rohit-Kumar-Singh-Resume.pdf "$tmp/page"
node -e "
const sharp = require('sharp');
const fs = require('fs');
const f = fs.readdirSync('$tmp').find((n) => n.endsWith('.png'));
sharp('$tmp/' + f).resize({ width: 1400 }).webp({ quality: 88 }).toFile('public/resume/preview.webp').then((i) => console.log('preview.webp', i.width + 'x' + i.height, Math.round(i.size / 1024) + 'KB'));
"

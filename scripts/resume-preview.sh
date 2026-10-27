#!/usr/bin/env bash
# Regenerates the slide images shown in the resume viewer (the Preview button on
# the Resume card) and the small JSON file the viewer reads. Run it whenever
# public/resume/Rohit-Kumar-Singh-Resume.pdf changes.
#
# The page is cut into slides along section boundaries. The numbers below are
# positions on the A4 page in points (595 x 842, measured from the top left); if
# the resume layout changes, adjust them and run the script again.
# Needs poppler (pdftoppm) and the project's sharp dependency.
set -euo pipefail
cd "$(dirname "$0")/.."

PDF=public/resume/Rohit-Kumar-Singh-Resume.pdf
X0=40; X1=556                    # left and right edge of the crop
# label | top | bottom
SLIDES='Summary|34|198
phData · Program delivery|198|361.5
phData · Clients, commercial and AI|361.5|515
British Telecom, skills and certifications|515|788'

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
pdftoppm -r 300 -png -f 1 -l 1 "$PDF" "$tmp/page"

SLIDES="$SLIDES" X0=$X0 X1=$X1 TMP="$tmp" node -e "
const sharp = require('sharp');
const fs = require('fs');
const f = fs.readdirSync(process.env.TMP).find((n) => n.endsWith('.png'));
const px = 300 / 72;
const x0 = +process.env.X0, x1 = +process.env.X1;
const rows = process.env.SLIDES.split('\n').map((l) => l.split('|'));
(async () => {
  const out = [];
  for (let i = 0; i < rows.length; i++) {
    const [label, top, bottom] = rows[i];
    const left = Math.round(x0 * px), width = Math.round((x1 - x0) * px);
    const t = Math.round(+top * px), height = Math.round((+bottom - +top) * px);
    const file = 'slide-' + (i + 1) + '.webp';
    const info = await sharp(process.env.TMP + '/' + f)
      .extract({ left, top: t, width, height })
      .resize({ width: 1800 })
      .webp({ quality: 86 })
      .toFile('public/resume/' + file);
    out.push({ src: '/resume/' + file, w: info.width, h: info.height, label });
    console.log(file, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB', label);
  }
  fs.writeFileSync('src/lib/resumeSlides.json', JSON.stringify(out, null, 2) + '\n');
})();
"

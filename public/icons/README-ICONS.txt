MICRORESET ICON REQUIREMENTS

Replace these placeholder files with your branded MicroReset icons:

Required Files:
- microreset-192.png (192x192px)
- microreset-512.png (512x512px)
- microreset-maskable.png (512x512px with safe zone)

Icon Design Guidelines:
- Use dark background (#0E1223) matching the theme
- Simple, recognizable symbol for micro-exercises/resets
- Consider: timer, refresh symbol, breathing indicator, movement symbol
- Ensure good contrast and visibility at small sizes

Maskable Icon Requirements:
- 512x512px canvas
- Keep important elements within center 70% (safe zone)
- Outer 15% may be cropped by OS

Tools to Create Icons:
- Figma or Adobe Illustrator for design
- Export as PNG at required sizes
- Use online tools like:
  - https://realfavicongenerator.net/
  - https://maskable.app/ (for testing maskable icons)

Quick Start:
1. Design your icon in SVG or vector format
2. Export at 512x512px
3. Resize for 192x192px variant
4. Create maskable version with safe zone padding
5. Replace the placeholder files in this directory

After replacing icons, update references in:
- manifest.json (already configured)
- index.html (already configured)

The app will automatically use your new icons after rebuild.

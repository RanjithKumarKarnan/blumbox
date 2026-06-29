# BlumBox — Single-Page Website

Built with plain HTML, CSS and JavaScript (no build step). Just open `index.html` in a browser or deploy the folder to any static host.

## Structure
```
index.html
assets/
  css/style.css      all styling (brand blue + orange, responsive, animations)
  js/script.js       slider, smooth scroll, scrollspy, WhatsApp enquiry, reveal
  images/logo.png    BlumBox logo
```

## Sections (single page, smooth-scroll nav)
Hero slider → Why Brands Choose BlumBox → Services → The Story Behind BlumBox → Quick Enquiry (WhatsApp) → "Not Every Creative Partner…" comparison table → Contact (form + Google Map) → Footer.

## Things to customise before going live
- **Hero & service images** — currently high-quality Unsplash placeholders. Replace the `background-image` URLs in `index.html` (hero slides) and the `--img` values on each service card with real BlumBox event photos. Drop your own files into `assets/images/` and point to them, e.g. `assets/images/hero-1.jpg`.
- **WhatsApp number** — set once in `assets/js/script.js` (`WHATSAPP_NUMBER`) and the `wa.me/60167296636` links in `index.html`. Currently `+60 16-729 6636`.
- **Google Map** — the embed points to Setia Tropika, Johor Bahru. Swap the iframe `src` and the Get Directions link for the exact office pin if needed.
- **Social links** — footer icons currently point to `#`; add the real Facebook / Instagram / TikTok / LinkedIn URLs.
- **Contact form** — submits by opening a pre-filled WhatsApp message. Connect to email/a backend later if you prefer server-side handling.

All animations respect `prefers-reduced-motion`, and the layout is fully responsive (desktop / tablet / mobile with hamburger menu).

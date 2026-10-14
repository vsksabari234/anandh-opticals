# Anand Opticals — Website

A premium, 3D-accented React + Vite website for **Anand Opticals** (ஆனந்த் ஆப்டிக்கல்ஸ்),
an optical store in Kallakurichi, Tamil Nadu.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build → dist/
```

## What's real vs. placeholder

- `src/data/business.js` — the confirmed business information (name, doctor, phone,
  address, services). Only edit this with verified details.
- `src/data/products.js` — **sample eyewear** for layout/demo purposes. Replace with
  real inventory (and add real photos) when available. No prices are shown because
  none were provided.
- Eyewear visuals are drawn with a local SVG component (`GlassesIllustration.jsx`)
  instead of stock photography, so the site never shows a broken image. Swap in real
  product photography by updating `ProductCard`, `ProductDetails`, and the hero.
- The Google Maps link on the Contact page is a search query built from the business
  name, not a confirmed pinned location — replace it with the real Maps link once
  available.
- Opening hours are intentionally not shown (`"Please call us for current opening
  hours."`) since none were confirmed.

## Structure

```
src/
  assets/            static assets (currently empty — add real photos here)
  components/        shared UI (Navbar, Footer, ProductCard, Forms, etc.)
  context/           StoreContext — cart & wishlist state (persisted to localStorage)
  data/              business.js (real info) + products.js (sample data)
  layouts/           MainLayout (navbar + footer wrapper)
  pages/             one file per route
  routes/            AppRoutes.jsx — all route definitions
  styles/            variables.css (design tokens), global.css, animations.css
```

## Notes for the next dev session

- Cart/wishlist currently have no backend — they persist per-browser via
  `localStorage`. Hook up a real backend by replacing the effects in
  `StoreContext.jsx`.
- The appointment and contact forms validate on the client and show a success
  state, but do not send data anywhere yet — wire up an API call inside
  `handleSubmit` in `AppointmentForm.jsx` / `ContactForm.jsx` when a backend exists.
- Tested at 320/375/390/430/768/1024/1440px breakpoints; no horizontal overflow.

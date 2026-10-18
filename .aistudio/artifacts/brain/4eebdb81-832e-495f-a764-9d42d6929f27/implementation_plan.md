# Floating Glassmorphic Pill Navbar with Interactive Dropdowns

## Overview & User Decisions

This plan outlines the architecture, visual design, and interactive states for modernizing the **Anand Opticals** navigation bar into a floating pill bar with glassmorphic depth, smooth hover dropdown menus, and dedicated pathways for clinical services and virtual styling.

### Confirmed User Decisions

> [!IMPORTANT]
> - **Navigation Layout**: Clean floating pill bar with glassmorphism blur, elevated above page content with smooth sticky positioning.
> - **Home Button Dropdown**: Hovering reveals an interactive dropdown with:
>   - **Clinic**: Quick navigation to the clinical examination suite and Zeiss/Essilor diagnostics.
>   - **About**: Brand heritage, 40+ years master optical craftsmanship story.
>   - **Contact**: Showroom addresses (Cathedral Rd, Anna Nagar, Kallakurichi) and WhatsApp direct line.
>   - **Book Appointment**: Instant modal trigger for comprehensive vision screening.
> - **Shop Button Dropdown**: Hovering reveals category-filtered pathways:
>   - **Sunglasses**: Designer sun shields, polarized shades, driving aviators (`/catalog?category=Sunglasses`).
>   - **Eyeglasses**: Handcrafted acetate, rimless titanium, vintage round (`/catalog?category=Eyeglasses`).
>   - **Lenses**: Zeiss DuraVision, Essilor Crizal blue-light & contact lenses (`/catalog?category=Prescription+Lenses`).
>   - **Accessories**: Leather hard cases, gold anti-fog care kits, microfiber cloths (`/catalog?category=Accessories`).
> - **Virtual Try-On**: Dedicated prominent 3rd navigation item linking straight to the AR 3D Virtual Try-On laboratory (`/vision-lab`).

---

## 1. User Experience & Visual Architecture

### A. Layout & Geometry

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ Floating Glass Pill (max-w-6xl mx-auto, rounded-full, backdrop-blur-xl, border-[#27272A]/70) │
├───────────────┬───────────────────────────────────────────────────────────────┬─────────────┤
│ Brand Logo    │ Nav Links with Hover Mega-Flyouts                             │ Action Hub  │
│ [Glasses Icon]│  • Home  ▾ (Clinic | About | Contact | Book Appointment)      │ [Search]    │
│  ANAND        │  • Shop  ▾ (Sunglasses | Eyeglasses | Lenses | Accessories)   │ [Account]   │
│  OPTICALS     │  • Virtual Try-On (Sparkle badge, direct to AR Lab)           │ [Wishlist]  │
│               │                                                               │ [Bag (count)│
└───────────────┴───────────────────────────────────────────────────────────────┴─────────────┘
```

- **Container Positioning**: `sticky top-4 z-50 px-4 sm:px-6`. The floating pill sits 16px below the top viewport edge on desktop, creating a refined floating effect with an obsidian glass background (`bg-[#090909]/85 backdrop-blur-xl border border-white/10 shadow-2xl`).
- **Single-Line Top Bar Contract**: Exactly 3 zones separated by `gap-6 lg:gap-8`:
  1. **Zone 1: Brand Wordmark** (Left): Elegant wireframe gold eyewear icon + `ANAND OPTICALS` display mark in `font-serif-luxury`.
  2. **Zone 2: Navigation Links & Dropdowns** (Center):
     - **Home** with subtle chevron icon. On hover, reveals a dropdown card with 4 sub-options, icon accents, and descriptions.
     - **Shop** with chevron icon. On hover, reveals a 4-category dropdown with direct deep-links into specific catalog filters.
     - **Virtual Try-On** with subtle gold sparkle glyph for instant visual distinction.
  3. **Zone 3: Utility Action Hub** (Right):
     - Expandable search toggle (opens floating search bar).
     - Customer Account / Login link with user avatar badge.
     - Saved Wishlist counter with live badge.
     - Cart shopping bag with gold badge count and drawer opening.
     - Mobile menu trigger toggle for small screens.

### B. Interactive Hover Dropdowns

#### 1. Home Flyout Menu
- **Trigger**: Hovering over "Home" button with 150ms exit delay (`pointer-events-auto`, smooth opacity/scale transition).
- **Items**:
  - `Clinic`: Icon + "Diagnostic Eye Suite & Zeiss Precision Refraction"
  - `About`: Icon + "Our Heritage & 40+ Years Optical Craftsmanship"
  - `Contact`: Icon + "Boutiques, Showrooms & WhatsApp Concierge"
  - `Book Appointment`: Highlighted card with gold accent to trigger `AppointmentModal`.

#### 2. Shop Flyout Menu
- **Trigger**: Hovering over "Shop" button.
- **Items**:
  - `Sunglasses`: UV400, polarized driving & luxury editorial shades.
  - `Eyeglasses`: Japanese titanium, Italian Mazzucchelli acetate & computer glasses.
  - `Lenses`: Single vision, progressive, blue-light blocking & contact lenses.
  - `Accessories`: Genuine leather cases, cleaning kits & luxury cords.

#### 3. Virtual Try-On
- Direct link with live route matching indicator (`/vision-lab`), highlighting when active with a champagne gold underline and glowing dot.

### C. Mobile Responsive Experience
- On viewports `< 768px`, the floating bar adapts gracefully with brand logo, quick cart trigger, and a sliding drawer menu containing expandable accordion sections for **Home** and **Shop**, plus direct buttons for **Virtual Try-On** and **Book Appointment**.

---

## 2. Technical Strategy & Component Architecture

### Component Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│                       App.jsx                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │                     Navbar                        │  │
│  │  ┌─────────────────┐ ┌───────────────┐ ┌────────┐ │  │
│  │  │  BrandWordmark  │ │ NavDropdowns  │ │ Action │ │  │
│  │  │  (Logo & Title) │ │ (Home, Shop,  │ │ Hub    │ │  │
│  │  │                 │ │  Try-On)      │ │        │ │  │
│  │  └─────────────────┘ └───────────────┘ └────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │          AppointmentModal / CartDrawer            │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### State & Handler Mapping
- `activeDropdown`: `'home' | 'shop' | null` managed via mouse-enter and mouse-leave with debounced timeout to prevent jitter.
- `mobileMenuOpen`: Boolean state controlling the slide-down mobile glass drawer.
- `searchOpen`: Expandable inline search input that seamlessly redirects to `/catalog?search=...`.
- `isAppointmentModalOpen`: Directly connects with the global modal or context to open the optometrist booking interface when clicked from the dropdown.

---

## 3. Implementation Steps

1. **Refactor `src/components/Navbar.jsx`**:
   - Convert outer container into a floating pill with `sticky top-3.5 z-50 max-w-6xl mx-auto px-4`.
   - Apply deep obsidian glassmorphism (`bg-[#090909]/85 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full`).
   - Implement structured hover state handlers for **Home** and **Shop** with smooth CSS animations (`animate-fade-in` and `transform scale-95 -> scale-100`).
   - Wire each dropdown item to the exact corresponding route, hash anchor, or booking modal action.
   - Retain full functionality for Search, Wishlist, Cart Drawer, and User Account.
2. **Mobile Drawer Enhancements**:
   - Provide clean accordion collapses for Home and Shop sub-links with touch-optimized targets ($\ge 44\text{px}$).
3. **Verification**:
   - Run `compile_applet` and test desktop hover states, keyboard navigation, and mobile menu transitions.

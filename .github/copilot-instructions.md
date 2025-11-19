# Copilot Instructions for Messu Bouw Website

## Project Overview
This is a **multilingual React + TypeScript SPA** for Messu Bouw, a Dutch construction company specializing in wood rot repair (houtrotherstel) and property maintenance. The site uses **Vite**, **React Router**, **Framer Motion**, and **TailwindCSS via CDN** (not PostCSS).

**Key Business Context:** The company targets both private homeowners and commercial clients (VvE/property managers) across 9 languages (NL, EN, TR, PL, BG, AR, DE, HU, FR) with RTL support for Arabic.

## Architecture & Organization

### Routing Pattern
- Uses `HashRouter` (not `BrowserRouter`) - all routes prefixed with `#/`
- Main routes defined in `App.tsx`: `/`, `/diensten`, `/houtrotherstel`, `/timmerwerk`, `/gevelwerk`, `/renovatie`, `/inspecties`, `/projecten`, `/over-ons`, `/contact`
- Each route maps to a page component in `pages/`

### Translation System
**Critical:** This project uses a **custom i18n system** (not react-i18next).

- **Context:** `LanguageContext.tsx` provides `{ t, language, setLanguage, dir }`
- **Hook:** Use `const { t } = useLanguage()` in components
- **Translation keys:** Dot-notation strings like `t('nav.home')` or `t('houtrot_page.title')`
- **All translations:** Stored in `services/translations.ts` as a nested object per language
- **Fallback:** If key missing in selected language, falls back to Dutch (`Language.NL`)
- **RTL:** Arabic (`Language.AR`) automatically sets `dir="rtl"` on `<html>`
- **Persistence:** Selected language saved to `localStorage` as `messu-lang`

**When adding new text:** Always add translation keys for ALL 9 languages in `translations.ts` before using `t()`.

### Styling Approach
- **No PostCSS/Tailwind build** - uses Tailwind CDN loaded in `index.html`
- **Custom theme** extended in `index.html` `<script>` tag (colors: `navy-*`, `copper-*`, `gold-*`)
- **Utility-first:** Classes like `bg-navy-950`, `text-slate-400`, `hover:border-copper-500/30`
- **3D effects:** Extensive use of `perspective-1000`, `preserve-3d`, `rotateY`, `translateZ` for depth
- **Animations:** Framer Motion for page transitions, hover states, and scroll effects
- **Responsive:** Mobile-first with `md:` and `lg:` breakpoints

**Pattern:** Most sections use dark navy backgrounds (`bg-navy-950`, `bg-navy-900`) with copper/gold accents.

### Component Patterns

#### Reusable Components (in `components/`)
- **`Header.tsx`:** Sticky nav with dropdown menus, language selector (flags), mobile menu, and `ContactModal` trigger
- **`Footer.tsx`:** Multi-section footer with links, certifications, contact info
- **`BeforeAfterSlider.tsx`:** Interactive slider showing before/after project images (drag slider to reveal)
- **`ContactModal.tsx`:** Modal form for urgent contact requests
- **`PlanActionModal.tsx`:** Modal for scheduling consultations
- **`ServiceContactForm.tsx`:** Embedded contact form for service pages

#### Page Structure (in `pages/`)
Each service page (`ServiceHoutrot.tsx`, `ServiceTimmerwerk.tsx`, etc.) follows this pattern:
1. Hero section with background image overlay, title, subtitle (from translations)
2. Intro text section
3. Service cards grid (3 columns on desktop)
4. Process steps or detailed sections
5. Sidebar with "Spoed?" (urgent) CTA linking to contact

**Example service card hover effect:**
```tsx
className="group hover:border-copper-500/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]"
```

### Data Flow
- **No backend/API** - all content is static from `translations.ts`
- **Types:** Central type definitions in `types.ts` (e.g., `Language`, `Project`, `ServiceStep`, `FAQItem`)
- **Projects data:** Currently embedded in component state (consider moving to `translations.ts` for i18n)

## Development Workflow

### Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build
npm run preview      # Preview production build
```

### Environment Variables
- **Optional:** `GEMINI_API_KEY` in `.env.local` (loaded via Vite, exposed as `process.env.GEMINI_API_KEY`)
- Currently not actively used in the codebase

### Key Dependencies
- **React 19.2** + **React Router 7.9**
- **Framer Motion 12.23** - for animations (`motion.*`, `AnimatePresence`, `useScroll`)
- **Lucide React 0.554** - icon library (e.g., `Shield`, `Hammer`, `Phone`)
- **TypeScript 5.8** with strict mode

## Common Tasks

### Adding a New Page
1. Create component in `pages/NewPage.tsx`
2. Add route in `App.tsx`: `<Route path="/new-page" element={<NewPage />} />`
3. Add nav item to `Header.tsx` (if needed in nav)
4. Add translation keys to `translations.ts` for all 9 languages

### Adding Translations
In `services/translations.ts`:
```typescript
[Language.NL]: { section: { key: 'Dutch text' } },
[Language.EN]: { section: { key: 'English text' } },
// ... repeat for all 9 languages
```

### Creating Animated Cards
Use this pattern for hover-reactive service cards:
```tsx
<motion.div 
  whileHover={{ scale: 1.02 }}
  className="group bg-white/5 border border-white/5 hover:border-copper-500/30 
             hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] transition-all"
>
  <Icon className="text-copper-500 group-hover:text-white" />
</motion.div>
```

## Gotchas & Conventions
- **Don't use `BrowserRouter`** - routing relies on HashRouter for static hosting compatibility
- **Don't install Tailwind via npm** - it's CDN-based; extend theme in `index.html`
- **Always use `t()` for text** - never hardcode Dutch/English strings in components
- **Import order:** React, external libs, components, hooks, types
- **File naming:** PascalCase for components (`Header.tsx`), camelCase for utilities (`translations.ts`)
- **3D transforms:** Remember to set `perspective-1000` on parent and `preserve-3d` on animated element

## AI Studio Integration
This project was originally built via Google AI Studio (see README link). The `metadata.json` file is for AI Studio tracking only - not used in the app runtime.

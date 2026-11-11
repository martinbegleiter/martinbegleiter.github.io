# Code Review & Repository Analysis Report

**Project:** Martin Begleiter // Professional Sentinel Portfolio  
**Repository:** `martinbegleiter/personal-page`  
**Reviewed commit:** `1ead6d1` (`master`)  
**Review date:** 2026-11-02  
**Review scope:** Full source tree, configuration, build output, dependency health

---

## Executive Summary

This is a cleanly structured Svelte 5 / SvelteKit portfolio with a consistent "Professional Sentinel" visual identity, route-based localization for English, Swedish, and Polish, and a static build aimed at GitHub Pages.

The codebase is in good shape architecturally: TypeScript strict mode passes with **0 errors and 0 warnings**, the production build succeeds, and the component/data separation is easy to follow. The main problems are not compile-time issues; they are **incomplete or misconfigured features**:

1. **The blog cannot work in its current form** — the post directory does not exist, the slug route is explicitly excluded from prerendering, and its variable dynamic import cannot be bundled.
2. **GitHub Pages deployment will likely break at the configured subpath** — `paths.base` is empty while links/assets use root-absolute URLs, and this is a project site (`/personal-page/`).
3. **The contact form is a stub that reports success without sending anything**, and its inputs have no `name` attributes.
4. **The bento grid layout does not apply its intended spans** because `gridSize` is on the card inside a `ScrollReveal` wrapper that is the actual grid child.
5. **SEO and i18n metadata are incomplete** — every prerendered page has `<html lang="en">`, no description/canonical/hreflang/OG tags, and the blog list has no `<title>`.
6. **Performance is undermined by a 3.7 MB PNG favicon** (plus an unused 4 MB PNG), despite an SVG favicon already existing.

There are also meaningful accessibility, maintainability, and documentation-drift issues. None of the current issues prevent the site from building, and the existing home page is largely functional, but the blog, contact flow, and deployment need attention before the site can be considered finished.

---

## 1. Project Overview

| Area | Details |
|---|---|
| Framework | SvelteKit `2.70.2` with Svelte `5.56.8` (runes mode) |
| Styling | Tailwind CSS `4.3.3` via `@tailwindcss/vite` |
| Content | `mdsvex` `0.12.8` for Markdown blog content |
| Language | TypeScript `6.0.3`, strict mode |
| Adapter | `@sveltejs/adapter-static` `3.0.10` |
| Deployment | GitHub Actions → GitHub Pages (`deploy-pages@v4`) |
| Locales | `en`, `sv`, `pl`; default `en` |
| Routes | `/`, `/[lang]`, `/[lang]/blog`, `/[lang]/blog/[slug]` |
| Build output | `build/`; prerendered HTML + `404.html` fallback |
| Source size | ~3,100 lines across 42 `.svelte`/`.ts`/`.css` files |

### Verification performed

| Check | Result |
|---|---|
| `npm run check` (`svelte-kit sync && svelte-check`) | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ Build succeeds; static output written to `build/` |
| `npm audit` | ⚠️ 8 vulnerabilities: 5 low, 3 high (mostly dev/build tooling) |
| Production preview (`vite preview`) | ✅ `/`, `/en`, `/sv`, `/pl`, `/en/blog` return 200 |

---

## 2. Architecture

### Routing and localization

- `/` is a prerendered loading page that redirects on mount using:
  1. `localStorage` preference,
  2. browser language (`navigator.languages`),
  3. default `en`.
- `/[lang]/+layout.ts` validates the locale and throws a 404 for invalid values.
- `/[lang]/+page.ts` supplies `entries()` for all three locales, so each home page is prerendered.
- `LanguageSwitcher` replaces the locale prefix and preserves the current path/hash.
- Dictionaries are strongly typed by a shared `Dictionary` interface in `src/lib/i18n/dictionaries/index.ts`.

### Component architecture

The project follows a sensible container/leaf split:

- **Containers:** `HeroSection`, `ExpertiseGrid`, `Timeline`, `ContactSection`, `NavBar`.
- **Leaves:** `BentoCard`, `TimelineItem`, `NavLink`, `Button`, `Tag`, `SectionHeader`, `ScrollReveal`, etc.
- Content is passed from localized data modules into leaf components via props.
- All three locale datasets use the same item IDs, so translations are structurally consistent.

### Data flow

```
expertise.ts / timeline.ts (Record<Locale, Item[]>)
        ↓
ExpertiseGrid / Timeline (selects by locale from page URL)
        ↓
BentoCard / TimelineItem (props)
```

There are also `expertise.json` and `timeline.json` files, but **no component imports them**. They appear to be stale placeholders from an earlier phase.

---

## 3. Findings by Severity

## Critical (P0)

### C1. The blog post route is non-functional

**Evidence:**

- `src/lib/utils/posts.ts:8` globs `'/src/lib/content/posts/*/*.md'`.
- `src/routes/[lang]/blog/[slug]/+page.ts:19` imports `../../../../lib/content/posts/${params.lang}/${params.slug}.md`.
- **Neither `src/lib/content/posts/` nor any Markdown post exists.** The only blog-related directory is the empty `src/lib/content/blog/` (contains only `.gitkeep`).
- `src/routes/[lang]/blog/[slug]/+page.ts:33` sets `prerender = false`, with a comment saying to remove it when posts are added.
- The built client chunk confirms the import was compiled to an "Unknown variable dynamic import" fallback, because Vite cannot bundle a fully variable dynamic import. Even after adding posts, this route will still fail unless the loading strategy changes.
- `BlogCard.svelte:16` adds `data-sveltekit-reload`, forcing a full page reload for every post click — likely a workaround for the broken route.

**Impact:** `/en/blog` always shows the empty state, and no post can ever be opened. The README advertises a working Markdown blog.

**Recommended fix:**

- Create `src/lib/content/posts/{en,sv,pl}/` and add Markdown posts.
- Replace the runtime dynamic import with a build-time map from `import.meta.glob`, e.g. a slug → loader map per locale.
- Set `prerender = true` on the slug route and keep `entries()` generating all locale/slug pairs.
- Remove `data-sveltekit-reload` from `BlogCard`.
- Add `@tailwindcss/typography` or replace the inert `prose-*` classes with custom CSS (see M8).

---

### C2. GitHub Pages base path is likely misconfigured

**Evidence:**

- Remote is `git@github.com:martinbegleiter/personal-page.git`; there is no `CNAME` file.
- A repository named `personal-page` is normally served at `https://martinbegleiter.github.io/personal-page/` unless a custom domain is configured in repository settings.
- `svelte.config.js:19` sets `base: ''`.
- Raw internal URLs are root-absolute:
  - `src/lib/components/hero/HeroImage.svelte` uses `/images/profile/...`
  - `Footer.svelte` and `ContactSection.svelte` use `/images/...`
  - `NavBar`, `BlogCard`, and page links use `/${lang}/...`
  - The built HTML references `/_app/...` for the favicon.
- `PROJECT_PROGRESS.md` itself says the expected GitHub Pages base path is `/personal-page`, contradicting the config.

**Impact:** If the site is deployed at the project subpath, navigation, images, and the favicon will point to the domain root and 404. JavaScript/CSS may still load because SvelteKit emits relative paths for some assets, which can mask the problem during a quick check.

**Recommended fix:**

- Set `paths.base` from an environment variable, e.g. `process.env.BASE_PATH ?? ''`.
- Use `base` from `$app/paths` for all raw `href`/`src` values in components.
- Test the production build under `/personal-page/` (or deploy to a user site/custom domain).
- Confirm whether a custom domain is actually configured; if so, document it.

---

### C3. Contact form simulates success without sending data

**Evidence:**

- `src/lib/components/contact/ContactForm.svelte:18-23`:
  - `e.preventDefault()`
  - `emailSent = true`
  - reset after 5 seconds
  - comment: "In a real implementation, this would connect to Formspree/EmailJS"
- Inputs have no `name` attributes, no `action`, and no submit endpoint.
- The success UI claims the message was "encrypted and sent."

**Impact:** Users can believe they contacted the owner when no message was sent. This is both a functional and trust issue.

**Recommended fix:**

- Integrate a real endpoint (Formspree, EmailJS, or a serverless function), or
- Remove the fake success state and mark the form as unavailable, and
- Add `name`, `autocomplete`, error handling, and an `aria-live` status region regardless.

---

## High (P1)

### H1. Bento grid spans are ignored

**Evidence:**

- `ExpertiseGrid.svelte:21-24` renders:
  ```svelte
  <div class="grid ... lg:grid-cols-4">
    {#each items as item, i}
      <ScrollReveal ...>
        <BentoCard {...item} />
      </ScrollReveal>
    {/each}
  </div>
  ```
- `gridSize` (`md:col-span-2`, `md:row-span-2`) is applied inside `BentoCard.svelte:30`, but the grid child is the outer `ScrollReveal` `<div>`, not the card.
- `BentoCard` also has no `h-full`, so even if spans were moved, cards may not fill multi-row cells.

**Impact:** The intended asymmetric bento layout collapses to uniform single cells. The visual design does not match the data or the design intent.

**Recommended fix:**

- Pass the span classes to `ScrollReveal` via its existing `class` prop, and add `h-full` to the card.

---

### H2. Scroll-revealed content is invisible without JavaScript

**Evidence:**

- `ScrollReveal.svelte:52` renders `style="... opacity: {isVisible ? 1 : 0}"`.
- `isVisible` starts `false` and is only set by `IntersectionObserver` in `onMount`.
- The wrapper is used around the expertise grid, timeline, and contact section.

**Impact:** With JavaScript disabled, blocked, or failing, the majority of the home page is permanently invisible. This is also a robustness and SEO risk.

**Recommended fix:**

- Render content visible by default and only hide it after client-side hydration (e.g. add a `js` class to `<html>`).
- Provide a no-JS fallback, or use CSS-only reveal animations.

---

### H3. SEO and language metadata are incomplete

**Evidence:**

- `src/app.html:2` hardcodes `<html lang="en">`.
- `[lang]/+layout.svelte:15` updates `document.documentElement.lang` only after hydration.
- Built output confirms:
  - `build/en.html` → `<html lang="en">`
  - `build/sv.html` → `<html lang="en">`
  - `build/pl.html` → `<html lang="en">`
- No `meta name="description"`, canonical, hreflang, Open Graph, or Twitter card tags.
- All three home pages use the same English title `MARTIN BEGLEITER // Portfolio`.
- `build/en/blog.html` contains **no `<title>` at all**.
- No sitemap is generated.

**Impact:** Search engines and screen readers get the wrong document language for Swedish/Polish pages, social sharing previews are poor, and the blog list has weak metadata.

**Recommended fix:**

- Set the correct `<html lang>` at render time (for example with a `transformPageChunk` hook or a per-locale shell).
- Add localized titles/descriptions, canonical + hreflang alternates, and OG/Twitter tags.
- Add a `<title>` to the blog list page.
- Generate `sitemap.xml`.

---

### H4. Favicon/logo PNG is 3.7 MB, plus an unused 4 MB file

**Evidence:**

- `src/lib/assets/martin_favicon_hair.png`: 2048×2048, **3.7 MB**, imported as favicon and nav logo.
- `src/lib/assets/martin_favicon_fixed.png`: 2048×2048, **4.0 MB**, unreferenced.
- `src/lib/assets/favicon.svg` exists but is unused.
- Build output is ~4.5 MB; the favicon asset alone is 3.7 MB.
- The same 2048×2048 image is displayed at 24–32 px.

**Impact:** This is the single largest performance problem on the site. It hurts first load, wastes bandwidth/memory, and is especially costly on mobile.

**Recommended fix:**

- Use the SVG favicon for browsers that support it, plus small 32×32/180×180 PNG fallbacks.
- Use a separate, optimized logo image for the navbar.
- Remove the unused 4 MB PNG (or move large originals out of the repo).

---

### H5. All timeline entries are rendered as active

**Evidence:**

- `src/lib/components/timeline/Timeline.svelte:26` passes `status="active"` after spreading every item:
  ```svelte
  <TimelineItem {...item} status="active" />
  ```
- The data correctly contains both `'active'` and `'completed'` values, including education entries from 1996–2002.

**Impact:** Completed history is visually presented as current, and the `status` field is effectively ignored.

**Recommended fix:** Use `status={item.status}` (or remove the override) and let the data drive the visual state.

---

### H6. Footer and contact links point to different profiles

**Evidence:**

- `Footer.svelte:15` → `https://github.com/begleiter`
- `Footer.svelte:24` → `https://linkedin.com/in/mbegleiter`
- `[lang]/+page.svelte:22-23` → `https://www.linkedin.com/in/martin-begleiter-56a0b010/` and `https://github.com/martinbegleiter`
- README references `github.com/martinbegleiter`.

**Impact:** Visitors can be sent to the wrong or non-existent profiles depending on which link they click.

**Recommended fix:** Centralize email/social URLs in one config module and consume it in both the footer and contact section.

---

### H7. Blog prose styles are inert

**Evidence:**

- `[lang]/blog/[slug]/+page.svelte:38-43` uses `prose`, `prose-invert`, `prose-yellow`, and many `prose-*` variants.
- `@tailwindcss/typography` is **not** in `package.json` or `package-lock.json`.
- The built CSS contains no `.prose` rules.

**Impact:** Blog article content will render unstyled/without typographic spacing even once posts exist.

**Recommended fix:** Install `@tailwindcss/typography` and register it with Tailwind v4, or replace the `prose-*` classes with explicit component styles.

---

## Medium (P2)

### M1. Active-section tracking breaks after client-side navigation

`NavBar.svelte` sets up its `IntersectionObserver` in `onMount`. `NavBar` lives in `[lang]/+layout.svelte`, which persists across `/en` → `/en/blog` → `/en` client-side navigation. When the home sections are destroyed and re-created, `onMount` does not run again, so the observer keeps watching detached nodes and active-section highlighting stops updating. Re-initialize on route change (e.g. `$effect` keyed on `page.url.pathname`) or use a Svelte action.

### M2. Visiting a localized page overwrites the saved language preference

`[lang]/+layout.svelte:17` writes `localStorage[STORAGE_KEY] = data.lang` on every locale page visit, not just when the user switches language. A user who prefers `sv` but opens a shared `/en` link will have their preference silently changed to `en`. Persist only in `LanguageSwitcher`, or only when no preference exists.

### M3. Unused JSON data and stale documentation

- `expertise.json` and `timeline.json` are not imported anywhere; the `.ts` modules are the real source of truth.
- `README.md` says posts live in `src/lib/content/posts/`, which does not exist.
- `PROJECT_PROGRESS.md` and `SYSTEM_ARCHITECTURE.md` still describe Tailwind v3, while the project uses v4.
- `PROJECT_PROGRESS.md` shows many completed phases as unchecked.
- There is an empty `src/lib/content/blog/` directory that adds no value.

This is manageable now but will confuse the next maintainer.

### M4. Accessibility gaps

- Material Symbols icons are text ligatures and are not `aria-hidden`; screen readers can announce "terminal", "security", "work", "school", "check_circle", "menu", etc.
- Mobile menu button lacks `aria-expanded` / `aria-controls`; no Escape handling, focus trap, or focus restoration.
- `NavLink` does not expose `aria-current`.
- Form success/error state has no `role="status"` or `aria-live`.
- Form inputs lack `autocomplete` and `name`.
- Blog list page has no `<h1>` (it starts with `SectionHeader`'s `<h2>`).
- Very low-opacity text (`text-white/30`, `placeholder:text-white/20`) at 8–10 px is likely below WCAG AA contrast and hard to read.
- No skip-to-content link.
- `prefers-reduced-motion` disables CSS animation/transition durations but not the terminal typing timer or smooth `scrollTo`.

### M5. No tests, linting, formatting, or CI quality gate

- No unit, component, or end-to-end tests.
- No ESLint/Prettier configuration or `lint`/`format` scripts.
- The GitHub Actions workflow runs `npm ci` and `npm run build` only; `npm run check` is not part of CI, so type errors can be deployed.

### M6. `published` field is defined but ignored

`Post.published?: boolean` exists, but `getPosts` never filters on it. Any draft post added to the content directory will appear publicly. Filter with `metadata.published !== false` (or an explicit opt-in).

### M7. Terminal animation can cause layout shift

`TerminalBlock.svelte` appends lines every 800 ms, growing the hero block after first paint. This can shift content below it and hurt CLS. Reserve the final height or animate within a fixed-size container.

### M8. Tailwind `prose` plugin is missing

See H7. This is listed separately because it is both a blog bug and a styling dependency gap.

### M9. All three locales are bundled for every visitor

`expertise.ts` and `timeline.ts` import all three locale arrays at module scope, and `ExpertiseGrid`/`Timeline` select the current one at runtime. The built home-page node is ~69 KB raw / ~20.7 KB gzip and contains Polish/Swedish strings for all locales. Not critical at this content size, but it scales poorly. Consider per-locale dynamic imports if the data grows.

---

## Low (P3)

### L1. Invalid Tailwind duration class

`src/routes/layout.css:122` uses `duration-400`. Tailwind's default duration scale does not include 400, and the built CSS contains no `duration-400` rule, so the intended 400 ms bento transition falls back to the default duration. Use `duration-[400ms]` or a standard value.

### L2. Unused and oversized assets

- `martin_favicon_fixed.png` (4 MB) is unused.
- `favicon.svg` is unused.
- `static/images/profile/me-stylized.jpg` is unused; only `me-stylized-accent.jpg` is referenced.
- Empty `static/images/blog/` and `static/images/expertise/` directories add noise.

### L3. Remote dependencies and privacy

- Google Fonts (Space Grotesk and Material Symbols) are loaded with CSS `@import`, which is render-blocking and discloses visitor IPs to Google.
- `HeroImage.svelte` contains a long remote `googleusercontent.com` fallback URL; it is unused today but should be removed or replaced with a local placeholder.
- Self-hosting fonts/icons would improve performance, privacy, and reliability.

### L4. Missing project metadata and license file

- README says MIT, but there is no `LICENSE` file and no `license` field in `package.json`.
- No `engines` field, even though `.npmrc` sets `engine-strict=true` (which has no effect without `engines`).
- No `packageManager` or `.nvmrc`; CI uses Node 24 while local is Node 26.

### L5. Missing branded error page

There is no `src/routes/+error.svelte`; the static `404.html` is the SPA fallback, so unknown routes get SvelteKit's default error UI rather than the sentinel theme. Phase 11 lists this as pending.

### L6. Hardcoded English strings remain in localized UI

Examples: `UPLINK_MESSAGE_FIELD` in `ContactForm`, `SESSION_ESTABLISHED // SOURCE: SECURE_UPLINK` in `HeroText`, footer labels (`GITHUB`, `LINKEDIN`, `SYSTEM_UPTIME`), `TRANS_ID` in the post page, and section prefixes. Some may be intentional terminal flavor, but the contact form and error/status text should be in the dictionaries.

### L7. Locale redirect edge cases

- `src/routes/+page.svelte` accesses `window.localStorage` outside the `try` inside `localeFromStorage`; a SecurityError on property access is not caught.
- `localeFromNavigator` never returns `null`, so the final `?? defaultLocale` is redundant.
- The root page shows a loading screen to crawlers/no-JS users instead of real content (the noscript links help, but there is no server-side language negotiation on static hosting).

### L8. Minor code hygiene

- `BentoCard` accepts `stats` and data supplies it, but it is never rendered.
- `ContactForm` accepts `email`/`linkedin`/`github` props but does not use them.
- `src/lib/index.ts` is an empty placeholder.
- Several `@theme` letter-spacing tokens use a `--letter-spacing-*` namespace that does not map to Tailwind's `--tracking-*` utilities and appears unused.
- `BlogCard` formats dates with `new Date('YYYY-MM-DD')`, which is parsed as UTC and can display the previous day in negative time zones.

---

## 4. Security Review

### Positive

- No secrets, API keys, or environment files are committed.
- External links consistently use `rel="noopener noreferrer"`.
- Markdown is rendered as a component; no `{@html}` usage was found.
- Content is trusted and local, so the mdsvex surface is low risk.

### Concerns

- `npm audit` reports **8 vulnerabilities (5 low, 3 high)**, including advisories in `vite`, `devalue`, `@sveltejs/kit`, `cookie`, and `source-map-js`.
  - Several are dev/build-time only, which reduces exposure for a static site.
  - Still, `@sveltejs/kit` advisories include XSS via cache-control in prerendered pages and redirect issues; review and upgrade when compatible.
  - `npm audit fix` resolves some; a major-version upgrade may be required for others.
- The fake contact form success is not a security vulnerability, but it is a trust/UX issue.
- No CSP is configured (difficult on GitHub Pages without a proxy), and third-party Google Fonts are loaded directly.

---

## 5. Performance Review

### Strengths

- Static prerendering with minimal client JavaScript.
- CSS is ~49 KB raw / ~8.6 KB gzip.
- Largest client page node is ~69 KB raw / ~20.7 KB gzip.
- Hero image uses `loading="eager"` and `decoding="async"` appropriately.
- Images are reasonably sized (~96 KB JPEGs) apart from the favicon problem.

### Issues

1. **3.7 MB favicon/logo** is the dominant cost; see H4.
2. **Google Fonts @import** blocks rendering and loads a full Material Symbols font for ~10 icons.
3. **All locale content is bundled**, including unused translations.
4. **No responsive image variants** (`srcset`/`sizes`) for the profile image.
5. **Terminal animation adds CLS**; see M7.
6. **No preload/preconnect** for critical fonts or the hero image.
7. Build is ~4.5 MB total, mostly the oversized PNG.

---

## 6. Accessibility Review

### What is already good

- Semantic landmarks: `header`, `main`, `nav`, `footer`, `section`.
- Focus-visible ring styles defined globally.
- Labels exist for form fields (visually hidden).
- `prefers-reduced-motion` handling for CSS animations.
- Language switcher exposes `aria-current`.
- External image alt text is present.
- Decorative background effects are `pointer-events-none`.

### What needs work

- Incorrect `<html lang>` for non-English pages (H3).
- No-JS invisibility of major sections (H2).
- Icon ligatures announced by screen readers (M4).
- Mobile menu lacks expanded state, keyboard dismissal, and focus management (M4).
- Form status is not announced; inputs lack `autocomplete`/`name` (M4).
- Blog list lacks an `<h1>` (M4).
- Low-contrast, very small text in the footer and placeholders (M4).
- No automated accessibility check in CI (M5).

The README's claim of "WCAG 2.1 AA compliant" is not currently supported by an audit and is unlikely to hold with the issues above.

---

## 7. Maintainability & Documentation

- **Strong:** consistent naming, typed props, localized data keyed by `Locale`, clear component boundaries.
- **Weak:** duplicate sources of truth (JSON vs TS, contact data in page + footer), stale planning docs, no tests, no lint/format pipeline, no CI type check.
- The data modules are large (382 and 693 lines) but readable; splitting per locale would reduce merge conflicts if translations are edited frequently.
- `PROJECT_PROGRESS.md` and `SYSTEM_ARCHITECTURE.md` describe an older Tailwind v3 plan; they should be updated or archived so they do not mislead.
- The five `feat_*.md` planning documents are useful history but not linked from the README.

---

## 8. Recommended Action Plan

### P0 — Before calling the site complete

1. **Fix or hide the blog.**
   - Add `src/lib/content/posts/{en,sv,pl}/`.
   - Replace the variable dynamic import with `import.meta.glob`.
   - Enable prerendering, keep `entries()`, remove `data-sveltekit-reload`.
   - Add typography styling.
   - Filter drafts via `published`.

2. **Fix the GitHub Pages base path.**
   - Set `paths.base` from an env var.
   - Replace raw `/images/...` and `/${lang}/...` URLs with base-aware helpers.
   - Test the built site under `/personal-page/`.

3. **Wire the contact form to a real service** (or clearly disable it) and add `name`/`autocomplete`/`aria-live`.

### P1 — Important quality fixes

4. Move bento span classes to the `ScrollReveal` wrapper and add `h-full` to cards; render or remove `stats`.
5. Make scroll-revealed content visible without JavaScript.
6. Render correct `<html lang>` server-side and add localized SEO metadata.
7. Use a small SVG/PNG favicon and remove the unused 4 MB asset.
8. Drive timeline status from data.
9. Centralize social/contact URLs.
10. Install `@tailwindcss/typography` or replace the prose classes.

### P2 — Robustness and accessibility

11. Re-initialize the nav observer on route changes.
12. Do not overwrite the saved language preference on ordinary visits.
13. Remove or repurpose the unused JSON files; update README/progress/architecture docs.
14. Add `aria-hidden` to decorative icons, `aria-expanded`/Escape/focus management to the mobile menu, `aria-current` to nav links, and `aria-live` to form status.
15. Add a skip link and fix low-contrast/small text.
16. Add a lint/format setup and run `npm run check` in CI.
17. Add basic tests for `localeFromPathname`, `getPosts`, and the locale redirect.
18. Address `npm audit` findings.
19. Reserve terminal height to avoid CLS.
20. Add a branded `+error.svelte`, a sitemap, and OG/Twitter metadata.

### P3 — Polish

21. Fix `duration-400`.
22. Remove unused assets (`favicon_fixed.png`, `favicon.svg`, `me-stylized.jpg`, empty image directories).
23. Self-host fonts/icons or at least add preconnect and remove the remote fallback image.
24. Add `LICENSE`, `engines`, `packageManager`, and `.nvmrc`.
25. Localize remaining hardcoded UI strings.
26. Revisit date formatting to avoid timezone off-by-one.
27. Consider per-locale code splitting if content grows.

---

## 9. Positive Observations

- The visual system is coherent and distinctive: tonal surfaces, lemon-yellow accent, monospace labels, and restrained glows.
- Svelte 5 runes are used consistently; no legacy store patterns.
- TypeScript strict mode and `svelte-check` pass cleanly.
- The component split is pragmatic and easy to navigate.
- Localization is structurally complete: all 10 expertise items and 14 timeline items exist in all three languages with matching IDs.
- `Record<Locale, ...>` ensures missing locales are caught at compile time.
- Build and deployment automation are already in place with least-privilege Pages permissions and concurrency control.
- Reduced-motion CSS support and focus-visible styles show attention to accessibility.

---

## Appendix A — Key Files

| File | Purpose |
|---|---|
| `svelte.config.js` | Static adapter, mdsvex, base path |
| `vite.config.ts` | Tailwind + SvelteKit plugins |
| `src/app.html` | HTML shell (`lang="en"` hardcoded) |
| `src/routes/+layout.ts` | `prerender = true`, `trailingSlash = 'never'` |
| `src/routes/+page.svelte` | Client-side locale redirect |
| `src/routes/[lang]/+layout.svelte` | Locale persistence + nav/footer shell |
| `src/routes/[lang]/+page.svelte` | Home composition |
| `src/routes/[lang]/blog/+page.svelte` | Blog list |
| `src/routes/[lang]/blog/[slug]/+page.ts` | Blog post loader (`prerender = false`) |
| `src/lib/content/data/expertise.ts` | Localized expertise data |
| `src/lib/content/data/timeline.ts` | Localized timeline data |
| `src/lib/utils/posts.ts` | Post discovery via eager glob |
| `src/lib/components/expertise/ExpertiseGrid.svelte` | Bento grid container |
| `src/lib/components/expertise/BentoCard.svelte` | Bento card leaf |
| `src/lib/components/timeline/Timeline.svelte` | Timeline container |
| `src/lib/components/contact/ContactForm.svelte` | Simulated contact form |
| `src/lib/components/shared/ScrollReveal.svelte` | IntersectionObserver reveal wrapper |
| `src/lib/i18n/dictionaries/*.ts` | UI translations |
| `.github/workflows/deploy.yml` | Pages deployment |

## Appendix B — Reproduction Commands

```bash
npm install
npm run check
npm run build
npm audit
npx vite preview --port 4173
```

Build results at review time:

```text
svelte-check found 0 errors and 0 warnings
✓ built in ~6s
Using @sveltejs/adapter-static
Wrote site to "build"
```

Generated routes:

```text
build/index.html
build/en.html
build/sv.html
build/pl.html
build/en/blog.html
build/sv/blog.html
build/pl/blog.html
build/404.html
```

No blog post HTML files were generated, confirming C1.

---

**Report prepared from static analysis, successful production build, and runtime preview checks.**

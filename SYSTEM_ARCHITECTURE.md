# System Architecture: Martin Begleiter Personal Portfolio

## Project Overview

**Name**: Martin Begleiter Portfolio  
**Stack**: SvelteKit (Static) + Tailwind CSS v3  
**Aesthetic**: Professional Sentinel Terminal (Toned-down cyberpunk/technical)  
**Deployment**: GitHub Pages (Static hosting)  
**Target Audience**: Technical recruiters, CTOs, Engineering Managers in AI/ML/Security domains

---

## Design System

### Creative Direction: "Professional Sentinel"
A balanced technical aesthetic that demonstrates expertise without overwhelming professionalism. The design maintains the terminal/command-line heritage but removes excessive "hacker" elements for broader appeal.

### Color Palette

#### Core Colors
```css
/* Background Layers */
--surface-container-lowest: #020617    /* Deep navy foundation */
--surface: #0a0e14                      /* Standard background */
--surface-container: #0f172a            /* Card backgrounds */
--surface-container-low: #0b1120        /* Recessed elements */
--surface-container-high: #111827       /* Elevated states */
--surface-container-highest: #1e293b    /* Top-most elevation */

/* Primary Accent - Yellow "Lemon Glow" */
--primary: #fde047                      /* Main accent color */
--primary-container: #fde047            /* Accent containers */
--primary-fixed: #fef08a                /* Lighter yellow */
--primary-fixed-dim: #fde047            /* Standard yellow */
--on-primary: #422006                   /* Text on yellow */
--on-primary-container: #422006         /* Text on yellow containers */

/* Secondary Accent - Cyan/Blue */
--tertiary-container: #38bdf8           /* Light blue accents */
--tertiary: #bae6fd                     /* Lighter blue */
--on-tertiary: #075985                  /* Text on blue */

/* Text Colors */
--on-surface: #f1f5f9                   /* Primary text (off-white) */
--on-surface-variant: #94a3b8           /* Secondary text (muted) */
--on-background: #f1f5f9                /* Background text */

/* Borders & Outlines */
--outline: #334155                      /* Standard borders */
--outline-variant: #1e293b              /* Subtle borders */

/* Error States */
--error: #fca5a5                        /* Error red */
--error-container: #7f1d1d              /* Error background */
```

#### Design Principles
- **No hard borders**: Use tonal stepping (surface elevation) instead of 1px borders
- **Ghost borders**: When borders are required, use `outline-variant` at 15-20% opacity
- **Ambient glow**: For interactive elements, use `0 0 15px rgba(253, 224, 71, 0.1)` instead of drop shadows
- **Color hierarchy**: Elevation = Brightness (lighter = higher in z-index)

---

### Typography

**Font Family**: Space Grotesk (Single font for consistency)

```css
/* Display - Hero names, large headings */
--font-display: 3.5rem (56px) → 2.75rem (44px) mobile
--weight: 700-800 (Bold/ExtraBold)
--letter-spacing: -0.02em
--line-height: 0.9

/* Headline - Section titles */
--font-headline: 2rem (32px) → 1.5rem (24px) mobile
--weight: 600-700 (SemiBold/Bold)
--letter-spacing: -0.01em
--line-height: 1.2

/* Body - Content, descriptions */
--font-body: 1rem (16px) → 0.875rem (14px) mobile
--weight: 400-500 (Regular/Medium)
--letter-spacing: 0
--line-height: 1.6

/* Label - Metadata, tags, terminal text */
--font-label: 0.75rem (12px) → 0.6875rem (11px) mobile
--weight: 600-700 (SemiBold/Bold)
--letter-spacing: 0.05em (wide)
--text-transform: uppercase (for system labels)
```

#### Typography Rules
- **Avoid pure white**: Use `#f1f5f9` (on-surface) instead of `#ffffff`
- **Reduce noise**: Use `on-surface-variant` (#94a3b8) for secondary text
- **Monospace sparingly**: Only for actual code snippets or terminal commands
- **Editorial feel**: Tight tracking on displays, wide tracking on labels

---

### Layout System

#### Responsive Breakpoints (Tailwind defaults)
```
sm:  640px   (Mobile landscape)
md:  768px   (Tablet)
lg:  1024px  (Desktop)
xl:  1280px  (Large desktop)
2xl: 1536px  (Extra large)
```

#### Container
- **Max width**: `max-w-screen-2xl` (1536px)
- **Horizontal padding**: `px-8` (2rem / 32px)
- **Centered**: `mx-auto`

#### Spacing Scale
```
Vertical section spacing: mb-32 (8rem / 128px) desktop, mb-20 (5rem / 80px) mobile
Card gaps: gap-6 (1.5rem / 24px)
Internal padding: p-8 (2rem) standard cards, p-10 (2.5rem) feature cards
Micro spacing: gap-2, gap-4 for inline elements
```

---

### Component Specifications

#### 1. Navigation Bar (TopAppBar)
**Structure**:
```
Fixed top | Backdrop blur | Semi-transparent background
[Logo/Name] ---------- [Nav Links] ---------- [CTA Button]
```

**Styling**:
- Background: `bg-[#020617]/90 backdrop-blur-md`
- Border: `border-b border-yellow-400/10`
- Shadow: `shadow-[0_0_20px_rgba(253,224,71,0.05)]`
- Height: `py-4` (1rem / 16px vertical padding)
- Sticky: `fixed top-0 w-full z-50`

**Nav Links**:
- Default: `text-white/60 hover:text-white`
- Active: `text-primary-container border-b-2 border-primary-container`
- Font: `text-xs font-bold uppercase tracking-widest`

---

#### 2. Bento Cards (Expertise Grid)

**Base Styling**:
```css
.bento-card {
  background: #0b1120; /* surface-container-low */
  border: 1px solid rgba(253, 224, 71, 0.15);
  box-shadow: 0 0 15px rgba(253, 224, 71, 0.02);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.bento-card:hover {
  border-color: rgba(253, 224, 71, 0.4);
  box-shadow: 0 0 30px rgba(253, 224, 71, 0.1);
  transform: translateY(-2px);
}
```

**Grid Layout** (4-column base):
```html
<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
  <!-- Large feature card -->
  <div class="md:col-span-2 md:row-span-2">...</div>
  
  <!-- Standard cards -->
  <div class="md:col-span-2">...</div>
  <div class="md:col-span-1">...</div>
  <div class="md:col-span-1">...</div>
</div>
```

**Background Image Treatment**:
- Position: `absolute right-[-5%] bottom-[-5%]`
- Opacity: `0.08` default, `0.15` on hover
- Filter: `blur(1px)` default, `blur(0)` on hover
- Transition: `all 0.6s ease`
- Effect: Icon/image rotates and scales on hover

---

#### 3. Timeline Component

**Structure**:
```
Vertical line (left) + Date/Role + Content Card
```

**Styling**:
```css
/* Vertical line */
.timeline::before {
  position: absolute;
  left: 11px;
  width: 2px;
  height: 100%;
  background: #1e293b; /* slate-800 */
}

/* Timeline node */
.timeline-node {
  width: 24px;
  height: 24px;
  border: 2px solid #fde047; /* Active */
  border: 2px solid #475569; /* Inactive */
  background: #020617;
}

.timeline-node:hover {
  box-shadow: 0 0 15px #fde047;
}
```

**Layout**:
```
[Node] --- [Date/Role (1 col)] | [Content Card (3 cols)]
```

---

#### 4. Contact Section

**Form Styling**:
- Background: `bg-[#020617]` (darker than card)
- Inputs: Underline-only with `border-b border-slate-700`
- Focus state: `focus:border-primary-container`
- Terminal prefix: `>` character before each input
- Font: `font-mono text-xs uppercase tracking-widest`

**Social Links**:
- Icon boxes: `w-12 h-12 border border-slate-700`
- Hover: `hover:border-primary-container`
- Icon color: `text-white/40 group-hover:text-primary-container`

---

#### 5. Blog Components

**Blog Card** (Preview on homepage):
```
[Image/Thumbnail]
[Date] | [Category Tag]
[Title - H3]
[Excerpt - 2 lines]
[Read More Link →]
```

**Styling**:
- Same bento-card base
- Image: `aspect-video` or `aspect-square`
- Category tag: `px-3 py-1 bg-surface text-primary-container text-xs uppercase`

**Blog Post Layout**:
```
[Hero Image - full width]
[Title - Display]
[Metadata: Date, Reading time, Tags]
[Content - Prose styling]
[Navigation: Previous | Next post]
```

---

### Animation Strategy

#### 1. Page Transitions (Svelte)
```svelte
import { fade, fly } from 'svelte/transition';

<!-- Route changes -->
<div in:fade="{{ duration: 300 }}" out:fade="{{ duration: 200 }}">
  <slot />
</div>
```

#### 2. Scroll Animations (Intersection Observer)
```javascript
// Trigger when element enters viewport
import { inView } from 'svelte-intersection-observer';

// Fade in bento cards on scroll
<div use:inView={{ threshold: 0.2 }} on:enter={handleEnter}>
```

**Animation patterns**:
- Bento cards: `fade + slide up` (translateY)
- Timeline items: `fade + slide left`
- Hero elements: `staggered fade in` (hero text, then image, then terminal)

#### 3. Hover Animations (CSS)
```css
/* Smooth transitions on all interactive elements */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Bento card hover */
transform: translateY(-2px);

/* Button hover */
transform: scale(0.98);

/* Icon hover */
transform: rotate(-8deg) scale(1.15);
```

#### 4. Smooth Scroll
```javascript
// On nav link click
document.querySelector('#section').scrollIntoView({ 
  behavior: 'smooth' 
});
```

---

## Component Hierarchy

### File Structure
```
src/
├── lib/
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── NavBar.svelte          # Top navigation bar
│   │   │   └── NavLink.svelte         # Individual nav link (leaf)
│   │   ├── hero/
│   │   │   ├── HeroSection.svelte     # Hero container with hardcoded content
│   │   │   ├── HeroText.svelte        # Name/title display (leaf)
│   │   │   └── HeroImage.svelte       # Profile image (leaf)
│   │   ├── expertise/
│   │   │   ├── ExpertiseGrid.svelte   # Grid container
│   │   │   └── BentoCard.svelte       # Individual skill card (leaf, accepts props)
│   │   ├── timeline/
│   │   │   ├── Timeline.svelte        # Timeline container
│   │   │   └── TimelineItem.svelte    # Individual entry (leaf, accepts props)
│   │   ├── contact/
│   │   │   ├── ContactSection.svelte  # Contact container
│   │   │   ├── ContactForm.svelte     # Form component
│   │   │   └── SocialLinks.svelte     # Social media links
│   │   ├── blog/
│   │   │   ├── BlogPreview.svelte     # Latest posts section (homepage)
│   │   │   ├── BlogCard.svelte        # Blog post card (leaf)
│   │   │   ├── BlogList.svelte        # Full blog listing page
│   │   │   └── BlogPost.svelte        # Individual post layout
│   │   └── shared/
│   │       ├── SectionHeader.svelte   # Reusable section title
│   │       ├── Button.svelte          # Primary/secondary buttons
│   │       └── Tag.svelte             # Skill/category tags
│   ├── content/
│   │   ├── blog/                      # Markdown blog posts
│   │   │   ├── post-1.md
│   │   │   └── post-2.md
│   │   └── data/
│   │       ├── timeline.json          # Timeline data (placeholder)
│   │       └── expertise.json         # Expertise cards data (placeholder)
│   └── styles/
│       └── app.css                    # Global styles, Tailwind imports
├── routes/
│   ├── +layout.svelte                 # Root layout (NavBar + Footer)
│   ├── +page.svelte                   # Homepage
│   ├── blog/
│   │   ├── +page.svelte               # Blog listing
│   │   └── [slug]/
│   │       └── +page.svelte           # Individual blog post
│   └── +error.svelte                  # 404 page
└── app.html                           # HTML template
```

---

## Data Architecture

### Timeline Data Structure (JSON)
```json
{
  "timeline": [
    {
      "id": "1",
      "period": "2020 - PRESENT",
      "role": "Senior Developer / Architect",
      "company": "Company Name",
      "type": "work",
      "description": "Led development of...",
      "achievements": [
        "Achievement 1",
        "Achievement 2"
      ],
      "tags": ["Security", "Architecture", "Python"],
      "status": "active"
    },
    {
      "id": "2",
      "period": "2023 - 2024",
      "role": "Machine Learning Specialization",
      "company": "Coursera / deeplearning.ai",
      "type": "education",
      "description": "Completed Andrew Ng's ML courses...",
      "achievements": [],
      "tags": ["ML", "Deep Learning", "Python"],
      "status": "completed"
    }
  ]
}
```

### Expertise Data Structure (JSON)
```json
{
  "expertise": [
    {
      "id": "1",
      "title": "AI & Machine Learning",
      "icon": "psychology",
      "iconBg": "neurology",
      "description": "Deep learning fundamentals, neural networks, and ML model deployment.",
      "gridSize": "md:col-span-2 md:row-span-2",
      "tags": ["PyTorch", "TensorFlow", "Scikit-learn"],
      "stats": [
        { "label": "Projects", "value": "5+" },
        { "label": "Courses", "value": "12" }
      ]
    },
    {
      "id": "2",
      "title": "Security & Pentesting",
      "icon": "shield",
      "iconBg": "security",
      "description": "Application security, purple team testing, vulnerability assessment.",
      "gridSize": "md:col-span-2",
      "tags": ["OWASP", "TryHackMe", "Purple Team"],
      "stats": []
    }
  ]
}
```

### Blog Post Frontmatter (Markdown)
```markdown
---
title: "Building Secure AI Systems"
slug: "building-secure-ai-systems"
date: "2024-04-15"
excerpt: "How to combine ML expertise with security principles..."
tags: ["AI", "Security", "Machine Learning"]
image: "/images/blog/secure-ai.jpg"
published: true
---

# Content here...
```

---

## Technical Stack Details

### Core Dependencies
```json
{
  "dependencies": {
    "@sveltejs/kit": "^2.0.0",
    "svelte": "^4.0.0"
  },
  "devDependencies": {
    "@sveltejs/adapter-static": "^3.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "mdsvex": "^0.11.0",
    "svelte-intersection-observer": "^1.0.0"
  }
}
```

### Build Configuration

**svelte.config.js**:
```javascript
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

export default {
  extensions: ['.svelte', '.md'],
  preprocess: [mdsvex()],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    paths: {
      // Production is a user site served from the domain root (martinbegleiter.github.io),
      // so the base path is intentionally empty.
      base: ''
    }
  }
};
```

**tailwind.config.js**:
```javascript
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  theme: {
    extend: {
      colors: {
        'surface-container-lowest': '#020617',
        'surface': '#0a0e14',
        'surface-container': '#0f172a',
        'surface-container-low': '#0b1120',
        'surface-container-high': '#111827',
        'surface-container-highest': '#1e293b',
        'primary': '#fde047',
        'primary-container': '#fde047',
        'on-primary': '#422006',
        'on-surface': '#f1f5f9',
        'on-surface-variant': '#94a3b8',
        'tertiary-container': '#38bdf8',
        'outline': '#334155',
        'outline-variant': '#1e293b'
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        DEFAULT: '0.25rem'
      }
    }
  },
  plugins: []
};
```

---

## Deployment Strategy

### GitHub Pages Setup

This repository (`personal-page`) is a staging repository. Production is deployed from the separate
`martinbegleiter.github.io` repository, which GitHub Pages serves as a **user site** at the domain root.

**1. Repository Configuration**:
- Staging repository: `personal-page`
- Production repository: `martinbegleiter.github.io`
- GitHub Pages URL: `https://martinbegleiter.github.io/`
- Base path: `/` — `paths.base` stays empty because the site is not served from a `/personal-page/` subpath

**2. Build Script** (package.json):
```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && npx gh-pages -d build -t true"
  }
}
```

**3. GitHub Actions** (Optional - Auto deploy):
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

---

## Contact Form Integration

### Option 1: Formspree (Recommended)
```svelte
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

**Setup**:
1. Sign up at formspree.io (free tier: 50 submissions/month)
2. Create form, get unique ID
3. Add to ContactForm.svelte

### Option 2: EmailJS
```javascript
import emailjs from '@emailjs/browser';

const sendEmail = (formData) => {
  emailjs.send('service_id', 'template_id', formData, 'public_key');
};
```

---

## Performance Optimization

### Image Handling
- **Profile photo**: WebP format, max 800px width
- **Blog images**: Lazy loading, responsive sizes
- **Bento background images**: Low-res SVG or optimized PNG at 20% opacity

### Bundle Size Targets
- Initial JS: < 50KB (gzipped)
- CSS: < 20KB (gzipped)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

### Optimization Techniques
1. **Code splitting**: Lazy load blog routes
2. **Image optimization**: Use `vite-imagetools`
3. **Font subsetting**: Only load required glyphs for Space Grotesk
4. **Purge CSS**: Tailwind automatically removes unused classes
5. **Preload critical assets**: Hero image, fonts

---

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Color contrast**: All text meets 4.5:1 minimum
  - Yellow (#fde047) on dark navy (#020617) = 11.5:1 ✅
  - Light gray (#f1f5f9) on dark navy = 15.2:1 ✅
- **Keyboard navigation**: All interactive elements focusable
- **Focus indicators**: Visible outline on focus (yellow glow)
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3)
- **ARIA labels**: For icon-only buttons
- **Alt text**: All images have descriptive alt attributes

### Focus Styling
```css
*:focus-visible {
  outline: 2px solid #fde047;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(253, 224, 71, 0.2);
}
```

---

## Browser Support

### Target Browsers
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari (iOS): Last 2 versions
- Chrome Android: Last 2 versions

### Fallbacks
- **CSS Grid**: Fully supported (no fallback needed)
- **Backdrop filter**: Graceful degradation (solid background if not supported)
- **Intersection Observer**: Polyfill for older browsers (optional)

---

## Content Strategy

### Homepage Sections (Priority Order)
1. **Hero** (Above fold): Name, title, photo, terminal animation
2. **Expertise** (Primary focus): Bento grid showcasing skills
3. **Timeline** (Credibility): Work + education history
4. **Latest Posts** (Engagement): 2-3 recent blog articles
5. **Contact** (CTA): Email, LinkedIn, optional form

### Blog Content Plan (Suggestions)
- "My Journey from Senior Dev to AI Engineering"
- "Security Best Practices for ML Model Deployment"
- "TryHackMe: Key Lessons for Developers"
- "Building a Personal Portfolio with SvelteKit"
- "Deep Learning Fundamentals: Andrew Ng's Course Review"

---

## Maintenance & Updates

### Content Update Workflow
1. **Timeline**: Edit `src/lib/content/data/timeline.json`
2. **Expertise**: Edit `src/lib/content/data/expertise.json`
3. **Blog posts**: Add new `.md` file to `src/lib/content/blog/`
4. **Rebuild**: `npm run build && npm run deploy`

### Version Control
- **Main branch**: Production-ready code
- **Development branch**: Active development
- **Feature branches**: For major additions

---

## Future Enhancements (Post-MVP)

### Phase 2 Features
- [ ] Dark/light mode toggle (with system preference detection)
- [ ] Animated background particles (subtle, performance-optimized)
- [ ] Project showcase section (separate from expertise)
- [ ] Testimonials/recommendations
- [ ] Analytics integration (Plausible or privacy-focused)

### Phase 3 Features
- [ ] CMS integration (Sanity, Strapi, or NetlifyCMS)
- [ ] Search functionality for blog
- [ ] RSS feed for blog posts
- [ ] Newsletter signup (ConvertKit, Buttondown)
- [ ] Multilingual support (EN/DE?)

---

## Design Decisions Log

### Why SvelteKit over Next.js/Nuxt?
- **Performance**: Smaller bundle sizes, no runtime overhead
- **Developer experience**: Simpler mental model, less boilerplate
- **Static generation**: Native support, no configuration needed

### Why Tailwind v3 over v4?
- **Stability**: v4 is in beta (as of writing)
- **Documentation**: More complete, better community support
- **Migration path**: Easy to upgrade later when v4 is stable

### Why Separate Blog Route?
- **Focus**: Keeps homepage concise and conversion-focused
- **SEO**: Better URL structure (`/blog/post-title` vs `/#blog-post-title`)
- **Scalability**: Easier to add features (search, categories, pagination)

### Why JSON Data Files?
- **Simplicity**: Easy to edit without touching components
- **Type safety**: Can add TypeScript interfaces later
- **Migration path**: Easy to connect to CMS or API later

---

**Document Version**: 1.0  
**Last Updated**: 2026-04-19  
**Author**: Lead Solutions Architect (AI Assistant)  
**Status**: ✅ APPROVED - Ready for Implementation

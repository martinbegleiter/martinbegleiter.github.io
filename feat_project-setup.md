# Feature Implementation Plan: Project Setup & Foundation

**Feature ID**: `F0-PROJECT-SETUP`  
**Phase**: 0 - Foundation  
**Priority**: CRITICAL  
**Dependencies**: None  
**Estimated Effort**: 2-3 hours

---

## Objective

Initialize a production-ready SvelteKit project with Tailwind CSS v3, configured for static site generation and GitHub Pages deployment.

---

## Technical Requirements

### 1. SvelteKit Project Initialization

**Command Sequence**:
```bash
# Create new SvelteKit project
npm create svelte@latest .

# Choose options:
# - Which Svelte app template? › Skeleton project
# - Add type checking with TypeScript? › Yes, using TypeScript syntax
# - Select additional options: 
#   [x] Add ESLint for code linting
#   [x] Add Prettier for code formatting
```

**Expected Output**:
```
personal-page/
├── src/
│   ├── routes/
│   │   └── +page.svelte
│   ├── app.html
│   └── app.css
├── static/
├── svelte.config.js
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

### 2. Install Core Dependencies

**Production Dependencies**:
```bash
npm install -D @sveltejs/adapter-static
```

**Tailwind CSS v3 Setup**:
```bash
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
npx tailwindcss init -p
```

**Blog System (mdsvex)**:
```bash
npm install -D mdsvex
```

**Animation Utilities**:
```bash
npm install -D svelte-intersection-observer
```

**Deployment Tool**:
```bash
npm install -D gh-pages
```

**Final package.json dependencies**:
```json
{
  "devDependencies": {
    "@sveltejs/adapter-static": "^3.0.1",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^3.0.0",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.56.0",
    "eslint-plugin-svelte": "^2.35.1",
    "gh-pages": "^6.1.1",
    "mdsvex": "^0.11.0",
    "postcss": "^8.4.38",
    "prettier": "^3.1.1",
    "prettier-plugin-svelte": "^3.1.2",
    "svelte": "^4.2.7",
    "svelte-check": "^3.6.0",
    "svelte-intersection-observer": "^1.0.0",
    "tailwindcss": "^3.4.3",
    "tslib": "^2.6.2",
    "typescript": "^5.0.0",
    "vite": "^5.0.3"
  }
}
```

---

### 3. Configuration Files

#### `svelte.config.js`
```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				blog: 'src/lib/components/blog/BlogPostLayout.svelte'
			}
		})
	],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		
		// GitHub Pages base path
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/personal-page' : ''
		},
		
		prerender: {
			handleHttpError: 'warn'
		}
	}
};

export default config;
```

#### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}'],
	theme: {
		extend: {
			colors: {
				// Surface layers (dark navy foundations)
				'surface-container-lowest': '#020617',
				'surface': '#0a0e14',
				'surface-container': '#0f172a',
				'surface-container-low': '#0b1120',
				'surface-container-high': '#111827',
				'surface-container-highest': '#1e293b',
				
				// Primary accent (yellow)
				'primary': '#fde047',
				'primary-container': '#fde047',
				'primary-fixed': '#fef08a',
				'primary-fixed-dim': '#fde047',
				'on-primary': '#422006',
				'on-primary-container': '#422006',
				'on-primary-fixed': '#422006',
				'on-primary-fixed-variant': '#713f12',
				
				// Secondary (grays)
				'secondary': '#94a3b8',
				'secondary-container': '#1e293b',
				'secondary-fixed': '#e2e8f0',
				'secondary-fixed-dim': '#cbd5e1',
				'on-secondary': '#1e293b',
				'on-secondary-container': '#cbd5e1',
				'on-secondary-fixed': '#0f172a',
				'on-secondary-fixed-variant': '#334155',
				
				// Tertiary (blue accents)
				'tertiary': '#bae6fd',
				'tertiary-container': '#38bdf8',
				'tertiary-fixed': '#e0f2fe',
				'tertiary-fixed-dim': '#7dd3fc',
				'on-tertiary': '#075985',
				'on-tertiary-container': '#0369a1',
				'on-tertiary-fixed': '#082f49',
				'on-tertiary-fixed-variant': '#0c4a6e',
				
				// Text colors
				'on-surface': '#f1f5f9',
				'on-surface-variant': '#94a3b8',
				'on-background': '#f1f5f9',
				
				// Borders
				'outline': '#334155',
				'outline-variant': '#1e293b',
				
				// Error states
				'error': '#fca5a5',
				'error-container': '#7f1d1d',
				'on-error': '#450a0a',
				'on-error-container': '#fee2e2',
				
				// Inverse colors
				'inverse-surface': '#f1f5f9',
				'inverse-on-surface': '#f8fafc',
				'inverse-primary': '#a16207',
				
				// Surface variants
				'surface-tint': '#fde047',
				'surface-dim': '#020617',
				'surface-bright': '#1e293b',
				'surface-variant': '#0f172a'
			},
			
			fontFamily: {
				sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
				headline: ['Space Grotesk', 'system-ui', 'sans-serif'],
				body: ['Space Grotesk', 'system-ui', 'sans-serif'],
				label: ['Space Grotesk', 'system-ui', 'sans-serif']
			},
			
			borderRadius: {
				DEFAULT: '0.25rem',
				lg: '0.5rem',
				xl: '0.75rem'
			},
			
			fontSize: {
				'display': '3.5rem',      // 56px
				'display-sm': '2.75rem',  // 44px
				'headline': '2rem',       // 32px
				'headline-sm': '1.5rem',  // 24px
				'body': '1rem',           // 16px
				'body-sm': '0.875rem',    // 14px
				'label': '0.75rem',       // 12px
				'label-sm': '0.6875rem'   // 11px
			},
			
			letterSpacing: {
				tightest: '-0.02em',
				tight: '-0.01em',
				wide: '0.05em',
				widest: '0.3em'
			}
		}
	},
	plugins: []
};
```

#### `postcss.config.js`
```javascript
export default {
	plugins: {
		tailwindcss: {},
		autoprefixer: {}
	}
};
```

#### `vite.config.ts`
```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['svelte-intersection-observer']
	}
});
```

---

### 4. Folder Structure Setup

**Create directory structure**:
```bash
# Component directories
mkdir -p src/lib/components/navigation
mkdir -p src/lib/components/hero
mkdir -p src/lib/components/expertise
mkdir -p src/lib/components/timeline
mkdir -p src/lib/components/contact
mkdir -p src/lib/components/blog
mkdir -p src/lib/components/shared

# Content directories
mkdir -p src/lib/content/blog
mkdir -p src/lib/content/data

# Styles directory
mkdir -p src/lib/styles

# Static assets
mkdir -p static/images/blog
mkdir -p static/images/profile
mkdir -p static/images/expertise
```

**Expected structure**:
```
src/
├── lib/
│   ├── components/
│   │   ├── navigation/
│   │   ├── hero/
│   │   ├── expertise/
│   │   ├── timeline/
│   │   ├── contact/
│   │   ├── blog/
│   │   └── shared/
│   ├── content/
│   │   ├── blog/
│   │   └── data/
│   └── styles/
│       └── app.css
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte
│   └── blog/
│       ├── +page.svelte
│       └── [slug]/
│           └── +page.svelte
├── app.html
└── app.css
```

---

### 5. Global Styles Setup

#### `src/lib/styles/app.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Google Fonts - Space Grotesk */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

/* Material Symbols - Outlined variant */
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

@layer base {
	/* Root styles */
	html {
		scroll-behavior: smooth;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	body {
		@apply bg-surface text-on-surface font-body;
		background-image: 
			radial-gradient(circle at 50% 50%, rgba(253, 224, 71, 0.03) 0%, transparent 100%),
			repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.01) 0px, rgba(255, 255, 255, 0.01) 1px, transparent 1px, transparent 2px);
		background-size: 100% 100%, 100% 4px;
	}
	
	/* Text selection */
	::selection {
		@apply bg-primary-container text-on-primary-container;
	}
	
	/* Focus styles for accessibility */
	*:focus-visible {
		@apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-surface;
	}
}

@layer components {
	/* Material Symbols configuration */
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}
	
	/* Bento Card base styles */
	.bento-card {
		@apply bg-surface-container-low border border-primary/15 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden;
		box-shadow: 0 0 15px rgba(253, 224, 71, 0.02);
	}
	
	.bento-card:hover {
		@apply border-primary/40 -translate-y-0.5;
		box-shadow: 0 0 30px rgba(253, 224, 71, 0.1), inset 0 0 20px rgba(56, 189, 248, 0.05);
	}
	
	/* Background illustrative icons */
	.bg-illustrative-icon {
		@apply absolute -right-[5%] -bottom-[5%] text-[14rem] opacity-[0.08] pointer-events-none transition-all duration-[600ms] ease-out;
		color: #38bdf8;
		filter: blur(1px);
	}
	
	.bento-card:hover .bg-illustrative-icon {
		@apply opacity-15 scale-[1.15] -rotate-[8deg];
		filter: blur(0);
	}
	
	/* Glitch hover effect (hero name only) */
	.glitch-hover:hover {
		text-shadow: 2px 0 #fde047, -2px 0 #38bdf8;
	}
}

@layer utilities {
	/* Animation utilities */
	.animate-fade-in {
		animation: fadeIn 0.6s ease-out;
	}
	
	.animate-slide-up {
		animation: slideUp 0.8s ease-out;
	}
	
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
}
```

#### Update `src/app.css` (if exists, otherwise create)
```css
/* Import global styles */
@import './lib/styles/app.css';
```

---

### 6. Base HTML Template

#### `src/app.html`
```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		
		<!-- SEO Meta Tags -->
		<meta name="description" content="Martin Begleiter - Senior Developer, Architect, AI & Security Engineer. Portfolio showcasing expertise in machine learning, security, and software architecture." />
		<meta name="keywords" content="Martin Begleiter, Software Architect, AI Engineer, Security, Machine Learning, Full Stack Developer" />
		<meta name="author" content="Martin Begleiter" />
		
		<!-- Open Graph -->
		<meta property="og:type" content="website" />
		<meta property="og:title" content="Martin Begleiter - Senior Developer & AI Engineer" />
		<meta property="og:description" content="Portfolio showcasing expertise in machine learning, security, and software architecture." />
		<meta property="og:image" content="%sveltekit.assets%/og-image.png" />
		
		<!-- Twitter Card -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="Martin Begleiter - Senior Developer & AI Engineer" />
		<meta name="twitter:description" content="Portfolio showcasing expertise in machine learning, security, and software architecture." />
		
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

---

### 7. Package Scripts

#### Update `package.json` scripts:
```json
{
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"lint": "eslint .",
		"format": "prettier --write .",
		"deploy": "npm run build && npx gh-pages -d build -t true"
	}
}
```

---

### 8. Git Configuration

#### `.gitignore` (should be auto-generated, verify contains):
```
.DS_Store
node_modules
/build
/.svelte-kit
/package
.env
.env.*
!.env.example
vite.config.js.timestamp-*
vite.config.ts.timestamp-*
```

#### Initial Git commit:
```bash
git add .
git commit -m "Initial SvelteKit project setup with Tailwind CSS v3"
```

---

### 9. Placeholder Files

#### `static/favicon.png`
- Create or download a simple favicon (32x32 or 64x64)
- Yellow/navy theme to match design

#### `src/routes/+page.svelte` (temporary placeholder):
```svelte
<script>
	// Temporary homepage placeholder
</script>

<main class="min-h-screen flex items-center justify-center">
	<div class="text-center">
		<h1 class="text-display font-bold text-primary mb-4">
			MARTIN<br />BEGLEITER<span class="text-primary-container">.</span>
		</h1>
		<p class="text-headline-sm text-on-surface-variant">
			Portfolio under construction
		</p>
		<div class="mt-8 inline-flex gap-2 items-center text-label uppercase tracking-widest text-primary-container">
			<span class="material-symbols-outlined text-sm">construction</span>
			<span>System initializing...</span>
		</div>
	</div>
</main>
```

---

## Testing Checklist

After setup, verify:

- [ ] `npm run dev` starts development server without errors
- [ ] Browser opens to `http://localhost:5173/` and shows placeholder page
- [ ] Tailwind classes are applied (yellow text, navy background)
- [ ] Space Grotesk font loads correctly
- [ ] Material Symbols icons render
- [ ] Hot module replacement works (edit file, see instant update)
- [ ] `npm run build` completes successfully
- [ ] `npm run preview` shows built site correctly
- [ ] Build output in `build/` folder contains static files

---

## Common Issues & Solutions

### Issue 1: Tailwind styles not applying
**Solution**: 
1. Verify `src/app.css` imports Tailwind directives
2. Check `tailwind.config.js` content paths include all file types
3. Restart dev server

### Issue 2: Fonts not loading
**Solution**:
1. Check network tab for 404 errors
2. Verify Google Fonts URL in `app.css`
3. Try adding `&display=swap` parameter

### Issue 3: Build fails with path errors
**Solution**:
1. Ensure all imports use relative paths or `$lib` alias
2. Check `svelte.config.js` adapter configuration
3. Verify `tsconfig.json` paths are correct

### Issue 4: GitHub Pages 404 on navigation
**Solution**:
1. Verify `fallback: '404.html'` in adapter config
2. Ensure `base` path is set correctly for production
3. Check GitHub Pages settings (branch, folder)

---

## Next Steps

After successful setup:

1. ✅ Create `SYSTEM_ARCHITECTURE.md` (already done)
2. ✅ Create `PROJECT_PROGRESS.md` (already done)
3. ➡️ Proceed to **Phase 1: Core Design System** (create `feat_design-system.md`)
4. ➡️ Create placeholder data files (`timeline.json`, `expertise.json`)
5. ➡️ Begin component development (start with leaf components)

---

## Acceptance Criteria

Setup is complete when:

- [x] SvelteKit project initializes without errors
- [x] Tailwind CSS v3 is configured with custom theme
- [x] All dependencies are installed
- [x] Folder structure matches specification
- [x] Development server runs successfully
- [x] Build process completes without errors
- [x] Global styles are applied correctly
- [x] Fonts load (Space Grotesk, Material Symbols)

---

**Implementation Time**: 2-3 hours  
**Complexity**: Low  
**Blocker**: None  
**Status**: 📋 READY FOR IMPLEMENTATION

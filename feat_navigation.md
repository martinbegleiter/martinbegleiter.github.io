# Feature Implementation Plan: Navigation & Layout System

**Feature ID**: `F1-NAVIGATION`  
**Phase**: 2 - Navigation & Layout  
**Priority**: HIGH  
**Dependencies**: F0-PROJECT-SETUP  
**Estimated Effort**: 3-4 hours

---

## Objective

Build a responsive navigation system with smooth scrolling, active state detection, and a root layout that wraps all pages with consistent header/footer.

---

## Component Specifications

### 1. NavLink Component (Leaf)

**File**: `src/lib/components/navigation/NavLink.svelte`

**Purpose**: Individual navigation link with active state detection

**Props Interface**:
```typescript
interface NavLinkProps {
	href: string;          // Target anchor (e.g., '#expertise')
	label: string;         // Display text
	isActive?: boolean;    // Active state (optional, auto-detected)
}
```

**Implementation**:
```svelte
<script lang="ts">
	export let href: string;
	export let label: string;
	export let isActive: boolean = false;
	
	let classes = isActive 
		? 'text-primary-container border-b-2 border-primary-container pb-1'
		: 'text-white/60 hover:text-white pb-1';
</script>

<a 
	{href}
	class="font-sans tracking-widest text-xs font-bold uppercase transition-colors {classes}"
>
	{label}
</a>
```

**Styling Notes**:
- Font: Space Grotesk, uppercase, tracking-widest
- Size: text-xs (12px)
- Weight: font-bold (700)
- Default: 60% opacity white
- Hover: 100% opacity white
- Active: Yellow (#fde047) with bottom border

---

### 2. NavBar Component (Container)

**File**: `src/lib/components/navigation/NavBar.svelte`

**Purpose**: Top navigation bar with logo, nav links, and CTA button

**Props**: None (hardcoded content)

**Implementation**:
```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import NavLink from './NavLink.svelte';
	
	// Active section detection
	let activeSection = 'home';
	
	// Smooth scroll handler
	function handleNavClick(event: MouseEvent, href: string) {
		event.preventDefault();
		const targetId = href.replace('#', '');
		const element = document.getElementById(targetId);
		
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			activeSection = targetId;
		}
	}
	
	// Intersection Observer for active section detection
	import { onMount } from 'svelte';
	
	onMount(() => {
		const sections = ['home', 'expertise', 'timeline', 'contact'];
		
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{ threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
		);
		
		sections.forEach((id) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});
		
		return () => observer.disconnect();
	});
</script>

<header class="fixed top-0 w-full z-50 bg-[#020617]/90 backdrop-blur-md border-b border-yellow-400/10 shadow-[0_0_20px_rgba(253,224,71,0.05)]">
	<div class="flex justify-between items-center px-8 py-4 w-full max-w-screen-2xl mx-auto">
		<!-- Logo / Name -->
		<div class="text-xl font-extrabold tracking-tighter text-primary-container font-headline">
			MARTIN_BEGLEITER
		</div>
		
		<!-- Desktop Navigation -->
		<nav class="hidden md:flex gap-8 items-center">
			<button on:click={(e) => handleNavClick(e, '#home')}>
				<NavLink href="#home" label="HOME" isActive={activeSection === 'home'} />
			</button>
			<button on:click={(e) => handleNavClick(e, '#expertise')}>
				<NavLink href="#expertise" label="EXPERTISE" isActive={activeSection === 'expertise'} />
			</button>
			<button on:click={(e) => handleNavClick(e, '#timeline')}>
				<NavLink href="#timeline" label="TIMELINE" isActive={activeSection === 'timeline'} />
			</button>
			<button on:click={(e) => handleNavClick(e, '#contact')}>
				<NavLink href="#contact" label="CONTACT" isActive={activeSection === 'contact'} />
			</button>
		</nav>
		
		<!-- CTA Button (placeholder - can be blog link or login) -->
		<div class="flex items-center gap-4">
			<a 
				href="/blog"
				class="bg-primary-container text-on-primary-container px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase hover:scale-95 transition-transform"
			>
				VIEW_BLOG
			</a>
		</div>
	</div>
</header>
```

**Styling Breakdown**:
- **Position**: `fixed top-0 w-full z-50` (sticky header)
- **Background**: `bg-[#020617]/90` (90% opacity dark navy)
- **Blur**: `backdrop-blur-md` (glassmorphism effect)
- **Border**: `border-b border-yellow-400/10` (subtle yellow underline)
- **Shadow**: Custom glow `shadow-[0_0_20px_rgba(253,224,71,0.05)]`
- **Padding**: `px-8 py-4` (32px horizontal, 16px vertical)
- **Container**: `max-w-screen-2xl mx-auto` (centered, max 1536px)

---

### 3. Mobile Navigation (Enhancement)

**Additional Implementation** (add to NavBar.svelte):

```svelte
<script lang="ts">
	// ... existing code ...
	
	let mobileMenuOpen = false;
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<!-- Add mobile menu button (visible < md) -->
<div class="md:hidden">
	<button 
		on:click={toggleMobileMenu}
		class="w-10 h-10 flex items-center justify-center text-primary-container"
		aria-label="Toggle menu"
	>
		<span class="material-symbols-outlined">
			{mobileMenuOpen ? 'close' : 'menu'}
		</span>
	</button>
</div>

<!-- Mobile menu overlay -->
{#if mobileMenuOpen}
	<div class="md:hidden absolute top-full left-0 w-full bg-surface-container-highest border-b border-primary/10">
		<nav class="flex flex-col p-8 gap-6">
			<button on:click={(e) => { handleNavClick(e, '#home'); toggleMobileMenu(); }}>
				<NavLink href="#home" label="HOME" isActive={activeSection === 'home'} />
			</button>
			<button on:click={(e) => { handleNavClick(e, '#expertise'); toggleMobileMenu(); }}>
				<NavLink href="#expertise" label="EXPERTISE" isActive={activeSection === 'expertise'} />
			</button>
			<button on:click={(e) => { handleNavClick(e, '#timeline'); toggleMobileMenu(); }}>
				<NavLink href="#timeline" label="TIMELINE" isActive={activeSection === 'timeline'} />
			</button>
			<button on:click={(e) => { handleNavClick(e, '#contact'); toggleMobileMenu(); }}>
				<NavLink href="#contact" label="CONTACT" isActive={activeSection === 'contact'} />
			</button>
		</nav>
	</div>
{/if}
```

---

### 4. Footer Component

**File**: `src/lib/components/shared/Footer.svelte`

**Purpose**: Consistent footer across all pages

**Implementation**:
```svelte
<footer class="w-full py-12 border-t border-primary/5 bg-[#020617]">
	<div class="flex flex-col items-center justify-center gap-4 w-full px-8">
		<!-- Copyright -->
		<div class="font-sans text-[9px] tracking-tighter opacity-50 uppercase">
			© 2026 MARTIN_BEGLEITER // SECURE_CONNECTION
		</div>
		
		<!-- Social Links -->
		<div class="flex gap-8">
			<a 
				href="https://github.com/[USERNAME]" 
				class="font-sans text-[9px] tracking-widest text-white/30 hover:text-primary-container transition-colors uppercase"
				target="_blank"
				rel="noopener noreferrer"
			>
				GITHUB
			</a>
			<a 
				href="https://linkedin.com/in/[USERNAME]" 
				class="font-sans text-[9px] tracking-widest text-white/30 hover:text-primary-container transition-colors uppercase"
				target="_blank"
				rel="noopener noreferrer"
			>
				LINKEDIN
			</a>
			<a 
				href="mailto:[EMAIL]" 
				class="font-sans text-[9px] tracking-widest text-white/30 hover:text-primary-container transition-colors uppercase"
			>
				EMAIL
			</a>
		</div>
		
		<!-- Status Indicator (decorative) -->
		<div class="mt-4 flex items-center gap-2 opacity-20">
			<div class="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>
			<span class="text-[8px] font-mono tracking-[0.5em] uppercase">SYSTEM_UPTIME: 100%</span>
		</div>
	</div>
</footer>
```

---

### 5. Root Layout

**File**: `src/routes/+layout.svelte`

**Purpose**: Wrap all pages with navigation and footer

**Implementation**:
```svelte
<script lang="ts">
	import NavBar from '$lib/components/navigation/NavBar.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	import '$lib/styles/app.css';
	
	import { page } from '$app/stores';
	
	// Don't show NavBar on certain pages (optional)
	$: showNav = !$page.url.pathname.includes('/404');
</script>

{#if showNav}
	<NavBar />
{/if}

<main>
	<slot />
</main>

{#if showNav}
	<Footer />
{/if}
```

---

## Accessibility Requirements

### Keyboard Navigation
- All nav links must be keyboard accessible (tab order)
- Enter/Space should activate navigation
- Escape should close mobile menu

### Focus Indicators
```css
/* Already in global app.css */
*:focus-visible {
	@apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-surface;
}
```

### ARIA Labels
- Mobile menu button: `aria-label="Toggle menu"`
- Nav links: Semantic `<a>` tags (not divs)
- Current page indicator: Consider `aria-current="page"`

### Screen Reader Support
```svelte
<!-- Add to nav links -->
<a href="#expertise" aria-label="Navigate to expertise section">
	EXPERTISE
</a>
```

---

## Testing Checklist

### Desktop Testing
- [ ] Navigation bar sticks to top on scroll
- [ ] Active section updates as user scrolls
- [ ] Clicking nav link smoothly scrolls to section
- [ ] Hover states work (white opacity change)
- [ ] Active state shows yellow with bottom border
- [ ] Logo/name is visible and clickable (returns to top)
- [ ] Blog button navigates to `/blog`

### Mobile Testing (< 768px)
- [ ] Desktop nav links hidden
- [ ] Hamburger menu button visible
- [ ] Clicking menu toggles overlay
- [ ] Mobile menu shows all links
- [ ] Clicking link scrolls and closes menu
- [ ] Menu icon changes (menu ↔ close)

### Accessibility Testing
- [ ] Tab key navigates through all links
- [ ] Enter key activates focused link
- [ ] Focus indicator visible on all elements
- [ ] Screen reader announces links correctly
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)

### Performance Testing
- [ ] Backdrop blur performs well (60fps scroll)
- [ ] Intersection Observer doesn't cause jank
- [ ] Smooth scroll doesn't block UI
- [ ] Mobile menu animation smooth

---

## Known Issues & Edge Cases

### Issue 1: Active section detection on fast scroll
**Solution**: Use `rootMargin` in Intersection Observer to trigger earlier

### Issue 2: Smooth scroll conflicts with browser back/forward
**Solution**: Only apply smooth scroll to manual clicks, not programmatic navigation

### Issue 3: Mobile menu stays open on orientation change
**Solution**: Add resize listener to close menu when viewport width changes

```svelte
<script>
	onMount(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				mobileMenuOpen = false;
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>
```

---

## Integration with Existing Pages

### Homepage (`src/routes/+page.svelte`)

**Add section IDs**:
```svelte
<section id="home" class="...">
	<!-- Hero content -->
</section>

<section id="expertise" class="...">
	<!-- Expertise bento grid -->
</section>

<section id="timeline" class="...">
	<!-- Timeline -->
</section>

<section id="contact" class="...">
	<!-- Contact form -->
</section>
```

**Add top padding to account for fixed nav**:
```svelte
<main class="pt-24">
	<!-- pt-24 = 96px, adjust if nav height changes -->
</main>
```

---

## Customization Options

### Logo Variants
```svelte
<!-- Option 1: Text only (current) -->
<div class="text-xl font-extrabold">MARTIN_BEGLEITER</div>

<!-- Option 2: With terminal prefix -->
<div class="text-xl font-extrabold">
	<span class="text-primary-container">&gt;_</span> MARTIN_BEGLEITER
</div>

<!-- Option 3: Initials -->
<div class="text-xl font-extrabold">MB<span class="text-primary-container">.</span></div>
```

### CTA Button Variants
```svelte
<!-- Option 1: Blog link (current) -->
<a href="/blog">VIEW_BLOG</a>

<!-- Option 2: Contact CTA -->
<a href="#contact">GET_IN_TOUCH</a>

<!-- Option 3: Resume download -->
<a href="/resume.pdf" download>DOWNLOAD_CV</a>
```

---

## Next Steps

After navigation is complete:

1. ✅ Test on all breakpoints (mobile, tablet, desktop)
2. ➡️ Implement Hero Section (F2-HERO)
3. ➡️ Wire up smooth scroll to actual page sections
4. ➡️ Add page transition animations (Svelte transitions)

---

## Acceptance Criteria

Navigation system is complete when:

- [x] NavBar component renders with all links
- [x] Active state detection works on scroll
- [x] Smooth scroll navigation functions correctly
- [x] Mobile menu toggles on small screens
- [x] Footer displays on all pages
- [x] Root layout wraps all routes
- [x] Keyboard navigation works
- [x] Focus indicators visible
- [x] No console errors or warnings

---

**Implementation Time**: 3-4 hours  
**Complexity**: Medium  
**Blocker**: Requires sections with IDs on homepage  
**Status**: 📋 READY FOR IMPLEMENTATION

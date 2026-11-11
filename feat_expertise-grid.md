# Feature Implementation Plan: Expertise Bento Grid

**Feature ID**: `F2-EXPERTISE-GRID`  
**Phase**: 4 - Expertise Bento Grid  
**Priority**: HIGH  
**Dependencies**: F0-PROJECT-SETUP  
**Estimated Effort**: 4-5 hours

---

## Objective

Create a responsive bento-box grid layout showcasing expertise areas with background images, hover effects, and scroll animations. Components should accept data via props for easy content updates.

---

## Data Structure

### Expertise Data File

**File**: `src/lib/content/data/expertise.json`

```json
{
	"expertise": [
		{
			"id": "ai-ml",
			"title": "AI & Machine Learning",
			"icon": "psychology",
			"iconBg": "neurology",
			"description": "Deep learning fundamentals, neural network architectures, and ML model development through Andrew Ng's courses on Coursera and deeplearning.ai.",
			"gridSize": "md:col-span-2 md:row-span-2",
			"tags": ["PyTorch", "TensorFlow", "Scikit-learn", "Neural Networks"],
			"stats": [
				{ "label": "Courses Completed", "value": "12+" },
				{ "label": "Study Hours", "value": "300+" }
			]
		},
		{
			"id": "security",
			"title": "Security & Purple Team",
			"icon": "shield",
			"iconBg": "security",
			"description": "Application security, penetration testing, and purple team collaboration. Hands-on experience with TryHackMe and real-world security assessments.",
			"gridSize": "md:col-span-2",
			"tags": ["OWASP", "Purple Team", "Pentesting", "TryHackMe"],
			"stats": []
		},
		{
			"id": "architecture",
			"title": "Software Architecture",
			"icon": "architecture",
			"iconBg": "hub",
			"description": "System design, microservices, distributed systems, and scalability patterns for enterprise applications.",
			"gridSize": "md:col-span-1",
			"tags": ["Microservices", "Cloud", "System Design"],
			"stats": []
		},
		{
			"id": "fullstack",
			"title": "Full-Stack Development",
			"icon": "code",
			"iconBg": "data_object",
			"description": "End-to-end application development with modern frameworks and best practices.",
			"gridSize": "md:col-span-1",
			"tags": ["React", "Node.js", "Python", "TypeScript"],
			"stats": []
		}
	]
}
```

**TypeScript Interface**:
```typescript
interface ExpertiseStat {
	label: string;
	value: string;
}

interface ExpertiseItem {
	id: string;
	title: string;
	icon: string;           // Material Symbol name
	iconBg: string;         // Background illustrative icon
	description: string;
	gridSize: string;       // Tailwind grid classes
	tags: string[];
	stats: ExpertiseStat[];
}
```

---

## Component Specifications

### 1. BentoCard Component (Leaf)

**File**: `src/lib/components/expertise/BentoCard.svelte`

**Purpose**: Reusable card with hover effects and background illustration

**Props Interface**:
```typescript
interface BentoCardProps {
	title: string;
	icon: string;
	iconBg: string;
	description: string;
	gridSize: string;
	tags?: string[];
	stats?: ExpertiseStat[];
}
```

**Implementation**:
```svelte
<script lang="ts">
	export let title: string;
	export let icon: string;
	export let iconBg: string;
	export let description: string;
	export let gridSize: string = 'md:col-span-1';
	export let tags: string[] = [];
	export let stats: Array<{ label: string; value: string }> = [];
	
	// Animation state
	let isVisible = false;
</script>

<div 
	class="bento-card p-8 group {gridSize}"
	class:animate-slide-up={isVisible}
	use:inView={{ threshold: 0.2 }}
	on:enter={() => isVisible = true}
>
	<!-- Background illustrative icon -->
	<span 
		class="material-symbols-outlined bg-illustrative-icon" 
		style="font-variation-settings: 'FILL' 0;"
	>
		{iconBg}
	</span>
	
	<div class="relative z-10 h-full flex flex-col">
		<!-- Header -->
		<div class="flex items-start justify-between mb-6">
			<span 
				class="material-symbols-outlined text-primary-container text-4xl"
				style="font-variation-settings: 'FILL' 1;"
			>
				{icon}
			</span>
			
			{#if stats.length > 0}
				<span class="text-[10px] font-mono tracking-widest text-on-surface-variant bg-surface/50 px-2 py-1 border border-white/5">
					VERIFIED
				</span>
			{/if}
		</div>
		
		<!-- Title -->
		<h3 class="text-2xl font-bold mb-4 tracking-tighter uppercase">
			{title}
		</h3>
		
		<!-- Description -->
		<p class="text-on-surface-variant leading-relaxed mb-6 flex-grow">
			{description}
		</p>
		
		<!-- Stats (if provided) -->
		{#if stats.length > 0}
			<div class="grid grid-cols-2 gap-4 mb-6">
				{#each stats as stat}
					<div class="bg-[#020617]/80 backdrop-blur-md p-4 border border-primary-container/20">
						<div class="text-[10px] text-primary-container uppercase font-bold tracking-widest mb-1">
							{stat.label}
						</div>
						<div class="text-2xl font-bold">{stat.value}</div>
					</div>
				{/each}
			</div>
		{/if}
		
		<!-- Tags -->
		{#if tags.length > 0}
			<div class="flex gap-2 flex-wrap">
				{#each tags as tag}
					<span class="px-3 py-1.5 bg-[#020617]/80 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase text-white/80 border border-primary-container/20">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</div>

<script context="module" lang="ts">
	import { inView } from 'svelte-intersection-observer';
</script>
```

**Styling Breakdown**:
- **Base**: `.bento-card` class from global CSS
- **Padding**: `p-8` (2rem / 32px)
- **Grid size**: Dynamic via `gridSize` prop
- **Background icon**: Absolute positioned, low opacity
- **Content**: Relative z-10 to stay above background
- **Hover**: Transforms applied via `.bento-card:hover` in CSS

---

### 2. SectionHeader Component (Shared/Reusable)

**File**: `src/lib/components/shared/SectionHeader.svelte`

**Purpose**: Consistent section title styling across all sections

**Props**:
```typescript
interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	prefix?: string;  // e.g., "01 //"
}
```

**Implementation**:
```svelte
<script lang="ts">
	export let title: string;
	export let subtitle: string = '';
	export let prefix: string = '';
</script>

<div class="flex items-baseline gap-4 mb-12">
	{#if prefix}
		<span class="font-mono text-sm text-primary-container/40">{prefix}</span>
	{/if}
	
	<h2 class="text-4xl font-bold tracking-tighter uppercase font-headline">
		{title}
	</h2>
	
	<div class="h-px grow bg-slate-800"></div>
	
	{#if subtitle}
		<span class="font-mono text-[10px] tracking-[0.3em] text-primary-container uppercase">
			{subtitle}
		</span>
	{/if}
</div>
```

---

### 3. ExpertiseGrid Component (Container)

**File**: `src/lib/components/expertise/ExpertiseGrid.svelte`

**Purpose**: Grid container that loads data and renders BentoCards

**Implementation**:
```svelte
<script lang="ts">
	import BentoCard from './BentoCard.svelte';
	import SectionHeader from '$lib/components/shared/SectionHeader.svelte';
	import expertiseData from '$lib/content/data/expertise.json';
	
	const { expertise } = expertiseData;
</script>

<section class="max-w-screen-2xl mx-auto px-8 mb-40" id="expertise">
	<SectionHeader 
		title="Expertise Matrix" 
		subtitle="VERIFIED_SKILLSET"
		prefix="// 02"
	/>
	
	<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
		{#each expertise as item (item.id)}
			<BentoCard
				title={item.title}
				icon={item.icon}
				iconBg={item.iconBg}
				description={item.description}
				gridSize={item.gridSize}
				tags={item.tags}
				stats={item.stats}
			/>
		{/each}
	</div>
</section>
```

**Grid Layout Rules**:
- **Mobile** (< 768px): Single column (`grid-cols-1`)
- **Desktop** (≥ 768px): 4 columns (`md:grid-cols-4`)
- **Gap**: 1.5rem (24px) between cards
- **Grid sizing**: Cards can span multiple columns/rows via `gridSize`

**Example grid configurations**:
```
| 2x2 Feature Card | 2x1 Card      |
|                  |---------------|
|                  | 1x1 | 1x1     |
```

---

## Animation Implementation

### Scroll-Triggered Entrance

Using `svelte-intersection-observer`:

```svelte
<script>
	import { inView } from 'svelte-intersection-observer';
	
	let cardRefs = [];
	let visibleCards = new Set();
	
	function handleEnter(index: number) {
		visibleCards.add(index);
		visibleCards = visibleCards; // Trigger reactivity
	}
</script>

{#each expertise as item, i (item.id)}
	<div
		use:inView={{ threshold: 0.2 }}
		on:enter={() => handleEnter(i)}
		class:animate-slide-up={visibleCards.has(i)}
		style="animation-delay: {i * 100}ms;"
	>
		<BentoCard {...item} />
	</div>
{/each}
```

### Staggered Animation CSS

Add to `src/lib/styles/app.css`:

```css
@layer utilities {
	.animate-slide-up {
		animation: slideUp 0.8s ease-out both;
	}
	
	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
}
```

---

## Responsive Behavior

### Breakpoint-Specific Grid Changes

```svelte
<!-- Large feature card (desktop: 2x2, mobile: full width) -->
<div class="md:col-span-2 md:row-span-2">
	<BentoCard ... />
</div>

<!-- Standard card (desktop: 2x1, mobile: full width) -->
<div class="md:col-span-2">
	<BentoCard ... />
</div>

<!-- Small card (desktop: 1x1, mobile: full width) -->
<div class="md:col-span-1">
	<BentoCard ... />
</div>
```

### Mobile Optimizations

- **Padding reduction**: Consider `p-6` on mobile vs `p-8` on desktop
- **Font scaling**: Title size reduces on mobile
- **Stats grid**: Remains 2-column even on mobile for readability

```svelte
<h3 class="text-xl md:text-2xl font-bold ...">
	{title}
</h3>
```

---

## Testing Checklist

### Visual Testing
- [ ] Grid renders in 4 columns on desktop
- [ ] Grid collapses to single column on mobile
- [ ] Background icons visible at correct opacity
- [ ] Hover effect triggers (border glow, icon rotate)
- [ ] All fonts load (Space Grotesk, Material Symbols)
- [ ] Yellow accent color displays correctly

### Interaction Testing
- [ ] Cards reveal on scroll (Intersection Observer)
- [ ] Staggered animation plays smoothly
- [ ] Hover state applies to individual cards only
- [ ] Background icon scales and rotates on hover
- [ ] Tags wrap correctly on smaller cards
- [ ] Stats display in 2-column grid

### Data Flow Testing
- [ ] JSON data loads without errors
- [ ] All expertise items render
- [ ] Props pass correctly from container to leaf
- [ ] Missing stats/tags handled gracefully
- [ ] Grid size classes apply correctly

### Accessibility Testing
- [ ] Heading hierarchy correct (h2 for section, h3 for cards)
- [ ] Color contrast meets WCAG AA standards
- [ ] Icons have proper semantic meaning (decorative)
- [ ] Cards are keyboard accessible (if interactive)
- [ ] Reduced motion respected (see CSS media query)

### Performance Testing
- [ ] Smooth scroll (60fps) with many cards
- [ ] Intersection Observer doesn't cause lag
- [ ] Hover transitions smooth (no jank)
- [ ] Images/icons load efficiently

---

## Content Guidelines

### Writing Effective Descriptions
- **Length**: 2-3 sentences (80-120 characters)
- **Tone**: Technical but accessible
- **Focus**: What you know, not what you want to learn
- **Example**: ❌ "Interested in machine learning" ✅ "Completed 12+ ML courses covering neural networks, deep learning, and model deployment"

### Choosing Icons
**Material Symbols Library**: https://fonts.google.com/icons

**Recommended icons**:
- AI/ML: `psychology`, `neurology`, `memory`, `auto_awesome`
- Security: `shield`, `security`, `lock`, `verified_user`
- Architecture: `architecture`, `hub`, `lan`, `account_tree`
- Development: `code`, `data_object`, `terminal`, `integration_instructions`

### Grid Layout Best Practices
- **Feature skill** (most important): 2x2 (large card with stats)
- **Secondary skills**: 2x1 (medium cards)
- **Supporting skills**: 1x1 (small cards)
- **Balance**: Mix sizes for visual interest

---

## Customization Options

### Card Variants

**Option 1: Stats-heavy (for quantifiable skills)**
```json
{
	"stats": [
		{ "label": "Accuracy", "value": "98%" },
		{ "label": "Projects", "value": "15+" }
	]
}
```

**Option 2: Tag-focused (for tech stacks)**
```json
{
	"tags": ["React", "Vue", "Svelte", "TypeScript", "Node.js"]
}
```

**Option 3: Minimal (description only)**
```json
{
	"stats": [],
	"tags": []
}
```

### Color Accents

Override accent color for specific cards:

```svelte
<div class="bento-card" style="--accent: #38bdf8;">
	<!-- Blue accent instead of yellow -->
</div>
```

---

## Integration with Homepage

Add to `src/routes/+page.svelte`:

```svelte
<script>
	import ExpertiseGrid from '$lib/components/expertise/ExpertiseGrid.svelte';
</script>

<main class="pt-24">
	<!-- Other sections ... -->
	
	<ExpertiseGrid />
	
	<!-- Other sections ... -->
</main>
```

---

## Next Steps

After expertise grid is complete:

1. ✅ Verify data loads from JSON
2. ✅ Test responsive grid behavior
3. ➡️ Create placeholder expertise data for Martin
4. ➡️ Source or create background icon graphics
5. ➡️ Proceed to Timeline Component (F3-TIMELINE)

---

## Acceptance Criteria

Expertise grid is complete when:

- [x] JSON data file created with placeholder content
- [x] BentoCard component accepts all required props
- [x] ExpertiseGrid renders cards from data
- [x] Grid is responsive (4-col → 1-col)
- [x] Hover effects work (glow, icon animation)
- [x] Scroll animations trigger correctly
- [x] All cards display correctly on mobile
- [x] No console errors or warnings
- [x] Accessibility requirements met

---

**Implementation Time**: 4-5 hours  
**Complexity**: Medium-High  
**Blocker**: None  
**Status**: 📋 READY FOR IMPLEMENTATION

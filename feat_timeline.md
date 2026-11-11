# Feature Implementation Plan: Timeline Component

**Feature ID**: `F3-TIMELINE`  
**Phase**: 5 - Timeline Component  
**Priority**: HIGH  
**Dependencies**: F0-PROJECT-SETUP  
**Estimated Effort**: 4-5 hours

---

## Objective

Create a vertical timeline component displaying work experience and educational milestones with interactive nodes, hover effects, and scroll animations.

---

## Data Structure

### Timeline Data File

**File**: `src/lib/content/data/timeline.json`

```json
{
	"timeline": [
		{
			"id": "work-1",
			"period": "2020 - PRESENT",
			"role": "Senior Developer / Architect",
			"company": "Company Name",
			"type": "work",
			"description": "Led development of secure, scalable applications. Responsible for architecture decisions, security assessments, and purple team testing collaboration with penetration testers.",
			"achievements": [
				"Reduced security vulnerabilities by 68% through systematic code reviews",
				"Architected microservices platform serving 100K+ daily users",
				"Implemented zero-trust security model across team's codebase"
			],
			"tags": ["Architecture", "Security", "Purple Team", "Python"],
			"status": "active"
		},
		{
			"id": "edu-1",
			"period": "2023 - 2024",
			"role": "Machine Learning Specialization",
			"company": "Coursera / deeplearning.ai",
			"type": "education",
			"description": "Completed Andrew Ng's comprehensive ML courses covering supervised learning, neural networks, deep learning, and practical ML deployment strategies.",
			"achievements": [
				"Completed 12+ courses in ML fundamentals",
				"Built and deployed neural network models",
				"Studied advanced topics: CNNs, RNNs, transformers"
			],
			"tags": ["Machine Learning", "Deep Learning", "PyTorch", "TensorFlow"],
			"status": "completed"
		},
		{
			"id": "edu-2",
			"period": "2023 - PRESENT",
			"role": "Security Training & Pentesting",
			"company": "TryHackMe",
			"type": "education",
			"description": "Hands-on security training through CTF challenges, penetration testing labs, and defensive security modules.",
			"achievements": [
				"Completed 50+ security challenges",
				"Earned certifications in web security",
				"Practiced OWASP Top 10 vulnerability exploitation"
			],
			"tags": ["Security", "Pentesting", "OWASP", "CTF"],
			"status": "active"
		},
		{
			"id": "work-2",
			"period": "2017 - 2020",
			"role": "Full-Stack Developer",
			"company": "Previous Company",
			"type": "work",
			"description": "Developed and maintained web applications using modern JavaScript frameworks and backend technologies.",
			"achievements": [],
			"tags": ["React", "Node.js", "PostgreSQL"],
			"status": "completed"
		}
	]
}
```

**TypeScript Interface**:
```typescript
interface TimelineItem {
	id: string;
	period: string;
	role: string;
	company: string;
	type: 'work' | 'education';
	description: string;
	achievements: string[];
	tags: string[];
	status: 'active' | 'completed';
}
```

---

## Component Specifications

### 1. TimelineItem Component (Leaf)

**File**: `src/lib/components/timeline/TimelineItem.svelte`

**Purpose**: Individual timeline entry with node indicator

**Props Interface**:
```typescript
interface TimelineItemProps {
	period: string;
	role: string;
	company: string;
	type: 'work' | 'education';
	description: string;
	achievements?: string[];
	tags?: string[];
	status: 'active' | 'completed';
	isLast?: boolean;  // Hide line after last item
}
```

**Implementation**:
```svelte
<script lang="ts">
	export let period: string;
	export let role: string;
	export let company: string;
	export let type: 'work' | 'education' = 'work';
	export let description: string;
	export let achievements: string[] = [];
	export let tags: string[] = [];
	export let status: 'active' | 'completed' = 'completed';
	export let isLast: boolean = false;
	
	// Animation state
	let isVisible = false;
	
	// Status-based styling
	$: nodeColor = status === 'active' ? 'primary-container' : 'slate-700';
	$: periodColor = status === 'active' ? 'primary-container' : 'white/40';
	
	// Type-based icon
	$: typeIcon = type === 'work' ? 'work' : 'school';
</script>

<div 
	class="relative pl-12 group"
	class:animate-slide-left={isVisible}
	use:inView={{ threshold: 0.3 }}
	on:enter={() => isVisible = true}
>
	<!-- Timeline Node -->
	<div 
		class="absolute left-0 top-1.5 w-6 h-6 rounded-none bg-[#020617] border-2 border-{nodeColor} flex items-center justify-center transition-all duration-300"
		class:shadow-[0_0_15px_#fde047]={status === 'active'}
		class:group-hover:shadow-[0_0_15px_#fde047]={status === 'completed'}
		class:group-hover:border-primary-container={status === 'completed'}
	>
		<div class="w-2 h-2 bg-{nodeColor}"></div>
	</div>
	
	<!-- Content Grid -->
	<div class="grid md:grid-cols-4 gap-8">
		<!-- Left Column: Date/Role -->
		<div class="md:col-span-1">
			<div class="flex items-center gap-2 mb-2">
				<span class="material-symbols-outlined text-sm text-{periodColor}">
					{typeIcon}
				</span>
				<span class="font-mono text-xl font-bold text-{periodColor}">
					{period}
				</span>
			</div>
			<div class="text-[10px] font-bold tracking-widest text-white/30 uppercase">
				{role}
			</div>
		</div>
		
		<!-- Right Column: Content Card -->
		<div class="md:col-span-3 bento-card p-8 group-hover:border-primary-container/20">
			<!-- Company Name -->
			<h3 class="text-2xl font-bold mb-4 tracking-tighter uppercase">
				{company}
			</h3>
			
			<!-- Description -->
			<p class="text-on-surface-variant leading-relaxed mb-6">
				{description}
			</p>
			
			<!-- Achievements -->
			{#if achievements.length > 0}
				<ul class="space-y-2 mb-6">
					{#each achievements as achievement}
						<li class="flex items-start gap-3 text-sm text-on-surface-variant">
							<span class="material-symbols-outlined text-primary-container text-xs mt-0.5">
								check_circle
							</span>
							<span>{achievement}</span>
						</li>
					{/each}
				</ul>
			{/if}
			
			<!-- Tags & Status -->
			<div class="flex items-center justify-between flex-wrap gap-4">
				<!-- Tags -->
				<div class="flex gap-3 flex-wrap">
					{#each tags as tag}
						<span class="px-3 py-1 bg-surface text-primary-container/60 text-[9px] font-bold tracking-[0.2em] uppercase border border-primary-container/10">
							{tag}
						</span>
					{/each}
				</div>
				
				<!-- Status Badge -->
				<div class="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em]"
					class:text-primary-container={status === 'active'}
					class:text-white/20={status === 'completed'}
				>
					<span>[ STATUS: {status.toUpperCase()} ]</span>
				</div>
			</div>
		</div>
	</div>
</div>

<script context="module" lang="ts">
	import { inView } from 'svelte-intersection-observer';
</script>
```

**Styling Notes**:
- **Node**: Square (6x6), 2px border, centered dot (2x2)
- **Active node**: Yellow border with glow effect
- **Inactive node**: Gray border, glows yellow on hover
- **Card**: Same bento-card styling as expertise
- **Layout**: 1 column (date/role) + 3 columns (content)

---

### 2. Timeline Component (Container)

**File**: `src/lib/components/timeline/Timeline.svelte`

**Purpose**: Timeline container with vertical line and data loading

**Implementation**:
```svelte
<script lang="ts">
	import TimelineItem from './TimelineItem.svelte';
	import SectionHeader from '$lib/components/shared/SectionHeader.svelte';
	import timelineData from '$lib/content/data/timeline.json';
	
	const { timeline } = timelineData;
</script>

<section class="max-w-screen-2xl mx-auto px-8 mb-40" id="timeline">
	<SectionHeader 
		title="Timeline Logs" 
		subtitle="CHRONO_STATUS"
		prefix="// 03"
	/>
	
	<!-- Timeline Container with Vertical Line -->
	<div class="relative space-y-24 before:absolute before:left-[11px] before:top-0 before:h-full before:w-[2px] before:bg-slate-800">
		{#each timeline as item, i (item.id)}
			<TimelineItem
				period={item.period}
				role={item.role}
				company={item.company}
				type={item.type}
				description={item.description}
				achievements={item.achievements}
				tags={item.tags}
				status={item.status}
				isLast={i === timeline.length - 1}
			/>
		{/each}
	</div>
</section>
```

**Vertical Line Styling**:
```css
/* Pseudo-element for timeline line */
.before\:absolute::before {
	content: '';
	position: absolute;
	left: 11px;  /* Centers on 24px node (12px - 1px border) */
	top: 0;
	height: 100%;
	width: 2px;
	background-color: #1e293b;  /* slate-800 */
}
```

---

## Animation Implementation

### Slide-In from Left

Add to `src/lib/styles/app.css`:

```css
@layer utilities {
	.animate-slide-left {
		animation: slideLeft 0.8s ease-out both;
	}
	
	@keyframes slideLeft {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
}
```

### Staggered Timeline Reveals

```svelte
{#each timeline as item, i (item.id)}
	<div style="animation-delay: {i * 150}ms;">
		<TimelineItem {...item} />
	</div>
{/each}
```

---

## Responsive Behavior

### Desktop Layout (≥ 768px)
```
[Node] --- [Period/Role] | [Content Card (3 cols wide)]
```

### Mobile Layout (< 768px)
```
[Node]
[Period/Role]
[Content Card (full width)]
```

**Mobile adjustments**:
```svelte
<!-- Stack vertically on mobile -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
	<!-- Period/Role column -->
	<div class="md:col-span-1">...</div>
	
	<!-- Content card spans full width on mobile -->
	<div class="md:col-span-3">...</div>
</div>
```

---

## Interactive Features

### Node Hover Effects

```svelte
<div 
	class="timeline-node"
	class:active={status === 'active'}
	class:hover:glow={status === 'completed'}
>
	<div class="node-dot"></div>
</div>

<style>
	.timeline-node {
		transition: all 0.3s ease;
	}
	
	.timeline-node.active {
		box-shadow: 0 0 15px rgba(253, 224, 71, 0.6);
	}
	
	.timeline-node:hover.hover\:glow {
		border-color: #fde047;
		box-shadow: 0 0 15px rgba(253, 224, 71, 0.4);
	}
</style>
```

### Card Expand/Collapse (Optional Enhancement)

For long achievement lists:

```svelte
<script>
	let expanded = false;
	
	function toggleExpand() {
		expanded = !expanded;
	}
</script>

{#if achievements.length > 3}
	<ul class:max-h-40={!expanded} class:overflow-hidden={!expanded}>
		{#each achievements as achievement}
			<li>...</li>
		{/each}
	</ul>
	
	<button on:click={toggleExpand}>
		{expanded ? 'Show less' : 'Show more'}
	</button>
{/if}
```

---

## Testing Checklist

### Visual Testing
- [ ] Vertical line renders correctly
- [ ] Nodes align with line center
- [ ] Active nodes glow yellow
- [ ] Inactive nodes are gray
- [ ] Cards display with bento styling
- [ ] Mobile layout stacks correctly

### Interaction Testing
- [ ] Nodes glow on hover (inactive ones)
- [ ] Cards elevate on hover
- [ ] Timeline items reveal on scroll
- [ ] Staggered animation plays smoothly
- [ ] Achievement list displays correctly

### Data Flow Testing
- [ ] JSON data loads without errors
- [ ] All timeline items render
- [ ] Work/education types differentiate correctly
- [ ] Active/completed status displays correctly
- [ ] Missing achievements handled gracefully

### Content Testing
- [ ] Long company names don't overflow
- [ ] Long descriptions wrap correctly
- [ ] Many tags wrap to multiple lines
- [ ] Empty achievements array doesn't break layout

### Accessibility Testing
- [ ] Timeline is keyboard navigable
- [ ] Screen reader announces items correctly
- [ ] Semantic HTML (lists for achievements)
- [ ] Sufficient color contrast
- [ ] Icons are decorative (aria-hidden)

### Performance Testing
- [ ] Smooth scroll with many timeline items
- [ ] No layout shift during animation
- [ ] Hover transitions smooth (60fps)

---

## Content Guidelines

### Writing Timeline Entries

**Period formatting**:
- Active: `"2020 - PRESENT"`
- Completed: `"2019 - 2022"`
- Single year: `"2023"`

**Role descriptions** (2-3 sentences):
- Focus on impact and responsibilities
- Use action verbs (Led, Architected, Implemented)
- Quantify when possible (68%, 100K users)

**Achievement bullets** (3-5 per entry):
- Start with strong verbs
- Include metrics where applicable
- Keep to 1-2 lines each

**Tags** (3-6 per entry):
- Technologies used
- Key methodologies
- Domain areas

---

## Customization Options

### Timeline Variants

**Option 1: Minimal (no achievements)**
```json
{
	"achievements": [],
	"description": "Concise 2-3 sentence summary covering key points."
}
```

**Option 2: Detailed (with achievements)**
```json
{
	"achievements": [
		"Achievement 1",
		"Achievement 2",
		"Achievement 3"
	]
}
```

**Option 3: Hybrid (education + work mixed)**
```json
{
	"timeline": [
		{ "type": "work", ... },
		{ "type": "education", ... },
		{ "type": "work", ... }
	]
}
```

### Status Indicators

**Visual variants**:
- Active: Yellow border + glow
- Completed: Gray border
- In Progress: Blue border (add new status)

```svelte
{#if status === 'in-progress'}
	<span class="border-tertiary-container">
		<span class="material-symbols-outlined">schedule</span>
	</span>
{/if}
```

---

## Integration with Homepage

Add to `src/routes/+page.svelte`:

```svelte
<script>
	import Timeline from '$lib/components/timeline/Timeline.svelte';
</script>

<main class="pt-24">
	<!-- Other sections ... -->
	
	<Timeline />
	
	<!-- Other sections ... -->
</main>
```

---

## Martin's Timeline Data (Placeholder)

Based on our discussion, here's a starter timeline:

```json
{
	"timeline": [
		{
			"id": "ml-study",
			"period": "2023 - PRESENT",
			"role": "Machine Learning & Deep Learning",
			"company": "Self-Directed Study (Coursera, deeplearning.ai)",
			"type": "education",
			"description": "Intensive study of ML fundamentals through Andrew Ng's courses. Covered supervised learning, neural networks, deep learning architectures, and practical ML deployment.",
			"achievements": [
				"Completed 12+ courses in ML/DL fundamentals",
				"Studied 300+ hours covering math, theory, and implementation",
				"Built and trained neural networks using PyTorch and TensorFlow"
			],
			"tags": ["Machine Learning", "Deep Learning", "Python", "PyTorch"],
			"status": "active"
		},
		{
			"id": "security-study",
			"period": "2023 - PRESENT",
			"role": "Security & Penetration Testing",
			"company": "TryHackMe",
			"type": "education",
			"description": "Hands-on security training through CTF challenges and penetration testing labs. Focus on web application security, OWASP Top 10, and defensive security.",
			"achievements": [
				"Completed 50+ security challenges and labs",
				"Practiced exploitation of common web vulnerabilities",
				"Earned certifications in offensive and defensive security"
			],
			"tags": ["Security", "Pentesting", "OWASP", "TryHackMe"],
			"status": "active"
		},
		{
			"id": "senior-dev",
			"period": "2020 - PRESENT",
			"role": "Senior Developer / Architect",
			"company": "[Company Name]",
			"type": "work",
			"description": "Led development of secure, scalable applications. Responsible for architecture decisions, security assessments, and purple team collaboration with penetration testers.",
			"achievements": [
				"Architected microservices platform serving 100K+ users",
				"Reduced security vulnerabilities by 68% through systematic reviews",
				"Implemented zero-trust security model across team's codebase"
			],
			"tags": ["Architecture", "Security", "Purple Team", "Python"],
			"status": "active"
		}
	]
}
```

---

## Next Steps

After timeline is complete:

1. ✅ Create timeline.json with Martin's actual data
2. ✅ Test with various entry counts (2, 5, 10 items)
3. ➡️ Integrate with homepage
4. ➡️ Proceed to Contact Section (F4-CONTACT)

---

## Acceptance Criteria

Timeline component is complete when:

- [x] JSON data file created with placeholder content
- [x] TimelineItem component accepts all required props
- [x] Timeline renders items from data
- [x] Vertical line connects all nodes
- [x] Active/completed status displays correctly
- [x] Hover effects work on nodes and cards
- [x] Scroll animations trigger correctly
- [x] Responsive layout works (desktop + mobile)
- [x] No console errors or warnings
- [x] Accessibility requirements met

---

**Implementation Time**: 4-5 hours  
**Complexity**: Medium  
**Blocker**: None  
**Status**: 📋 READY FOR IMPLEMENTATION

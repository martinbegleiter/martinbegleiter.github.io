<script lang="ts">
	import { page } from '$app/state';
	import TimelineItem from './TimelineItem.svelte';
	import SectionHeader from '../shared/SectionHeader.svelte';
	import ScrollReveal from '../shared/ScrollReveal.svelte';
	import { timeline } from '$lib/content/data/timeline';
	import { localeFromPathname } from '$lib/i18n/locales';
	import { getDictionary } from '$lib/i18n/dictionaries';

	const lang = $derived(localeFromPathname(page.url.pathname));
	const dict = $derived(getDictionary(lang));
	const items = $derived(timeline[lang]);
</script>

<section id="timeline" class="scroll-mt-20 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
	<ScrollReveal>
		<SectionHeader title={dict.timeline.title} subtitle={dict.timeline.subtitle} prefix="03" />
	</ScrollReveal>

	<div class="relative space-y-8 md:space-y-16">
		<!-- Vertical Timeline Line -->
		<div class="absolute left-[7px] md:left-[11px] top-2 h-full w-0.25" style="background-color: #fde047;"></div>

		{#each items as item}
			<ScrollReveal>
				<TimelineItem {...item} status="active" />
			</ScrollReveal>
		{/each}
	</div>
</section>

<script lang="ts">
	import { page } from '$app/state';
	import BentoCard from './BentoCard.svelte';
	import SectionHeader from '../shared/SectionHeader.svelte';
	import ScrollReveal from '../shared/ScrollReveal.svelte';
	import { expertise } from '$lib/content/data/expertise';
	import { localeFromPathname } from '$lib/i18n/locales';
	import { getDictionary } from '$lib/i18n/dictionaries';

	const lang = $derived(localeFromPathname(page.url.pathname));
	const dict = $derived(getDictionary(lang));
	const items = $derived(expertise[lang]);
</script>

<section id="expertise" class="scroll-mt-20 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
	<ScrollReveal>
		<SectionHeader title={dict.expertise.title} subtitle={dict.expertise.subtitle} prefix="02" />
	</ScrollReveal>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-4">
		{#each items as item, i}
			<ScrollReveal
			animationClass="animate-fade-in"
			style="animation-delay: {i * 100}ms"
			class={item.gridSize}>
				<BentoCard {...item} />
			</ScrollReveal>
		{/each}
	</div>
</section>

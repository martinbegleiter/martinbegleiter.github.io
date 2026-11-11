<script lang="ts">
	import { page } from '$app/state';
	import HeroSection from '$lib/components/hero/HeroSection.svelte';
	import ExpertiseGrid from '$lib/components/expertise/ExpertiseGrid.svelte';
	import Timeline from '$lib/components/timeline/Timeline.svelte';
	import ContactSection from '$lib/components/contact/ContactSection.svelte';
	import { localeFromPathname } from '$lib/i18n/locales';
	import { getDictionary } from '$lib/i18n/dictionaries';

	const lang = $derived(localeFromPathname(page.url.pathname));
	const dict = $derived(getDictionary(lang));

	// Decorative boot sequence - intentionally kept as English themed flavor
	const heroCommands = [
		'Booting system kernel V.2.0.4_STABLE...',
		'Initializing AI Integrity Protocols... [OK]',
		'Loading Security Architecture Modules... [OK]'
	];

	const contactData = {
		email: 'contact@martinbegleiter.com',
		linkedin: 'https://www.linkedin.com/in/martin-begleiter-56a0b010/',
		github: 'https://github.com/martinbegleiter'
	};
</script>

<svelte:head>
	<title>MARTIN BEGLEITER // Portfolio</title>
</svelte:head>

<HeroSection
	firstName="MARTIN"
	lastName="BEGLEITER"
	role={dict.hero.role}
	commands={heroCommands}
	imageSrc="/images/profile/me-stylized-accent.jpg"
/>

<ExpertiseGrid />

<Timeline />

<ContactSection {...contactData} />

<script lang="ts">
	import type { Snippet } from 'svelte';
	import NavBar from '$lib/components/navigation/NavBar.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	import { STORAGE_KEY } from '$lib/i18n/locales';
	import type { Locale } from '$lib/i18n/locales';

	let {
		children,
		data
	}: { children: Snippet; data: { lang: Locale } } = $props();

	$effect(() => {
		try {
			window.localStorage.setItem(STORAGE_KEY, data.lang);
		} catch {
			// storage unavailable - ignore, the locale simply won't persist
		}
	});
</script>

<NavBar />

<main class="pt-24 overflow-x-hidden">
	{@render children()}
</main>

<Footer />

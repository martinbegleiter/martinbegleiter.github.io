<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { defaultLocale, localeFromNavigator, localeFromStorage, locales } from '$lib/i18n/locales';
	import type { Locale } from '$lib/i18n/locales';

	onMount(() => {
		const stored = localeFromStorage(window.localStorage);
		const locale: Locale = stored ?? localeFromNavigator(navigator.languages) ?? defaultLocale;
		goto(`/${locale}`, { replaceState: true });
	});
</script>

<svelte:head>
	<title>MARTIN BEGLEITER // Portfolio</title>
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#020617] text-center">
	<div class="font-mono text-xs tracking-[0.5em] text-primary uppercase animate-pulse">
		INITIALIZING_LOCALE...
	</div>

	<noscript>
		<div class="flex flex-col items-center gap-2">
			<p class="font-mono text-xs text-white/50 uppercase">Please choose a language:</p>
			<div class="flex gap-4">
				{#each locales as locale}
					<a href={`/${locale}`} class="font-mono text-sm text-primary hover:underline uppercase">
						{locale}
					</a>
				{/each}
			</div>
		</div>
	</noscript>
</div>

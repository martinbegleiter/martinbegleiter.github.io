<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { locales, STORAGE_KEY, localeFromPathname, type Locale } from '$lib/i18n/locales';

	interface Props {
		/** Optional callback invoked after a successful locale switch. */
		onchange?: () => void;
	}

	let { onchange }: Props = $props();

	const lang = $derived(localeFromPathname(page.url.pathname));

	/** Override the current locale: persist the choice and navigate to the same route in the new locale. */
	function switchLocale(locale: Locale) {
		if (locale === lang) return;
		try {
			window.localStorage.setItem(STORAGE_KEY, locale);
		} catch {
			// storage unavailable - the override simply won't persist
		}
		const newPath = '/' + locale + page.url.pathname.replace(/^\/[a-z]{2}/, '');
		goto(newPath + page.url.hash);
		onchange?.();
	}
</script>

<div class="flex items-center overflow-hidden rounded-sm border border-slate-700">
	{#each locales as locale}
		<button
			onclick={() => switchLocale(locale)}
			aria-label={`Language: ${locale}`}
			aria-current={locale === lang ? 'true' : undefined}
			class="px-2.5 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors {locale ===
			lang
				? 'bg-primary text-on-primary-container'
				: 'text-white/50 hover:bg-slate-800 hover:text-white'}"
		>
			{locale}
		</button>
	{/each}
</div>

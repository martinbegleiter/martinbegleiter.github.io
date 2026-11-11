<script lang="ts">
	import { page } from '$app/state';
	import { localeFromPathname } from '$lib/i18n/locales';
	import { getDictionary } from '$lib/i18n/dictionaries';

	const lang = $derived(localeFromPathname(page.url.pathname));
	const dict = $derived(getDictionary(lang));
</script>

<footer class="border-primary/5 w-full border-t bg-[#020617] py-16">
	<div class="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-6 px-4 sm:px-6 lg:px-8">
		<!-- Social Links -->
		<div class="flex flex-wrap justify-center gap-6 sm:gap-8">
			<a
				href="https://github.com/begleiter"
				class="text-white/30 hover:text-primary-container font-sans text-xs md:text-[9px] tracking-widest uppercase transition-colors inline-flex items-center gap-2"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src="/images/brands/github.svg" alt="GitHub" class="h-4 w-4 object-contain" loading="lazy" />
				GITHUB
			</a>
			<a
				href="https://linkedin.com/in/mbegleiter"
				class="text-white/30 hover:text-primary-container font-sans text-xs md:text-[9px] tracking-widest uppercase transition-colors inline-flex items-center gap-2"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src="/images/brands/linkedin.svg" alt="LinkedIn" class="h-4 w-4 object-contain" loading="lazy" />
				LINKEDIN
			</a>
			<a
				href="mailto:contact@martinbegleiter.com"
				class="text-white/30 hover:text-primary-container font-sans text-xs md:text-[9px] tracking-widest uppercase transition-colors"
			>
				{dict.footer.email}
			</a>
		</div>

		<!-- Copyright -->
		<div class="font-sans text-[10px] md:text-[9px] tracking-tighter uppercase opacity-50 text-center">
			© 2026 MARTIN_BEGLEITER // SECURE_CONNECTION
		</div>

		<!-- Status Indicator (decorative) -->
		<div class="flex items-center gap-2 opacity-20">
			<div class="bg-primary-container h-2 w-2 animate-pulse rounded-full"></div>
			<span class="font-mono text-[9px] md:text-[8px] tracking-[0.5em] uppercase">SYSTEM_UPTIME: 100%</span>
		</div>
	</div>
</footer>

<script lang="ts">
	import { page } from '$app/state';
	import SectionHeader from '../shared/SectionHeader.svelte';
	import ScrollReveal from '../shared/ScrollReveal.svelte';
	import ContactForm from './ContactForm.svelte';
	import { localeFromPathname } from '$lib/i18n/locales';
	import { getDictionary } from '$lib/i18n/dictionaries';

	interface Props {
		email?: string;
		linkedin?: string;
		github?: string;
	}

	let { email, linkedin, github }: Props = $props();

	const lang = $derived(localeFromPathname(page.url.pathname));
	const dict = $derived(getDictionary(lang));
</script>

<section id="contact" class="scroll-mt-20 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
	<ScrollReveal>
		<SectionHeader title={dict.contact.title} subtitle={dict.contact.subtitle} prefix="04" />
	</ScrollReveal>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
		<ScrollReveal animationClass="animate-fade-in">
			<div class="space-y-12">
				<div>
					<h3 class="font-mono text-xs tracking-[0.5em] text-primary uppercase mb-4">
						{dict.contact.strategicCommunication}
					</h3>
					<p class="text-on-surface-variant leading-relaxed uppercase text-sm tracking-wider">
						{dict.contact.intro}
					</p>
				</div>

				<div class="space-y-6">
					<h3 class="font-mono text-xs tracking-[0.5em] text-primary uppercase mb-2">
						{dict.contact.directAccess}
					</h3>
					<div class="space-y-4">
						{#if email}
							<a
								href="mailto:{email}"
								class="flex items-center gap-4 group transition-colors hover:text-primary"
							>
								<span
									class="material-symbols-outlined text-xl p-3 bg-slate-900 border border-slate-800 group-hover:border-primary transition-colors"
								>
									alternate_email
								</span>
								<div class="flex flex-col">
									<span class="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest"
										>{dict.contact.email}</span
									>
									<span class="font-mono text-sm uppercase">{email}</span>
								</div>
							</a>
						{/if}

						{#if linkedin}
							<a
								href={linkedin}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-4 group transition-colors hover:text-primary"
							>
								<span
									class="flex items-center justify-center p-3 bg-slate-900 border border-slate-800 group-hover:border-primary transition-colors"
								>
									<span
										class="h-5 w-5 bg-current [mask-image:url('/images/brands/linkedin.svg')] [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain]"
										aria-label="LinkedIn"
									></span>
								</span>
								<div class="flex flex-col">
									<span class="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest"
										>LinkedIn</span
									>
									<span class="font-mono text-sm uppercase">{linkedin}</span>
								</div>
							</a>
						{/if}

						{#if github}
							<a
								href={github}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-4 group transition-colors hover:text-primary"
							>
								<span
									class="flex items-center justify-center p-3 bg-slate-900 border border-slate-800 group-hover:border-primary transition-colors"
								>
									<span
										class="h-5 w-5 bg-current [mask-image:url('/images/brands/github.svg')] [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain]"
										aria-label="GitHub"
									></span>
								</span>
								<div class="flex flex-col">
									<span class="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest"
										>GitHub</span
									>
									<span class="font-mono text-sm uppercase">{github}</span>
								</div>
							</a>
						{/if}
					</div>
				</div>
			</div>
		</ScrollReveal>

		<ScrollReveal animationClass="animate-fade-in" style="animation-delay: 200ms">
			<div class="relative">
				<!-- Terminal Glow Background -->
				<div
					class="absolute -inset-4 bg-primary/5 blur-3xl rounded-full opacity-30 pointer-events-none"
				></div>

				<ContactForm {email} {linkedin} {github} />
			</div>
		</ScrollReveal>
	</div>
</section>

<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import NavLink from './NavLink.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import Button from '../shared/Button.svelte';
	import favicon from '$lib/assets/martin_favicon_hair.png';
	import { localeFromPathname } from '$lib/i18n/locales';
	import { getDictionary } from '$lib/i18n/dictionaries';

	let activeSection = $state('home');
	let mobileMenuOpen = $state(false);

	const lang = $derived(localeFromPathname(page.url.pathname));
	const dict = $derived(getDictionary(lang));

	// Derived state to check if we are on the (localized) blog
	let isBlog = $derived(page.url.pathname.startsWith(`/${lang}/blog`));

	function handleNavClick(event: MouseEvent, href: string) {
		const targetId = href.replace('#', '');

		// If we are on the blog page or any other page, let the default link behavior take over
		if (page.url.pathname !== `/${lang}`) {
			return;
		}

		const element = document.getElementById(targetId);

		if (element) {
			event.preventDefault();
			const headerOffset = 80;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
			mobileMenuOpen = false;
		}
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	onMount(() => {
		const sections = ['home', 'expertise', 'timeline', 'contact'];

		const visibleSections = new Set<string>();

		// Initialize activeSection from URL hash if present
		if (page.url.hash) {
			const hashId = page.url.hash.replace('#', '');
			if (sections.includes(hashId)) {
				activeSection = hashId;
			}
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleSections.add(entry.target.id);
					} else {
						visibleSections.delete(entry.target.id);
					}
					// Update activeSection based on the currently visible sections
					if (visibleSections.size > 0) {
						const sorted = Array.from(visibleSections).sort((a, b) => {
							return Math.abs(document.getElementById(a)!.getBoundingClientRect().top) - Math.abs(document.getElementById(b)!.getBoundingClientRect().top);
						});

						activeSection = sorted[sorted.length - 1];
					}
				});
			},
			{ threshold: 0, rootMargin: '-100px 0px -50% 0px' }
		);

		sections.forEach((id) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		const handleResize = () => {
			if (window.innerWidth >= 768) {
				mobileMenuOpen = false;
			}
		};
		window.addEventListener('resize', handleResize);

		return () => {
			observer.disconnect();
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<header
	class="fixed top-0 z-50 w-full border-b border-yellow-400/10 bg-[#020617]/90 shadow-[0_0_20px_rgba(253,224,71,0.05)] backdrop-blur-md"
>
	<div class="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
		<!-- Logo / Name -->
		<div class="flex items-center gap-2 sm:gap-3">
			<img src={favicon} alt="Martin Begleiter" class="h-6 w-6 sm:h-8 sm:w-8" />
			<div class="font-headline text-primary-container text-base sm:text-xl font-extrabold tracking-tighter">
				MARTIN_BEGLEITER
			</div>
		</div>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-8 md:flex">
			<NavLink
				href={`/${lang}/#home`}
				label={dict.nav.home}
				isActive={!isBlog && activeSection === 'home'}
				onclick={(e) => handleNavClick(e, '#home')}
			/>
			<NavLink
				href={`/${lang}/#expertise`}
				label={dict.nav.expertise}
				isActive={!isBlog && activeSection === 'expertise'}
				onclick={(e) => handleNavClick(e, '#expertise')}
			/>
			<NavLink
				href={`/${lang}/#timeline`}
				label={dict.nav.timeline}
				isActive={!isBlog && activeSection === 'timeline'}
				onclick={(e) => handleNavClick(e, '#timeline')}
			/>
			<NavLink
				href={`/${lang}/#contact`}
				label={dict.nav.contact}
				isActive={!isBlog && activeSection === 'contact'}
				onclick={(e) => handleNavClick(e, '#contact')}
			/>
		</nav>

		<!-- Right side actions -->
		<div class="flex items-center gap-4">
			<LanguageSwitcher />

			<div class="hidden md:block">
				<Button href={`/${lang}/blog`} variant="primary" class="py-1.5! text-[10px]!"
					>{dict.nav.viewBlog}</Button
				>
			</div>

			<!-- Mobile menu button -->
			<button
				onclick={toggleMobileMenu}
				class="flex h-10 w-10 items-center justify-center text-primary-container md:hidden"
				aria-label="Toggle menu"
			>
				<span class="material-symbols-outlined">
					{mobileMenuOpen ? 'close' : 'menu'}
				</span>
			</button>
		</div>
	</div>

	<!-- Mobile menu overlay -->
	{#if mobileMenuOpen}
		<div
			class="bg-surface-container-highest border-primary/10 absolute top-full left-0 w-full border-b md:hidden"
		>
			<nav class="flex flex-col gap-6 p-8">
				<NavLink
					href={`/${lang}/#home`}
					label={dict.nav.home}
					isActive={!isBlog && activeSection === 'home'}
					onclick={(e) => {
						handleNavClick(e, '#home');
						mobileMenuOpen = false;
					}}
				/>
				<NavLink
					href={`/${lang}/#expertise`}
					label={dict.nav.expertise}
					isActive={!isBlog && activeSection === 'expertise'}
					onclick={(e) => {
						handleNavClick(e, '#expertise');
						mobileMenuOpen = false;
					}}
				/>
				<NavLink
					href={`/${lang}/#timeline`}
					label={dict.nav.timeline}
					isActive={!isBlog && activeSection === 'timeline'}
					onclick={(e) => {
						handleNavClick(e, '#timeline');
						mobileMenuOpen = false;
					}}
				/>
				<NavLink
					href={`/${lang}/#contact`}
					label={dict.nav.contact}
					isActive={!isBlog && activeSection === 'contact'}
					onclick={(e) => {
						handleNavClick(e, '#contact');
						mobileMenuOpen = false;
					}}
				/>
				<div class="pt-4 flex flex-col gap-4">
					<Button
						href={`/${lang}/blog`}
						variant="primary"
						class="w-full py-3! text-[12px]!"
						onclick={() => (mobileMenuOpen = false)}>{dict.nav.viewBlog}</Button
					>
					<div class="flex justify-center">
						<LanguageSwitcher onchange={() => (mobileMenuOpen = false)} />
					</div>
				</div>
			</nav>
		</div>
	{/if}
</header>

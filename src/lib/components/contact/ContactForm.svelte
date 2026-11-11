<script lang="ts">
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';
	import Button from '../shared/Button.svelte';
	import { localeFromPathname } from '$lib/i18n/locales';
	import { getDictionary } from '$lib/i18n/dictionaries';

	let {
		email = '[EMAIL]',
		linkedin = '[LINKEDIN_URL]',
		github = '[GITHUB_URL]'
	} = $props();

	type Status = 'idle' | 'loading' | 'success' | 'error';

	let status = $state<Status>('idle');
	let errorMessage = $state<string>('');

	const lang = $derived(localeFromPathname(page.url.pathname));
	const dict = $derived(getDictionary(lang));

	const formspreeId = env.PUBLIC_FORMSPREE_ID ?? env.PUBLIC_FORMSPREE_FORM_ID ?? '';

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (status === 'loading') {
			return;
		}

		const form = e.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		// Honeypot check - if filled, silently ignore
		const honeypot = formData.get('_gotcha');
		if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
			status = 'success';
			form.reset();
			setTimeout(() => (status = 'idle'), 5000);
			return;
		}

		// If no Formspree ID is configured, guide user to direct contact
		if (!formspreeId) {
			status = 'error';
			errorMessage = dict.form.errorText;
			return;
		}

		status = 'loading';
		errorMessage = '';

		try {
			const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json'
				}
			});

			if (response.ok) {
				status = 'success';
				form.reset();
				setTimeout(() => (status = 'idle'), 5000);
				return;
			}

			const data = await response.json().catch(() => ({}));
			if (Array.isArray(data?.errors) && data.errors.length > 0) {
				errorMessage = data.errors.map((err: { message?: string }) => err.message).join(', ');
			} else {
				errorMessage = dict.form.errorText;
			}
			status = 'error';
		} catch {
			errorMessage = dict.form.networkError;
			status = 'error';
		}
	}
</script>

<div class="bento-card bg-surface p-4 sm:p-6 lg:p-8">
	<div
		class="block font-mono text-xs md:text-[10px] tracking-wide md:tracking-[0.4em] text-primary uppercase mb-6"
	>
		{dict.form.uplinkLabel}
	</div>

	{#if status === 'success'}
		<div class="py-12 text-center animate-fade-in" role="status" aria-live="polite">
			<span class="material-symbols-outlined text-primary text-5xl mb-4" aria-hidden="true">check_circle</span>
			<p class="font-mono text-sm tracking-widest text-primary">{dict.form.successTitle}</p>
			<p class="text-xs text-on-surface-variant mt-2 uppercase">{dict.form.successText}</p>
		</div>
	{:else}
		<form onsubmit={handleSubmit} class="space-y-8 md:space-y-6" novalidate={false}>
			<input
				type="text"
				name="_gotcha"
				tabindex="-1"
				autocomplete="off"
				aria-label={dict.form.honeypotLabel}
				class="hidden"
			/>

			<div class="relative">
				<span class="absolute left-0 bottom-4 md:bottom-3 font-mono text-primary text-xs" aria-hidden="true">&gt;</span>
				<label for="name" class="sr-only">{dict.form.fieldName}</label>
				<input
					id="name"
					name="name"
					type="text"
					autocomplete="name"
					required
					placeholder={dict.form.fieldName}
					class="w-full bg-transparent border-0 border-b border-slate-700 pb-4 md:pb-3 pl-6 font-mono text-base md:text-xs focus:ring-0 focus:border-primary placeholder:text-white/20 uppercase tracking-wide md:tracking-widest outline-none"
				/>
			</div>

			<div class="relative">
				<span class="absolute left-0 bottom-4 md:bottom-3 font-mono text-primary text-xs" aria-hidden="true">&gt;</span>
				<label for="email" class="sr-only">{dict.form.fieldEmail}</label>
				<input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					required
					placeholder={dict.form.fieldEmail}
					class="w-full bg-transparent border-0 border-b border-slate-700 pb-4 md:pb-3 pl-6 font-mono text-base md:text-xs focus:ring-0 focus:border-primary placeholder:text-white/20 uppercase tracking-wide md:tracking-widest outline-none"
				/>
			</div>

			<div class="relative">
				<span class="absolute left-0 top-1 font-mono text-primary text-xs" aria-hidden="true">&gt;</span>
				<label for="message" class="sr-only">{dict.form.fieldMessage}</label>
				<textarea
					id="message"
					name="message"
					required
					placeholder={dict.form.fieldMessage}
					rows="4"
					class="w-full bg-transparent border-0 border-b border-slate-700 pl-6 font-mono text-base md:text-xs focus:ring-0 focus:border-primary placeholder:text-white/20 uppercase tracking-wide md:tracking-widest outline-none resize-none"
				></textarea>
			</div>

			{#if status === 'error' && errorMessage}
				<div class="space-y-2" role="alert" aria-live="assertive">
					<p class="font-mono text-xs tracking-widest text-red-400 uppercase">{dict.form.errorTitle}</p>
					<p class="text-xs text-on-surface-variant uppercase">{errorMessage}</p>
					{#if email}
						<p class="text-xs text-on-surface-variant uppercase">
							<a class="text-primary hover:underline" href="mailto:{email}">{dict.contact.email}: {email}</a>
						</p>
					{/if}
				</div>
			{/if}

			<Button
				type="submit"
				variant="primary"
				class="w-full !py-4 cursor-pointer"
				disabled={status === 'loading'}
			>
				{status === 'loading' ? dict.form.sending : dict.form.submit}
				<span class="material-symbols-outlined text-sm ml-2" aria-hidden="true">send</span>
			</Button>
		</form>
	{/if}
</div>

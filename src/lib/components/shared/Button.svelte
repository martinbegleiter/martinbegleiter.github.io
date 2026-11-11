<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		variant?: 'primary' | 'secondary' | 'ghost';
		type?: 'button' | 'submit' | 'reset';
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
		class?: string;
		disabled?: boolean;
		'aria-label'?: string;
		'aria-live'?: 'off' | 'polite' | 'assertive';
	}

	let {
		href,
		variant = 'primary',
		type = 'button',
		onclick,
		children,
		class: className = '',
		disabled = false,
		'aria-label': ariaLabel,
		'aria-live': ariaLive
	}: Props = $props();

	const baseStyles =
		'inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-300';

	const variants = {
		primary: 'bg-primary-container text-on-primary-container hover:brightness-110 active:scale-95 px-4 py-2',
		secondary:
			'border border-slate-700 text-white/40 hover:border-primary-container hover:text-primary-container px-4 py-2',
		ghost: 'text-on-surface-variant hover:text-primary-container group'
	};
</script>

{#if href}
	<a
		{href}
		class="{baseStyles} {variants[variant]} {className} {disabled ? 'pointer-events-none opacity-50' : ''}"
		{onclick}
		aria-disabled={disabled}
		aria-label={ariaLabel}
		aria-live={ariaLive}
		tabindex={disabled ? -1 : 0}
	>
		{@render children()}
		{#if variant === 'ghost'}
			<span class="ml-2 transition-transform duration-300 group-hover:translate-x-1">&gt;</span>
		{/if}
	</a>
{:else}
	<button
		{type}
		class="{baseStyles} {variants[variant]} {className} {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
		{onclick}
		{disabled}
		aria-label={ariaLabel}
		aria-live={ariaLive}
	>
		{@render children()}
		{#if variant === 'ghost'}
			<span class="ml-2 transition-transform duration-300 group-hover:translate-x-1">&gt;</span>
		{/if}
	</button>
{/if}

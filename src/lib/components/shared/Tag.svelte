<script lang="ts">
	interface Props {
		label: string;
		variant?: 'outline' | 'solid';
		class?: string;
	}

	let { label, variant = 'outline', class: className = '' }: Props = $props();
</script>

{#if variant === 'outline'}
	<span
		class="border-primary-container/20 text-white/80 bg-surface/80 px-2 py-1 md:px-3 md:py-1.5 backdrop-blur-sm font-bold text-xs md:text-[10px] tracking-widest uppercase border {className}"
	>
		{label}
	</span>
{:else}
	<span
		class="bg-primary-container text-on-primary-container px-2 py-1 md:px-3 md:py-1.5 font-mono text-xs md:text-[10px] tracking-widest uppercase {className}"
	>
		[{label}]
	</span>
{/if}

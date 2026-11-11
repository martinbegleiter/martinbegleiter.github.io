<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		prefix?: string;
	}

	let { title, subtitle = '', prefix = '' }: Props = $props();

	const isMultiWord = $derived(title.trim().includes(' '));
	const underscoreTitle = $derived(title.trim().replace(/\s+/g, '_'));

	const isSubtitleMultiWord = $derived(subtitle.trim().includes(' '));
	const underscoreSubtitle = $derived(subtitle.trim().replace(/\s+/g, '_'));
</script>

<div class="mb-12 flex items-baseline gap-4">
	{#if prefix}
		<span class="font-mono text-sm text-primary-container/40">{prefix}</span>
	{/if}

	<h2 class="font-headline text-4xl font-bold tracking-tighter uppercase">
		{#if isMultiWord}
			<span class="lg:hidden">{title}</span>
			<span class="hidden lg:inline">{underscoreTitle}</span>
		{:else}
			{title}
		{/if}
	</h2>

	<div class="h-px grow bg-slate-800"></div>

	{#if subtitle}
		<span class="hidden min-[400px]:inline text-primary-container font-mono text-xs md:text-[10px] tracking-wide md:tracking-[0.3em] uppercase">
			{#if isSubtitleMultiWord}
				<span class="lg:hidden">{subtitle}</span>
				<span class="hidden lg:inline">{underscoreSubtitle}</span>
			{:else}
				{subtitle}
			{/if}
		</span>
	{/if}
</div>

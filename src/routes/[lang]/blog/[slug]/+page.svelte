<script lang="ts">
	import Tag from '$lib/components/shared/Tag.svelte';
	import { getDictionary } from '$lib/i18n/dictionaries';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const dict = $derived(getDictionary(data.lang));
</script>

<svelte:head>
	<title>{data.meta.title} // {dict.blog.sentinelLogs}</title>
</svelte:head>

<article class="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
	<div class="mb-12 border-b border-slate-900 pb-12">
		<div class="mb-6 flex items-center gap-4 font-mono text-xs tracking-widest text-primary">
			<span>[ {data.meta.date} ]</span>
			<span class="text-white/20">//</span>
			<span class="uppercase">TRANS_ID: {data.meta.title.substring(0, 8)}</span>
		</div>

		<h1 class="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter uppercase mb-6 leading-tight">
			{data.meta.title}
		</h1>

		<p class="text-on-surface-variant text-base sm:text-lg uppercase tracking-wide leading-relaxed mb-8">
			{data.meta.description}
		</p>

		<div class="flex flex-wrap gap-2">
			{#each data.meta.tags as tag}
				<Tag label={tag} variant="outline" class="!bg-surface-container" />
			{/each}
		</div>
	</div>

	<div class="prose prose-invert prose-yellow max-w-none 
		prose-headings:uppercase prose-headings:font-bold prose-headings:tracking-tighter
		prose-p:text-on-surface-variant prose-p:leading-relaxed prose-p:uppercase prose-p:text-sm
		prose-li:text-on-surface-variant prose-li:uppercase prose-li:text-sm
		prose-code:text-primary prose-code:font-mono prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded
		prose-pre:bg-surface-container prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-none">
		<data.content />
	</div>

	<div class="mt-20 pt-10 border-t border-slate-900 flex justify-between items-center">
		<a href="/{data.lang}/blog" class="font-mono text-xs text-primary hover:underline tracking-widest">
			&lt; {dict.blog.backToList}
		</a>

		<button
			onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			class="font-mono text-xs text-on-surface-variant hover:text-primary tracking-widest uppercase"
		>
			{dict.blog.topOfFile} ^
		</button>
	</div>
</article>

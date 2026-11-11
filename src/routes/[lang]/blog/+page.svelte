<script lang="ts">
	import SectionHeader from '$lib/components/shared/SectionHeader.svelte';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import { getDictionary } from '$lib/i18n/dictionaries';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const dict = $derived(getDictionary(data.lang));
</script>

<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
	<SectionHeader title={dict.blog.title} subtitle={dict.blog.subtitle} prefix={dict.blog.prefix} />

	<div class="mb-12">
		<p class="text-on-surface-variant uppercase text-sm tracking-[0.2em] max-w-2xl leading-relaxed">
			{dict.blog.intro}
		</p>
	</div>

	{#if data.posts && data.posts.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.posts as post}
				<BlogCard {post} lang={data.lang} />
			{/each}
		</div>
	{:else}
		<div class="bg-surface p-12 border border-slate-700 text-center space-y-6">
			<span class="material-symbols-outlined text-primary text-6xl">database_off</span>
			<h2 class="font-mono text-xl text-primary tracking-widest uppercase">{dict.blog.emptyTitle}</h2>
			<p class="text-on-surface-variant uppercase text-sm max-w-md mx-auto leading-relaxed">
				{dict.blog.emptyText}
			</p>
		</div>
	{/if}

	<div class="mt-20 pt-10 border-t border-slate-900">
		<a href="/{data.lang}" class="font-mono text-xs text-primary hover:underline tracking-widest">
			&lt; {dict.blog.returnToBase}
		</a>
	</div>
</div>

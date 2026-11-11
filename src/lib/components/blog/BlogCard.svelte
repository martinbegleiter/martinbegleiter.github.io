<script lang="ts">
	import type { Post } from '$lib/types';
	import type { Locale } from '$lib/i18n/locales';
	import Tag from '../shared/Tag.svelte';

	interface Props {
		post: Post;
		lang: Locale;
	}

	let { post, lang }: Props = $props();
</script>

<a
	href={`/${lang}/blog/${post.slug}`}
	data-sveltekit-reload
	class="bento-card group flex flex-col p-6 transition-all hover:border-primary/50"
>
	<div class="mb-4 flex items-center justify-between font-mono text-xs md:text-[10px] tracking-wide md:tracking-widest text-on-surface-variant">
		<span>{new Date(post.date).toLocaleDateString(lang, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
		<span class="text-primary/40 uppercase">[ LOG_{post.slug.substring(0, 4).toUpperCase()} ]</span>
	</div>

	<h3 class="mb-3 font-headline text-xl md:text-xl font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors uppercase">
		{post.title}
	</h3>

	<p class="mb-6 flex-grow text-base md:text-sm leading-relaxed text-on-surface-variant uppercase tracking-wide line-clamp-2">
		{post.description}
	</p>

	<div class="flex flex-wrap gap-2 mt-auto">
		{#each post.tags as tag}
			<Tag label={tag} variant="outline" class="!bg-transparent !text-[10px] md:!text-[8px]" />
		{/each}
	</div>
</a>

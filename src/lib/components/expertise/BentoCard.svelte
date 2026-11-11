<script lang="ts">
	import Tag from '../shared/Tag.svelte';

	interface Stat {
		label: string;
		value: string;
	}

	interface Props {
		title: string;
		icon: string;
		iconBg: string;
		description: string;
		tags?: string[];
		stats?: Stat[];
	}

	let {
		title,
		icon,
		iconBg,
		description,
		tags = [],
		stats = []
	}: Props = $props();
</script>

<div class="bento-card group h-full p-4 sm:p-6 lg:p-8">
	<!-- Background illustrative icon -->
	<span class="material-symbols-outlined bg-illustrative-icon">
		{iconBg}
	</span>

	<div class="relative z-10 flex h-full flex-col">
		<!-- Header -->
		<div class="mb-6 flex items-start justify-between">
			<span
				class="text-primary-container text-4xl material-symbols-outlined"
				style="font-size: 32px;"
			>
				{icon}
			</span>

		</div>

		<!-- Content -->
		<h3 class="mb-4 text-2xl font-bold tracking-tighter uppercase">
			{title}
		</h3>

		<p class="text-on-surface-variant mb-6 flex-grow leading-relaxed">
			{description}
		</p>

		<!-- Tags -->
		{#if tags.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each tags as tag}
					<Tag label={tag} variant="outline" />
				{/each}
			</div>
		{/if}
	</div>
</div>

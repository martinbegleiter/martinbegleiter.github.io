<script lang="ts">
	import Tag from '../shared/Tag.svelte';

	interface Props {
		period: string;
		role: string;
		company: string;
		type: 'work' | 'education';
		description: string;
		achievements?: string[];
		tags?: string[];
		status: 'active' | 'completed';
	}

	let {
		period,
		role,
		company,
		type,
		description,
		achievements = [],
		tags = [],
		status
	}: Props = $props();

	let statusColor = $derived(status === 'active' ? 'text-primary' : 'text-white/40 group-hover:text-primary');
	let nodeColor = $derived(status === 'active' ? 'border-primary' : 'border-slate-700');
	let dotColor = $derived(status === 'active' ? 'bg-primary' : 'bg-slate-700');
</script>

<div class="group relative pl-8 md:pl-12 animate-fade-in">
	<!-- Timeline Node -->
	<div
		class="bg-surface absolute left-0 top-1.5 flex h-4 w-4 md:h-6 md:w-6 items-center justify-center border-2 transition-all duration-300 group-hover:border-primary {nodeColor} {status ===
		'active'
			? 'shadow-[0_0_15px_#fde047]'
			: 'group-hover:shadow-[0_0_15px_#fde047]'}"
	>
		<div class="h-1.5 w-1.5 md:h-2 md:w-2 transition-colors duration-300 group-hover:bg-primary {dotColor}"></div>
	</div>

	<div class="grid gap-4 md:gap-8 md:grid-cols-4">
		<!-- Left Column: Date/Role -->
		<div class="md:col-span-1">
			<div class="mb-1 md:mb-2 flex items-center gap-2">
				<span class="material-symbols-outlined text-xs md:text-sm transition-colors duration-300 {statusColor}">
					{type === 'work' ? 'work' : 'school'}
				</span>
				<span class="font-mono text-base md:text-xl font-bold transition-colors duration-300 {statusColor}">
					{period}
				</span>
			</div>
			<div class="text-white/30 text-[10px] font-bold tracking-widest uppercase">
				{role}
			</div>
		</div>

		<!-- Right Column: Content Card -->
		<div class="bento-card p-4 sm:p-6 lg:p-8 md:col-span-3">
			<h3 class="mb-2 md:mb-4 text-xl md:text-2xl font-bold tracking-tighter uppercase">
				{company}
			</h3>

			<p class="text-on-surface-variant mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
				{description}
			</p>

			{#if achievements.length > 0}
				<ul class="mb-6 space-y-2">
					{#each achievements as achievement}
						<li class="text-on-surface-variant flex items-start gap-3 text-sm">
							<span class="text-primary-container material-symbols-outlined mt-0.5 text-xs">
								check_circle
							</span>
							<span>{achievement}</span>
						</li>
					{/each}
				</ul>
			{/if}

			<div class="flex flex-wrap items-center justify-between gap-4">
				<div class="flex flex-wrap gap-2">
					{#each tags as tag}
						<Tag label={tag} variant="outline" class="!bg-surface !text-primary/60 !text-[9px]" />
					{/each}
				</div>
				
			</div>
		</div>
	</div>
</div>

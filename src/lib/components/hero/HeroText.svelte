<script lang="ts">
	interface Props {
		firstName: string;
		lastName: string;
		role: string;
	}

	let { firstName, lastName, role }: Props = $props();
</script>

<div class="animate-fade-in">
	<div
		class="text-primary font-mono mb-6 flex items-center gap-2 text-sm tracking-tighter"
	>
		<span class="material-symbols-outlined text-sm">terminal</span>
		<span>SESSION_ESTABLISHED // SOURCE: SECURE_UPLINK</span>
	</div>

	<h1
		class="font-headline glitch-hover mb-4 text-5xl font-extrabold leading-[0.9] tracking-tighter text-on-surface sm:text-7xl md:text-9xl"
	>
		{firstName}<br />{lastName}<span class="text-primary-container">.</span>
	</h1>

	<p
		class="text-on-surface-variant border-primary border-l-4 pl-6 text-lg font-medium sm:text-xl md:text-2xl uppercase"
	>
		{role}
	</p>
</div>

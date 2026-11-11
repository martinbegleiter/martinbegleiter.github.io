<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		user?: string;
		machine?: string;
		commands: string[];
	}

	let { user = 'martin', machine = 'begleiter', commands }: Props = $props();

	let currentLine = $state(0);
	let displayedLines = $state<string[]>([]);
	let isTyping = $state(true);

	onMount(() => {
		const interval = setInterval(() => {
			if (currentLine < commands.length) {
				displayedLines = [...displayedLines, commands[currentLine]];
				currentLine++;
			} else {
				isTyping = false;
				clearInterval(interval);
			}
		}, 800);

		return () => clearInterval(interval);
	});
</script>

<div
	class="bg-surface-container-low border-primary/20 text-on-surface-variant/80 mt-8 md:mt-12 max-w-xl border-l p-4 sm:p-6 font-mono text-[10px] sm:text-xs tracking-widest animate-fade-in"
	style="animation-delay: 0.4s;"
>
	<p class="text-primary mb-1">root@{user}_{machine}:~$ ./init_sequence.sh</p>
	{#each displayedLines as line}
		<p class="mb-1">&gt; {line}</p>
	{/each}
	{#if !isTyping}
		<p class="animate-pulse">&gt; System ready. Awaiting input_</p>
	{/if}
</div>

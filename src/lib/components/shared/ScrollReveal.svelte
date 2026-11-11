<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		once?: boolean;
		threshold?: number;
		rootMargin?: string;
		class?: string;
		animationClass?: string;
		style?: string;
	}

	let {
		children,
		once = true,
		threshold = 0.1,
		rootMargin = '0px',
		class: className = '',
		animationClass = 'animate-slide-up',
		style = ''
	}: Props = $props();

	let element: HTMLElement | undefined = $state();
	let isVisible = $state(false);

	onMount(() => {
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
					if (once) {
						observer.unobserve(element!);
					}
				} else if (!once) {
					isVisible = false;
				}
			},
			{ threshold, rootMargin }
		);

		observer.observe(element);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={element}
	class="{className} {animationClass}"
	style="transition-duration: 0.8s; opacity: {isVisible ? 1 : 0}; {style}"
>
	{@render children()}
</div>

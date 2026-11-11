<script lang="ts">
	interface Props {
		href: string;
		label: string;
		isActive?: boolean;
		onclick?: (event: MouseEvent) => void;
	}

	let { href, label, isActive = false, onclick }: Props = $props();
</script>

<a
	{href}
	{onclick}
	class="font-sans text-xs font-bold tracking-widest uppercase transition-colors {isActive
		? 'text-primary border-primary border-b-2 pb-1'
		: 'text-white/60 hover:text-white pb-1'}"
>
	{label}
</a>

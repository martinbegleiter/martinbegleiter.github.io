<script lang="ts">
	interface Props {
		src?: string;
		alt: string;
	}

	let { src, alt }: Props = $props();

	const placeholder =
		'https://lh3.googleusercontent.com/aida-public/AB6AXuDBQ8PLvgW_wkk83I65FmjoGM0MNnVnJJhQ1sbfAHUY-aAnqyZ3qe7y6KnjqYKVOU0guz8NzmPSIa-5y7EGP08lok9SEGpX7f6rJxv2XfvWIiQ_gCxCA_IjqEMEOW2iGeoMThktJVAYZEseXfQPqfHDH2hTUot1RaIFIaD8rAEVlPalF7saFy2361FWD1PvNETSTb9L-UTlVcP4a4_9QNb5mYhBr6lZGMObTRj4VeoRWdk9WA4HqYZctF0VT9Beb4nyLMb4yWQITaU';
</script>

<div class="relative aspect-square animate-fade-in" style="animation-delay: 0.6s;">
	<!-- Ambient Glow -->
	<div class="bg-primary/5 absolute inset-0 rounded-full blur-[100px]"></div>

	<!-- Image Container -->
	<div class="relative z-10 h-full w-full overflow-hidden border border-primary/20 transition-all duration-700 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(253,224,71,0.1),inset_0_0_20px_rgba(56,189,248,0.05)]">
		<img
			src={src || placeholder}
			{alt}
			loading="eager"
			decoding="async"
			class="h-full w-full object-cover transition-all duration-700 hover:brightness-110 hover:drop-shadow-[0_0_28px_#fde047]"
		/>
	</div>

	<!-- Decorative corner elements -->
	<div class="border-primary absolute -top-2 -left-2 h-4 w-4 border-t-2 border-l-2"></div>
	<div class="border-primary absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2"></div>
</div>

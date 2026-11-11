<script lang="ts">
	import HeroText from './HeroText.svelte';
	import TerminalBlock from './TerminalBlock.svelte';
	import HeroImage from './HeroImage.svelte';

	interface Props {
		firstName: string;
		lastName: string;
		role: string;
		commands: string[];
		imageSrc?: string;
	}

	let { firstName, lastName, role, commands, imageSrc }: Props = $props();
</script>

<section id="home" class="scroll-mt-20 mx-auto mb-16 max-w-screen-2xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-40">
	<div class="grid items-center gap-8 md:grid-cols-12">
		<!-- Left Side: Content -->
		<div class="md:col-span-8">
			<HeroText {firstName} {lastName} {role} />
			<TerminalBlock {commands} />
		</div>

		<!-- Right Side: Portrait -->
		<div class="md:col-span-4">
			<HeroImage src={imageSrc} alt="{firstName} {lastName} Portrait" />
		</div>
	</div>
</section>

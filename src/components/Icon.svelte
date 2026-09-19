<script lang="ts">
	import { type LucideProps } from "@lucide/svelte";
	import { getIcon, type IconIdentifier } from "../lib/icons.svelte.ts";

	let { name, size = 16, ...attributes }: { name: IconIdentifier; size?: number } & Omit<LucideProps, "name" | "size"> = $props();

	const Icon = $derived(getIcon(name).component);
</script>

<Icon {size} {...attributes} />

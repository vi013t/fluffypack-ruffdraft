<script lang="ts">
	import css from "../app.css?url";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href={css} />
	<link rel="icon" href="/favicon.png" />
	<title>FluffyPack - Ruff Draft</title>
</svelte:head>

{@render children()}

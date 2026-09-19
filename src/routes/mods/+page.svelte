<script lang="ts">
	import { SvelteSet } from "svelte/reactivity";
	import background from "../../assets/images/background2.jpg";
	import faq from "../../assets/images/faq.png";
	import highlights from "../../assets/images/highlights.png";
	import modList from "../../assets/images/mod_list.png";
	import rejectedModsImage from "../../assets/images/rejected_mods.png";
	import Icon from "../../components/Icon.svelte";
	import Navbar from "../../components/Navbar.svelte";
	import { levenshteinDistance } from "../../lib";
	import { mods, rejectedMods, type ModTag } from "../../lib/mods";

	let searchText = $state("");

	let includedTags: SvelteSet<ModTag> = $state(new SvelteSet());
	let excludedTags: SvelteSet<ModTag> = $state(new SvelteSet(["Library" as ModTag]));

	function toggleTag(tag: ModTag) {
		return function () {
			if (includedTags.has(tag)) {
				includedTags.delete(tag);
				excludedTags.add(tag);
				return;
			}

			if (excludedTags.has(tag)) {
				excludedTags.delete(tag);
				return;
			}

			includedTags.add(tag);
		};
	}

	let filtersVisible = $state(false);
	let filterButton: HTMLElement | null = $state(null);
	let filters: HTMLElement | null = $state(null);

	let filteredMods = $derived.by(() => {
		let filtered = mods.filter(mod => {
			let include = true;

			if (includedTags.size > 0) {
				include = include && mod.tags.some(tag => includedTags.has(tag));
			}

			if (excludedTags.size > 0) {
				include = include && !mod.tags.some(tag => excludedTags.has(tag));
			}

			return include;
		});

		if (searchText.match(/\S+/)) {
			return filtered.toSorted((a, b) => {
				let search = searchText.toLowerCase().replace(" ", "");
				let first = a.name.toLowerCase().replace(" ", "");
				let second = b.name.toLowerCase().replace(" ", "");

				if (first.includes(search)) {
					if (second.includes(search)) {
						return first.length < second.length ? -1 : 1;
					}

					return -1;
				}

				if (second.includes(search)) {
					return 1;
				}

				return levenshteinDistance(first, search) - levenshteinDistance(second, search);
			});
		}

		return filtered.toSorted((a, b) => a.name.localeCompare(b.name));
	});

	function onmousedown(event: MouseEvent) {
		if (
			(!filters || !event.composedPath().includes(filters)) &&
			(!filterButton || !event.composedPath().includes(filterButton))
		) {
			filtersVisible = false;
		}
	}
</script>

<svelte:document {onmousedown} />

<img src={background} class="background" alt="Background" />
<Navbar />
<main>
	<button class="download">
		<Icon size={25} name="Download" />
		<span>Download Modpack Zip</span>
	</button>
	<div>
		<img src={highlights} class="title" alt="Highlights" />
	</div>

	<div class="highlighted-mods">
		{#each mods.filter(mod => mod.tags.includes("Highlight")) as mod}
			<a class="highlighted-mod" href={mod.link} target="_blank" rel="noopener noreferrer">
				<img src={mod.image} alt={mod.name} />
				<div class="highlighted-mod-info">
					<h3>{mod.name}</h3>
					<p>{mod.description}</p>
				</div>
			</a>
		{/each}
	</div>

	<div>
		<img src={modList} class="title" alt="Full Mod List" />
		<span>
			({filteredMods.length} / {mods.length})
		</span>
	</div>

	<div class="search">
		<input bind:value={searchText} placeholder="Search..." />
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="filter" bind:this={filterButton} onmousedown={() => (filtersVisible = !filtersVisible)}>
			<Icon name="Funnel" />
			<div class="filters" bind:this={filters} style:display={filtersVisible ? "flex" : "none"}>
				{#each ["Addon", "Cosmetic", "Exploration", "Library", "Magic", "Performance", "Tech", "Utility"] as ModTag[] as category}
					<button class="category" onmousedown={toggleTag(category)}>
						<div
							style:background={includedTags.has(category) ? "#a6e3a1" : excludedTags.has(category) ? "#f38ba8" : "#DDDDDD"}
						></div>
						<span>{category}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="mod-list">
		{#each filteredMods as mod}
			<a class="listed-mod" href={mod.link} target="_blank" rel="noopener noreferrer">
				<img src={mod.image} alt={mod.name} />
				<div class="mod-info">
					<h3>{mod.name}</h3>
					<p>{mod.description}</p>
				</div>
			</a>
		{/each}
	</div>

	<div id="rejected">
		<img src={rejectedModsImage} class="title" alt="Rejected Mods" />
	</div>

	<div class="mod-list">
		{#each rejectedMods as mod}
			<a class="listed-mod rejected" href={mod.link} target="_blank" rel="noopener noreferrer">
				<img src={mod.image} alt={mod.name} />
				<div class="mod-info">
					<h3>{mod.name}</h3>
					<p>{mod.description}</p>
					<p class="reason"><b>Reason: {mod.reason}</b></p>
				</div>
			</a>
		{/each}
	</div>

	<div id="faq">
		<img src={faq} class="title" alt="FAQ" />
	</div>

	<div class="faqs">
		<div class="faq">
			<h3>Do we have a gravestone mod?</h3>
			<p>Yes. We have Corpse.</p>
		</div>
	</div>
</main>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Bowlby+One&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Jersey+25&display=swap");

	@media (orientation: portrait) {
		main {
			padding-left: 5vw;
			padding-right: 5vw;
		}

		.download {
			display: none;
		}

		.title {
			height: 8vw;
			width: auto;
		}

		.listed-mod {
			height: 20vw;
			gap: 3vw;

			&.rejected {
				height: 27vw;
			}

			.mod-info {
				flex-shrink: 1;
				flex-grow: 1;
				gap: 0.5vw;
			}

			p {
				font-size: 3vw;
				flex-grow: 1;
			}

			h3 {
				font-size: 4vw;
				flex-shrink: 1;
			}
		}

		.highlighted-mod {
			flex-direction: column;
			width: 27vw;
			height: 37vw;
			gap: 2vw;
			padding: 6px;

			img {
				width: 80%;
				height: auto;
			}
		}

		.mod-list {
			gap: 2vw;
		}

		.highlighted-mod-info {
			width: 90%;

			p {
				display: none;
			}

			h3 {
				font-size: 4vw;
				text-align: center;
			}
		}

		div:has(.title) {
			gap: 3vw;
			span {
				font-size: 5vw;
			}
		}
	}

	@media (orientation: landscape) {
		main {
			padding-left: 20vw;
			padding-right: 20vw;
		}

		div:has(.title) {
			gap: 1rem;
			span {
				font-size: 2.5rem;
			}
		}

		.download {
			display: flex;
		}

		.listed-mod {
			height: 5rem;
			gap: 1rem;
			&.rejected {
				height: 6rem;
			}

			h3 {
				font-size: 1.35rem;
			}
		}

		.mod-list {
			gap: 1rem;
		}

		.highlighted-mod {
			gap: 1.5vw;
			height: 10rem;
			padding: 2rem;
			width: 30%;

			h3 {
				font-size: 1.5rem;
			}

			p {
				font-size: 0.85rem;
				flex-grow: 1;
				flex-shrink: 1;
			}

			img {
				height: 80%;
				width: auto;
			}
		}

		.title {
			height: 3vw;
			width: auto;
		}
	}

	.highlighted-mod-info {
		gap: 0.5rem;
		display: flex;
		flex-grow: 1;
		flex-shrink: 1;
		flex-direction: column;

		h3 {
			width: 85%;
			line-height: 1em;
			color: #4c4f69;
			font-family: "Jersey 25";
			transform: scaleX(115%);
			transform-origin: 0% 50%;
		}

		p {
			color: #8c8fa1;
			width: 100%;
			font-family: "Nunito";
		}
	}

	.download {
		color: white;
		padding: 1rem;
		width: 25rem;
		margin-top: 5rem;
		margin-left: auto;
		margin-right: auto;
		box-shadow: 0.45rem 0.45rem 0px rgba(0, 0, 0, 30%);
		text-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 50%);
		align-items: center;
		justify-content: center;
		gap: 2.5rem;
		transition: scale 0.1s;
		outline: 6px solid rgba(255, 255, 255, 50%);
		background-image: linear-gradient(to bottom right, #48f796, #3ddc84);
		outline-offset: -6px;

		span {
			font-size: 1.25rem;
			font-family: "Jersey 25";
			transform: scaleX(130%);
		}

		&:hover {
			scale: 103%;
		}
	}

	input {
		background: #eff1f5;
		height: 100%;
		padding-left: 1rem;
		box-shadow: 0.45rem 0.45rem 0rem 0rem rgba(0, 0, 0, 30%);
		flex-grow: 1;
		font-family: "Nunito";
	}

	div:has(.title) {
		display: flex;
		margin-bottom: 1rem;
		margin-top: 5rem;
		align-items: end;

		span {
			color: white;
			font-family: "Jersey 25";
			text-shadow: 0px 0px 0.5rem black;
		}
	}

	.search {
		width: 100%;
		display: flex;
		gap: 0.5rem;
		height: 2.5rem;
		margin-bottom: 3rem;

		.filter {
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0.45rem 0.45rem 0rem 0rem rgba(0, 0, 0, 30%);
			background: #eff1f5;
			height: 100%;
			aspect-ratio: 1;
			position: relative;
			cursor: pointer;
		}

		.filters {
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			position: absolute;
			top: 120%;
			left: 0px;
			background-color: white;
			box-shadow: 0.45rem 0.45rem 0px rgba(0, 0, 0, 30%);
			display: flex;
			flex-direction: column;
			width: 10rem;

			.category {
				padding-left: 0.5rem;
				padding-right: 0.5rem;
				padding-top: 0.15rem;
				padding-bottom: 0.15rem;
				display: flex;
				gap: 0.5rem;
				align-items: center;

				div {
					width: 1rem;
					height: 1rem;
				}

				span {
					font-family: "Nunito";
				}
			}
		}
	}

	.background {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0px;
		left: 0px;
		filter: saturate(70%) blur(5px) brightness(70%);
		z-index: -100;
	}

	main {
		padding-bottom: 5rem;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.listed-mod {
		box-shadow: 0.45rem 0.45rem 0rem 0rem rgba(0, 0, 0, 30%);
		display: flex;
		align-items: center;
		background: #eff1f5;
		padding: 0.5rem;
		outline: 6px solid rgba(255, 255, 255, 100%);
		outline-offset: -6px;
		transition: scale 0.1s;

		&:hover {
			scale: 101%;
		}

		h3 {
			color: #4c4f69;
			font-family: "Jersey 25";
			transform: scaleX(115%);
			transform-origin: 0% 50%;
		}

		p {
			color: #8c8fa1;
			font-family: "Nunito";
		}

		.reason {
			color: #f38ba8;

			b {
				font-family: "Nunito";
				font-weight: 900;
			}
		}

		img {
			height: 100%;
		}

		.mod-info {
			display: flex;
			flex-direction: column;
		}
	}

	.highlighted-mods {
		display: flex;
		width: 100%;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.mod-list {
		display: flex;
		height: fit-content;
		flex-direction: column;
	}

	.highlighted-mod {
		box-shadow: 0.45rem 0.45rem 0rem 0rem rgba(0, 0, 0, 30%);
		background-image: linear-gradient(to bottom right, #eff1f5, #dce0e8);
		display: flex;
		align-items: center;
		transition: scale 0.1s;
		cursor: pointer;
		outline: 6px solid rgba(255, 255, 255, 100%);
		outline-offset: -6px;

		&:hover {
			scale: 102%;
		}
	}
</style>

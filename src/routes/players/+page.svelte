<script lang="ts">
	import background from "../../assets/images/background2.jpg";
	import DiscordIcon from "../../components/icons/DiscordIcon.svelte";
	import MinecraftIcon from "../../components/icons/MinecraftIcon.svelte";
	import Navbar from "../../components/Navbar.svelte";
	import players from "../../lib/data/players";
</script>

<img src={background} class="background" alt="Background" />
<Navbar />
<main>
	{#each players.toSorted((a, b) => a.name.localeCompare(b.name)) as player}
		<div class="player">
			<img
				src="https://mc-api.io/render/FULL/{player.minecraft}/JAVA?size=256"
				alt="Minecraft skin render"
				width="158"
				height="256"
			/>
			<h2>{player.name}</h2>
			<span class="discord"><DiscordIcon stroke="white" style="width: 1rem; height: 1rem;" /> @{player.discord}</span>
			<span class="minecraft"><MinecraftIcon stroke="white" style="width: 1rem; height: 1rem;" />{player.minecraft}</span>
		</div>
	{/each}
</main>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Jersey+25&display=swap");

	main {
		margin-left: auto;
		margin-right: auto;
		margin-top: 5rem;
		padding: 2rem;
	}

	@media (orientation: landscape) {
		main {
			grid-template-columns: repeat(4, 1fr);
			gap: 3rem;
			width: 70%;
			display: grid;
		}
	}

	@media (orientation: portrait) {
		main {
			width: 90%;
			display: flex;
			flex-direction: column;
			gap: 3rem;

			img {
				width: 30vw;
				height: auto;
			}
		}
	}

	h2 {
		font-family: "Jersey 25";
		font-size: 2rem;
	}

	.discord {
		background-image: linear-gradient(to bottom right, #5865f2, #3e48ad);
		outline: 6px solid rgba(255, 255, 255, 50%);
		outline-offset: -5px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-family: "Jersey 25";
		font-size: 0.25rem;
		gap: 1em;
		padding: 0.5em 1em 0.5em 1em;
		font-size: 1.25rem;
		width: 100%;
	}

	.minecraft {
		background-image: linear-gradient(to bottom right, #48e45c, #31b53e);
		outline: 6px solid rgba(255, 255, 255, 50%);
		outline-offset: -5px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-family: "Jersey 25";
		gap: 1em;
		padding: 0.5em 1em 0.5em 1em;
		width: 100%;
		font-size: 1.25rem;
	}

	.player {
		padding: 2rem;
		background-color: white;
		box-shadow: 0.75rem 0.75rem 0px rgba(0, 0, 0, 30%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		width: 100%;

		span,
		h2 {
			text-align: center;
		}
	}

	@media (orientation: landscape) {
		.player img {
			width: 5vw;
			height: auto;
		}
	}

	:global(body) {
		overflow-y: auto;
		padding-bottom: 10rem;
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
</style>

<script lang="ts">
	import background from "../../assets/images/background2.jpg";
	import modrinthLogo from "../../assets/images/modrinth.png";
	import Icon from "../../components/Icon.svelte";
	import Navbar from "../../components/Navbar.svelte";
</script>

<img src={background} class="background" alt="Background" />
<Navbar />
<main>
	<h1>Installation</h1>

	<!-- svelte-ignore a11y_media_has_caption -->
	<video src="/install.mp4" controls></video>
	<a class="modrinth-link" href="https://modrinth.com/app" target="_blank" rel="noopener noreferrer">
		<img src={modrinthLogo} alt="Modrinth" />
		<span>Modrinth Website</span>
		<Icon name="ExternalLink" />
	</a>
	<div class="buttons">
		<a class="modrinth" download href="https://drive.google.com/uc?export=download&id=166gQV0c8Ssz7z-KaCKowaDoSFfwPknWp">
			Modrinth Bundle
		</a>
		<a class="zip" download href="https://drive.google.com/uc?export=download&id=1QDcf3TG0mNw3Pi-8j9i8oBM7jychrDc7">Zip File</a>
	</div>
</main>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Jersey+25&display=swap");

	.modrinth-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		margin-top: 1rem;
		font-family: "Nunito";
		font-size: 1.25rem;
		cursor: pointer;

		img {
			width: 1.5rem;
			height: 1.5rem;
		}

		&:hover {
			text-decoration: underline;
		}
	}

	@media (orientation: portrait) {
		.buttons {
			flex-direction: column;
		}
	}

	.buttons {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
		margin-top: 1rem;

		a {
			width: 20rem;
			padding: 1rem;
			outline: 6px solid rgba(255, 255, 255, 50%);
			outline-offset: -5px;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			transition: scale 0.1s;
			cursor: pointer;
			font-family: "Jersey 25";
			color: white;
			font-size: 1.25rem;

			&:hover {
				scale: 103%;
			}

			&.modrinth {
				background-image: linear-gradient(to bottom right, #48f796, #3ddc84);
			}

			&.zip {
				background-image: linear-gradient(to bottom right, #f38ba8, #df6c8c);
			}
		}
	}

	main {
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 5rem;
		box-shadow: 1rem 1rem 0px rgba(0, 0, 0, 30%);
		padding: 2rem;
		gap: 1rem;

		&,
		* {
			font-family: "Nunito";
		}
	}

	video {
		width: 100%;
	}

	:global(body) {
		overflow-y: auto;
		padding-bottom: 5rem;
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

	h1 {
		font-size: 2.5rem;
		font-weight: bold;
		font-family: "Jersey 25";
	}
</style>

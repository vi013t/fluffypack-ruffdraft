<nav>
	<a href="/">Home</a>
	<a href="/mods">Mods</a>
	<a href="/install">Install</a>
	<a href="/map">Map</a>
	<a href="/players">Players</a>
	<a href="https://discord.gg/pD72nvskve" target="_blank" rel="noopener noreferrer">Discord</a>
</nav>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Jersey+25&display=swap");

	@media (orientation: portrait) {
		nav {
			justify-content: space-between;

			a {
				font-size: 5vw;
			}
		}
	}

	@media (orientation: landscape) {
		nav {
			gap: 5vw;
			font-size: 2vw;
			justify-content: center;
		}
	}

	nav {
		padding: 0.5rem;
		width: 100%;
		display: flex;

		a {
			transform: scaleX(115%);
			font-family: "Jersey 25";
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			padding-left: 1rem;
			padding-right: 1rem;
			color: white;
			text-shadow: 0px 0px 0.5rem black;
			position: relative;
			cursor: pointer;

			&::after {
				content: "";
				position: absolute;
				top: 100%;
				left: 0px;
				width: 0px;
				background-color: white;
				height: 5px;
				transition: width 0.1s;
			}

			&:hover::after {
				width: 100%;
			}
		}
	}
</style>

import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) => (filename.split(/[/\\]/).includes("node_modules") ? undefined : true),
			},
			prerender: {
				handleHttpError: ({ path, referrer, message }) => {
					if (path === "/map" || path.startsWith("/www")) {
						return;
					}

					throw new Error(message);
				},
			},

			adapter: adapter({}),
		}),
	],
});

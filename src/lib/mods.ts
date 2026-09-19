import modData from "./data/mods";
import rejectedModData from "./data/rejected_mods";

export type ModTag =
	| "Magic"
	| "Utility"
	| "Storage"
	| "Tech"
	| "World Generation"
	| "Exploration"
	| "Addon"
	| "Compatibility"
	| "Cosmetics"
	| "Performance"
	| "Highlight";

export type Mod = {
	name: string;
	tags: ModTag[];
	description: string;
	link: string;
	clientside?: boolean;
	image: string;
};

const mods = modData as Mod[];
const rejectedMods = rejectedModData as (Mod & { reason: string })[];

export { mods, rejectedMods };

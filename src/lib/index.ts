export function levenshteinDistance(a: string, b: string): number {
	let insertionCost: number;
	let deletionCost: number;
	let substitutionCost: number;

	let dummy: number[];
	let m = a.length;
	let n = b.length;

	let v0: number[] = [];
	let v1: number[] = [];

	for (let i = 0; i <= n; i++) v0[i] = i;

	for (let i = 0; i < m; i++) {
		v1[0] = i + 1;

		for (let j = 0; j < n; j++) {
			deletionCost = v0[j + 1] + 1;
			insertionCost = v1[j] + 1;

			if (a.charAt(i) == b.charAt(j)) substitutionCost = v0[j];
			else substitutionCost = v0[j] + 1;

			v1[j + 1] = Math.min(deletionCost, insertionCost, substitutionCost);
		}

		dummy = v0;
		v0 = v1;
		v1 = dummy;
	}

	return v0[n];
}

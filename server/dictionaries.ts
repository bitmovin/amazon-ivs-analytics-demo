import "server-only";

const dictionaries = {
	en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

export default async function getDictionary(key: keyof typeof dictionaries) {
	return dictionaries[key]();
}

export type Dictionaries = typeof dictionaries;
export type Languages = keyof Dictionaries;
export type Dictionary<K extends Languages> = Awaited<
	ReturnType<Dictionaries[K]>
>;
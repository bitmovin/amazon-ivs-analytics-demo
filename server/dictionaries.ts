import "server-only";

const dictionaries = {
	en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

export default async function getDictionary(key: keyof typeof dictionaries) {
	return dictionaries[key]();
}

export type Dictionary = Awaited<ReturnType<typeof dictionaries["en"]>>;
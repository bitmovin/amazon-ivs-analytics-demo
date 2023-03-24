import "server-only";

const dictionaries = {
	en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (key: keyof typeof dictionaries) =>
	dictionaries[key]();

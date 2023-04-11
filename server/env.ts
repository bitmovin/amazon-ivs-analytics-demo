import "server-only";

export function getEnv<const K extends string>(key: K): string | undefined {
  const value = process.env[key];

  if (value) {
    return value;
  }

  console.log(`missing env var: ${key}`);

  return undefined;
}

export function requireEnv<const K extends string>(key: K): string {
  const value = getEnv(key);

  if (value) {
    return value;
  }

  throw new Error(key);
}

export function throwInProduction(message: string) {
  if (import.meta.env.PROD) {
    throw new Error(message);
  }

  console.error(message);
}

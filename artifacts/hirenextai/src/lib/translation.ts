const cache = new Map<string, string>();

function looksNonEnglish(text: string) {
  if (!text) return false;
  return /[\u0900-\u097F\u0980-\u09FF\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF]/.test(text);
}

export async function translateToEnglish(text: string): Promise<string> {
  const input = text?.trim();
  if (!input || !looksNonEnglish(input)) return input;
  if (cache.has(input)) return cache.get(input)!;

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(input.slice(0, 1200))}&langpair=auto|en`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("translation failed");
    const data = await res.json();
    const translated = (data?.responseData?.translatedText || input).trim();
    cache.set(input, translated);
    return translated;
  } catch {
    return input;
  }
}

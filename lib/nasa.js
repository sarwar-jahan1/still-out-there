// Optional enhancement: loads a public-domain image + credit from NASA's Image and Video Library API.
// The site works without it (placeholder is shown on any failure).
const cache = new Map();
export async function findImage({ nasaId, query }) {
  if (nasaId && query) {
    try {
      return await one({ nasaId });
    } catch {
      return one({ query });
    }
  }
  return one({ nasaId, query });
}
async function one({ nasaId, query }) {
  const key = nasaId || query;
  if (cache.has(key)) return cache.get(key);
  const url = nasaId
    ? `https://images-api.nasa.gov/search?nasa_id=${encodeURIComponent(nasaId)}&media_type=image`
    : `https://images-api.nasa.gov/search?media_type=image&q=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("NASA API error");
  const it = (await res.json()).collection.items.find(
    (i) => i.links && i.links[0] && i.data && i.data[0],
  );
  if (!it) throw new Error("No image");
  const d = it.data[0],
    thumb = it.links[0].href;
  const out = {
    url: thumb.replace("~thumb", "~medium"),
    fallback: thumb,
    title: d.title,
    id: d.nasa_id,
    center: d.center || "NASA",
  };
  cache.set(key, out);
  return out;
}

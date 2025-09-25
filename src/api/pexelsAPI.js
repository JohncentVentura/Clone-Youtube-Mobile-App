import Constants from "expo-constants";
const { PEXELS_API_URL, PEXELS_API_KEY } = Constants.expoConfig.extra;

export async function fetchPexelsData(query = "nature", queryCount = 3) {
  try {
    const url = `${PEXELS_API_URL}/search?query=${encodeURIComponent(
      query
    )}&per_page=${queryCount}`;

    const res = await fetch(url, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const data = await res.json();

    return data.videos || [];
  } catch (error) {
    console.error("Pexels API error:", error);
    return [];
  }
}

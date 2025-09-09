import Constants from "expo-constants";
const { PEXELS_API_URL, PEXELS_API_KEY } = Constants.expoConfig.extra;

export async function pexelsAPIfetchVideos(query = "nature", pageCount = 5) {
  try {
    const url = `${PEXELS_API_URL}/search?query=${query}&per_page=${pageCount}`;
    //console.log("Fetching from:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP status: ${response.status}`);
    }

    //const text = await response.text();
    //console.log("Raw response:", text.slice(0, 200)); // show first 200 chars
    //const data = JSON.parse(text);
    
    const data = await response.json();
    //console.log("Pexels API data.videos:", data.videos);

    return data.videos || [];
  } catch (error) {
    console.error("Pexels API error:", error);
    return [];
  }
}

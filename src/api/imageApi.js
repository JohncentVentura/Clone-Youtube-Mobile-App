import Constants from "expo-constants";
import {
  randomTimeAgo,
  roundOffNumber,
  urlToUserTag,
  urlToVideoTitle,
} from "../utils/utils";

const { PEXELS_API_URL, PEXELS_API_KEY } = Constants.expoConfig.extra;

export async function fetchImageData({
  query = "debug",
  queryResults = 3,
  signal,
}) {
  try {
    const url = `${PEXELS_API_URL}/search?query=${encodeURIComponent(
      query
    )}&per_page=${queryResults}`;

    const res = await fetch(url, {
      headers: { Authorization: PEXELS_API_KEY },
      signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = await res.json().catch(() => {
      throw new Error("Invalid JSON from Pexels");
    });

    return data.videos.map((video) => ({
      picture: video.video_pictures[0].picture,
    }));
  } catch (error) {
    console.error("fetchMainVideoData error: ", error);
    return [];
  }
}

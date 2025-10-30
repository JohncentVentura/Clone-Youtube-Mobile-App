import Constants from "expo-constants";
import {
  randomTimeAgo,
  roundOffNumber,
  urlToUserTag,
  urlToVideoTitle,
} from "../utils/utils";

const { PEXELS_API_URL, PEXELS_API_KEY } = Constants.expoConfig.extra;

export async function fetchChannelData({
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

    const seenChannels = new Set();

    return data.videos
      .filter((video) => {
        const name = video.user.name;
        if (seenChannels.has(name)) return false;
        seenChannels.add(name);
        return true;
      })
      .map((video) => ({
        picture: video.video_pictures[0].picture,
        channelName: video.user.name,
        channelTag: "@" + urlToUserTag(video.user.url),
        channelSubscribers: roundOffNumber(video.user.id),
        channelVideos: video.duration,
        channelDescription: video.url,
        channelJoinedDate: randomTimeAgo(video.user.id),
      }));
  } catch (error) {
    console.error("fetchChannelData error: ", error);
    return [];
  }
}

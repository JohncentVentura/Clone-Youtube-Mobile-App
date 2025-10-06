import Constants from "expo-constants";
import {
  getPexelsTagUserName,
  getPexelsUrlToTitle,
  randomTimeAgo,
  roundOffNumber,
} from "../utils/utils";

const { PEXELS_API_URL, PEXELS_API_KEY } = Constants.expoConfig.extra;

export async function fetchPexelsData(
  query = "pixels",
  queryCount = 3,
  signal
) {
  try {
    const url = `${PEXELS_API_URL}/search?query=${encodeURIComponent(
      query
    )}&per_page=${queryCount}`;
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
      id: video.id,
      title: getPexelsUrlToTitle(video.url),
      description: video.url,
      video: video.video_files[0].link,
      picture: video.video_pictures[0].picture,
      views: roundOffNumber(video.id),
      uploadedDate: randomTimeAgo(video.video_pictures[0].id),
      channelName: video.user.name,
      channelTag: "@" + getPexelsTagUserName(video.user.url),
      channelSubscribers: roundOffNumber(video.user.id),
      channelVideos: video.duration,
      channelDescription: video.url,
      likes: video.duration,
      commentsCount: roundOffNumber(video.duration),
      commentsDescription: video.url,
    }));
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
      return [];
    }
    console.error("Pexels API error:", error.message || error);
    return [];
  }
}

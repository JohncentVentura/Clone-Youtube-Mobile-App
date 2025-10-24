import Constants from "expo-constants";
import {
  randomTimeAgo,
  roundOffNumber,
  shortenText,
  urlToUserTag,
  urlToVideoTitle,
} from "../utils/utils";

const { PEXELS_API_URL, PEXELS_API_KEY } = Constants.expoConfig.extra;

export async function fetchShortsVideoData(query = "home", queryResults = 3) {
  try {
    const url = `${PEXELS_API_URL}/search?query=${encodeURIComponent(
      query
    )} shorts&per_page=${queryResults * 3}`;

    const res = await fetch(url, {
      headers: { Authorization: PEXELS_API_KEY },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = await res.json().catch(() => {
      throw new Error("Invalid JSON from Pexels");
    });

    //Filter videos that are portrait / vertical (Shorts-style)
    const shortVideos = data.videos.filter((video) => {
      const file = video.video_files?.[0];
      return file && file.height > file.width;
    });

    return shortVideos.map((video) => ({
      id: video.id,
      query,
      title: urlToVideoTitle(video.url),
      description: video.url,
      video: video.video_files[0].link,
      picture: video.video_pictures[0].picture,
      views: roundOffNumber(video.id),
      uploadedDate: randomTimeAgo(video.video_pictures[0].id),
      channelName: video.user.name,
      channelTag: "@" + shortenText(urlToUserTag(video.user.url), 16),
      channelSubscribers: roundOffNumber(video.user.id),
      channelVideos: video.duration,
      channelDescription: video.url,
      channelJoinedDate: randomTimeAgo(video.user.id),
      likes: video.duration,
      commentsCount: roundOffNumber(video.duration),
      commentsDescription: video.url,
    }));
  } catch (error) {
    console.error("fetchShortsVideoData error:", error.message || error);
    return [];
  }
}

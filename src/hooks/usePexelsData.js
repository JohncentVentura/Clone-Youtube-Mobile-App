import Constants from "expo-constants";
import { useEffect } from "react";

const { PEXELS_API_URL, PEXELS_API_KEY } = Constants.expoConfig.extra;
const uploadedDatesCache = {};

export async function fetchPexelsData(query = "home", queryResults = 3) {
  try {
    const url = `${PEXELS_API_URL}/search?query=${encodeURIComponent(
      query
    )}&per_page=${queryResults}`;
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
    console.error("Pexels API error:", error.message || error);
    return [];
  }
}

export function useSetPexelsDataVideos({
  query,
  queryResults,
  setVideos,
  dependecies = [],
}) {
  useEffect(() => {
    let isMounted = true;

    (async function () {
      const data = await fetchPexelsData(query, queryResults);

      if (isMounted) {
        setVideos(data);
      }
    })();

    return () => (isMounted = false);
  }, dependecies);
}

function getPexelsTagUserName(url) {
  // Remove trailing slash if it exists
  const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  // Split the URL into parts
  const parts = cleanUrl.split("@");
  // Return the part after "@"
  return parts.length > 1 ? parts[1] : null;
}

function getPexelsUrlToTitle(url) {
  const videoUrl = url;
  const splitUrl = videoUrl.split("/");
  const slug = splitUrl[splitUrl.length - 2];
  const videoTitle = slug.replace(/\d+/g, "").replace(/-+$/, ""); //remove all digits & last hyphen
  return videoTitle;
}

function randomTimeAgo(num) {
  if (uploadedDatesCache[num]) return uploadedDatesCache[num];

  const firstDigit = Number(String(Math.abs(num))[0]);
  const units = ["hour", "day", "week", "month", "year"];
  const randomUnit = units[Math.floor(Math.random() * units.length)];
  const pluralUnit = firstDigit === 1 ? randomUnit : randomUnit + "s";
  const result = `${firstDigit} ${pluralUnit} ago`;
  uploadedDatesCache[num] = result;
  return result;
}

function roundOffNumber(num) {
  num = Math.abs(num);

  if (num < 1000) {
    return num;
  } else if (num < 1_000_000) {
    const thousands = num / 1000;

    const display =
      num < 10_000
        ? thousands.toFixed(1).replace(/\.0$/, "") //Keep one decimal if < 10k
        : Math.round(thousands); //Keep whole number if ≥ 10k

    return display + "K";
  } else if (num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num < 1_000_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
}

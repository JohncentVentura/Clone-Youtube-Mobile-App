const uploadedDatesCache = {};

//#region Formatters
export function roundOffNumber(num) {
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
//#endregion

//#region Randomizers
export function randomTimeAgo(num) {
  if (uploadedDatesCache[num]) return uploadedDatesCache[num];

  const firstDigit = Number(String(Math.abs(num))[0]);
  const units = ["hour", "day", "week", "month", "year"];
  const randomUnit = units[Math.floor(Math.random() * units.length)];
  const pluralUnit = firstDigit === 1 ? randomUnit : randomUnit + "s";
  const result = `${firstDigit} ${pluralUnit} ago`;
  uploadedDatesCache[num] = result;
  return result;
}
//#endregion

//#region String Helpers
export function shortenText(text, maxLength = 20) {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
//#endregion

//#region URL Helpers
export function urlToUserTag(url) {
  // Remove trailing slash if it exists
  const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  // Split the URL into parts
  const parts = cleanUrl.split("@");
  // Return the part after "@"
  return parts.length > 1 ? parts[1] : null;
}

export function urlToVideoTitle(url) {
  const splitUrl = url.split("/");
  const slug = splitUrl[splitUrl.length - 2];
  const videoTitle = slug
    .replace(/\d+/g, "") // remove all digits
    .replace(/-/g, " ") // replace all hyphens with spaces
    .trim(); // remove leading/trailing spaces
  return videoTitle;
}
//#endregion
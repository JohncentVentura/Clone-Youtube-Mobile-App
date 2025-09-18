export function urlToTitleExtractor(url) {
  const videoUrl = url;
  const splitUrl = videoUrl.split("/");
  const slug = splitUrl[splitUrl.length - 2];
  const videoTitle = slug.replace(/\d+/g, "").replace(/-+$/, ""); //remove all digits & last hyphen
  //console.log(videoTitle);
  return videoTitle;
}

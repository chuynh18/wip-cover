"use strict";

// oh dear, pixel pushing (to align thumbnail image inside the camera body)
function positionThumbnailInCamera() {
   const thumbnailDiv = document.getElementById("camera2");
   thumbnailDiv.style.top = "224px";
   thumbnailDiv.style.left = `${0.7 * window.innerWidth / 2 - 204}px`
}

positionThumbnailInCamera();
window.addEventListener("resize", positionThumbnailInCamera);
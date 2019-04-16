"use strict";

// camera configuration object
const cameraConfig = {
   // current number of photos to display in the camera
   numPhotos: 9,
   currentPhoto: 0,
   sound: new Audio("assets/other/shutter.webm")
};

// oh dear, pixel pushing (to align thumbnail image inside the camera body)
function positionThumbnailInCamera() {
   const thumbnailDiv = document.getElementById("camera2");
   thumbnailDiv.style.top = "224px";
   thumbnailDiv.style.left = `${0.7 * window.innerWidth / 2 - 204}px`
}

// when the camera is clicked, play shutter sound and display next photo
function takePhoto() {
   const cameraScreen = document.getElementById("camera-image");

   cameraConfig.sound.play();
   cameraScreen.setAttribute("src", `assets/img/blank-small.jpg`);

   setTimeout(function() {
      cameraScreen.setAttribute("src", `assets/img/${cameraConfig.currentPhoto}s.jpg`);
      
      (cameraConfig.currentPhoto === cameraConfig.numPhotos - 1) ? cameraConfig.currentPhoto = 0 : cameraConfig.currentPhoto++;
   }, 500);
}


document.getElementById("camera1").addEventListener("click", takePhoto);
positionThumbnailInCamera();
window.addEventListener("resize", positionThumbnailInCamera);
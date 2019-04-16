"use strict";

// camera configuration object
const cameraConfig = {
   // current number of photos to display in the camera
   numPhotos: 21,
   currentPhoto: -1,
   sound: new Audio("assets/other/shutter.webm"),
   currentlyAnimating: false,
   cameraClicked: false,
   photoModal: document.getElementById("photo-modal")
};

// oh dear, pixel pushing (to align thumbnail image inside the camera body)
function positionThumbnailInCamera() {
   const thumbnailDiv = document.getElementById("camera2");
   thumbnailDiv.style.top = "224px";

   if (window.innerWidth >= 1024) {
      thumbnailDiv.style.left =
      (0.7 * window.innerWidth / 2 - 197 > 121)
      ? `${0.7 * window.innerWidth / 2 - 197}px` : "121px";
   } else {
      thumbnailDiv.style.left =
      (0.7 * window.innerWidth / 2 - 96 > 241)
      ? `${0.7 * window.innerWidth / 2 - 96}px` : "241px";
   }
}

// when the camera is clicked, play shutter sound and display next photo
function takePhoto() {
   if (cameraConfig.currentlyAnimating) {
      return;
   }

   // advance photo counter
   (cameraConfig.currentPhoto === cameraConfig.numPhotos - 1) ? cameraConfig.currentPhoto = 0 : cameraConfig.currentPhoto++;

   cameraConfig.cameraClicked = true;
   cameraConfig.currentlyAnimating = true;
   const cameraScreen = document.getElementById("camera-image");
   const cameraBody = document.getElementById("d7500");

   cameraConfig.sound.play();
   cameraScreen.setAttribute("src", "assets/img/blank-small.jpg");

   document.getElementById("large-photo").setAttribute("src", "assets/img/loading.png");

   setTimeout(function() {
      cameraBody.classList.add("camera-flash");
   }, 400);

   setTimeout(function() {
      document.getElementById("camera2").classList.add("camera-screen");
      cameraBody.classList.remove("camera-flash");
      cameraScreen.setAttribute("src", `assets/img/${cameraConfig.currentPhoto}s.jpg`);
      
      cameraConfig.currentlyAnimating = false;
   }, 500);
}

// when the camera rear display is clicked, show larger image if present
// otherwise, behave as if the camera was clicked
function showLargerImage() {
   if (!cameraConfig.cameraClicked) {
      takePhoto();
   } else {
      document.getElementById("large-photo").setAttribute("src", `assets/img/${cameraConfig.currentPhoto}l.jpg`);
      cameraConfig.photoModal.style.display = "block";
   }
}

function hideModal() {
   cameraConfig.photoModal.style.display = "none";
}

// the JavaScript below is executed!

// modal event listeners
document.getElementById("close").addEventListener("click", hideModal);
document.addEventListener("click", function(event) {
   if (event.target === cameraConfig.photoModal) {
      hideModal();
   }
});

// attach camera event listeners
document.getElementById("camera-active-layer").addEventListener("click", takePhoto);
document.getElementById("camera2").addEventListener("click", showLargerImage);

// pixel push camera image into position
positionThumbnailInCamera();
window.addEventListener("resize", positionThumbnailInCamera);
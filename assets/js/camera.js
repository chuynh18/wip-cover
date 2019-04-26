"use strict";

// camera configuration object
const cameraConfig = {
   // current number of photos to display in the camera
   numPhotos: 25,
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

   // so.  much.  pixel.  pushing.
   if (window.innerWidth >= 1024) {
      if (window.innerWidth > 1719) {
         thumbnailDiv.style.left = "313px";
      } else if (0.6 * window.innerWidth / 2 - 203 > 121) {
         thumbnailDiv.style.left = `${0.6 * window.innerWidth / 2 - 203}px`;
      } else {
         thumbnailDiv.style.left = "121px";
      }
   } else {
      thumbnailDiv.style.left =
      // 0.9 comes from the width of the containing div
      // everything else is empirically measured
      (0.9 * window.innerWidth / 2 - 200 > 122) ?
      `${0.9 * window.innerWidth / 2 - 200}px` : "122px";
   }
}

// when the camera is clicked, play shutter sound and display next photo
function takePhoto() {
   // if we're already taking a photo, don't do anything
   if (cameraConfig.currentlyAnimating) {
      return;
   }

   // if this is the first time the camera has been clicked, show the rear LCD div
   if (!cameraConfig.cameraClicked) {
      document.getElementById("camera2").classList.remove("gone");
   }

   // advance photo counter
   (cameraConfig.currentPhoto === cameraConfig.numPhotos - 1) ? cameraConfig.currentPhoto = 0 : cameraConfig.currentPhoto++;

   // set cameraClicked and currentlyAnimating flags to true (cameraClicked is now true for the rest of the session)
   cameraConfig.cameraClicked = true;
   cameraConfig.currentlyAnimating = true;
   const cameraScreen = document.getElementById("camera-image");
   const cameraBody = document.getElementById("d7500");

   // shutter sound!
   cameraConfig.sound.play();
   cameraScreen.setAttribute("src", "assets/img/blank-small.jpg");

   // set modal to gray loading png to prevent major modal size changes on slower network connections
   document.getElementById("large-photo").setAttribute("src", "assets/img/loading.png");

   // flash!
   setTimeout(function() {
      cameraBody.classList.add("camera-flash");
   }, 400);

   // set the rear LCD image, remove the flash, flip currentlyAnimating flag back to false
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
   document.getElementById("large-photo").setAttribute("src", `assets/img/${cameraConfig.currentPhoto}l.jpg`);
   cameraConfig.photoModal.style.display = "block";
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
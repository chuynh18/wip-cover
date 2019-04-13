"use strict";

const adjectives = [
   "Curious",
   "Open-minded",
   "Adaptable",
   "Friendly",
   "Imaginative",
   "Optimistic",
   "Resourceful",
   "Versatile",
   "Helpful",
   "Collaborative",
   "Team-oriented",
   "Web",
   "JavaScript",
   "Java",
   "Android"
];

const svgTarget = document.getElementById("background2");
const adj = document.getElementById("span1");

function animate() {
   adj.textContent = adjectives[Math.floor(Math.random() * adjectives.length)];
   svgTarget.classList.remove("invisible");
   svgTarget.classList.add("pulse");
   setTimeout(function() {
      svgTarget.classList.remove("pulse");
      svgTarget.classList.add("invisible");
   }, 3950);
   setTimeout(function() {
      animate();
   }, 4000);
}

animate();
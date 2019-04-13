"use strict";

// i flatter myself
const adjectives = [
   "Curious",
   "Creative",
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
const colors = ["#000000", "#990000", "#000099"];
const beziers = svgTarget.getElementsByTagName("path");

function generateRandomColor() {
   let output = "#";

   const num = Math.floor(Math.random() * Math.pow(2, 24));
   let numString = num.toString(16);

   if (numString.length !== 6) {
      numString = "0".repeat(6 - numString.length) + numString;
   }

   return output + numString;
}

function animate() {
   const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
   adj.textContent = adjective;

   svgTarget.classList.remove("invisible");
   svgTarget.classList.add("pulse");

   for (let i = 0; i < beziers.length; i++) {
      if (adjective === "Creative") {
         beziers[i].style.fill = generateRandomColor();
      } else {
         beziers[i].style.fill = colors[Math.floor(Math.random() * colors.length)];
      }
   }

   setTimeout(function() {
      svgTarget.classList.remove("pulse");
      svgTarget.classList.add("invisible");
   }, 3950);

   setTimeout(function() {
      animate();
   }, 4000);
}

// delay 2nd line animation start by 2 seconds
setTimeout(animate, 2000);
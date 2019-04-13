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


// big picture:  this exists so that we are less likely to see repeats
// at worst, we can only see one repeat per adjectives.length calls to this function
// this function makes a local copy of the array adjectives
// then it mutates the internal copy, randomly splicing one item out
// and returning that randomly selected item
// when the internal copy is empty, it re-copies the original array
const pickRandomFromList = (function(list) {
   const internalList = [...list];

   return function() {
      // if internalList becomes depleted, recreate it
      if (internalList.length === 0) {
         list.forEach(item => {internalList.push(item)});
      }

      // return a randomly selected item spliced out from internalList
      return internalList.splice(
         Math.floor(Math.random() * internalList.length),
         1
      )[0];
   }
})(adjectives);

// useful HTML elements and a color array
const svgTarget = document.getElementById("background2");
const adj = document.getElementById("span1");
const colors = ["#000000", "#990000", "#000099"];
const beziers = svgTarget.getElementsByTagName("path");

// returns random hex color codes from #000000 to #ffffff as strings
function generateRandomColor() {
   let output = "#";

   // generate random number between 0 and 2^24 (that's 0xffffff + 1)
   const num = Math.floor(Math.random() * Math.pow(2, 24));
   let numString = num.toString(16);

   // left pad string representation if necessary 
   if (numString.length !== 6) {
      numString = "0".repeat(6 - numString.length) + numString;
   }

   return output + numString;
}

// this animates the 2nd line (the line that says "{Adjective} Developer")
function animate() {
   const adjective = pickRandomFromList();
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
      animate(); // recursion
   }, 4000);
}

// delay 2nd line animation start by 2 seconds
setTimeout(animate, 2000);
"use strict";

// i flatter myself
const adjectives = [
   "Curious",
   "Creative",
   "Versatile",
   "Team-oriented",
   "JavaScript",
   "Java",
   "Android"
];

// big picture:  this exists so that we are less likely to see repeats
// this function makes a local copy of the array adjectives
// then it mutates the internal copy, randomly splicing one item out
// and returning that randomly selected item
// when the internal copy is empty, it re-copies the original array
const pickRandomFromList = (function(list) {
   // internalList is a copy of the input list, which is the adjectives array
   const internalList = [...list];

   // store value of the last element of the list
   //(to prevent it from being repeated)
   let lastItem = "";

   return function() {
      // generate a random number corresponding to an index of internalList
      let randomIndex = Math.floor(Math.random() * internalList.length);

      // if internalList becomes depleted, recreate it
      if (internalList.length === 0) {
         list.forEach(item => {internalList.push(item)});

         // randomIndex was 0 because it was generated when internalList was empty
         // this means we need to regenerate it
         randomIndex = Math.floor(Math.random() * internalList.length);

         // this prevents repeats from happening when rebuilding the list
         while (internalList[randomIndex] === lastItem) {
            randomIndex = Math.floor(Math.random() * internalList.length);
         }
      } else if (internalList.length === 1) {
         // store last item drawn from the list
         lastItem = internalList[0];
      }

      // return a randomly selected item spliced out from internalList
      return internalList.splice(randomIndex, 1)[0];
   }
})(adjectives);

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
   // useful HTML elements and a color array
   const svgTarget = document.getElementById("background2");
   const adj = document.getElementById("span1");
   const beziers = svgTarget.getElementsByTagName("path");

   // color schemes
   const colors = ["#000000", "#990000", "#000099"];
   const androidColors = ["#000000", "#a4c639"];
   const javaColors = ["#f8981d", "#5382a1"];
   const jsColors = ["#000000", "#f7df1e"];

   const adjective = pickRandomFromList();
   adj.textContent = adjective;

   svgTarget.classList.remove("invisible");
   svgTarget.classList.add("pulse");

   // situational formatting depending on the adjective
   for (let i = 0; i < beziers.length; i++) {
      if (adjective === "Creative") {
         beziers[i].style.fill = generateRandomColor();
      } else if (adjective === "Android") {
         beziers[i].style.fill = androidColors[Math.floor(Math.random() * androidColors.length)];
      } else if (adjective === "Java") {
         beziers[i].style.fill = javaColors[Math.floor(Math.random() * javaColors.length)];
      } else if (adjective === "JavaScript") {
         beziers[i].style.fill = jsColors[Math.floor(Math.random() * jsColors.length)];
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
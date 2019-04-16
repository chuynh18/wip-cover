"use strict";

// this script pertains to the header
// it handles all the animations and some of the content

// config object at the global level, so that I only
// have to touch one place in code for common changes
const config = {
   // config options for the typing part of the intro animation
   typingAnimation: {
      // how fast cursor blinks (in hello <company name>)
      CURSOR_BLINK_SPEED: 300,

      // defines the cursor aka insertion point character
      CURSOR_CHAR: "█",

      // iterations of for loop before typing begins
      // correlates to the time the cursor blinks before typing animation begins
      NUM_ITERATIONS_BEFORE_TYPING: 12,

      // duration of typing animation
      // the followup animation only starts when typing ends
      DURATION: 2000,

      // message to type
      MESSAGE: "Hello <company name>, I'm..."
   },

   // config options pertaining to the <adjective> developer line 
   developerLine: {
      // time delay between displaying my name and beginning cyclic animation of developer line
      DELAY_BETWEEN_NAME_AND_DEVELOPER_LINE: 1200,

      // default color scheme when an adjective does not provide its own color scheme
      DEFAULT_COLOR_SCHEME: ["#000000", "#990000", "#000099"],

      // how long each cycle takes
      // MUST also edit animation duration for .pulse class in style.css!
      CYCLE_TIME: 4000,

      // list of possible CSS animation class names
      ANIMATIONS: ["pulse", "pulse2"]
   },

   name: "Christopher Huynh",

   // array of objects containing adjectives to display before "developer"
   // MUST contain "word" key; the value is a string
   // optionally can contain "color" key.
   // "color" key can be an array of strings corresponding to HTML color codes
   // OR can be a function that returns an HTML color code as a string
   adjectives: [
      {word: "Curious"},
      {word: "Creative", color: generateRandomColor},
      {word: "Versatile"},
      {word: "Team-oriented"},
      {word: "JavaScript", color: ["#000000", "#f7df1e"]},
      {word: "Java", color: ["#f8981d", "#5382a1"]},
      {word: "Android", color: ["#000000", "#a4c639"]}
   ],

   // the noun that comes after the adjectives
   noun: "developer"
};

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
         do {
            randomIndex = Math.floor(Math.random() * internalList.length);
         }
         while (internalList[randomIndex] === lastItem);
      } else if (internalList.length === 1) {
         // store last item drawn from the list
         lastItem = internalList[0];
      }

      // return a randomly selected item spliced out from internalList
      return internalList.splice(randomIndex, 1)[0];
   }
})(config.adjectives);

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
   const svgTarget2 = document.getElementById("background2");
   const adj = document.getElementById("adjective");
   const beziers = svgTarget2.getElementsByTagName("path");
   const possibleAnimations = config.developerLine.ANIMATIONS;
   const animation = possibleAnimations[Math.floor(Math.random() * possibleAnimations.length)];

   // color scheme
   const colors = config.developerLine.DEFAULT_COLOR_SCHEME;

   const adjective = pickRandomFromList();
   adj.textContent = adjective.word;

   svgTarget2.classList.remove("invisible");
   svgTarget2.classList.add(animation);

   // situational formatting depending on the adjective
   for (let i = 0; i < beziers.length; i++) {
      if (!adjective.color) {
         beziers[i].style.fill = colors[Math.floor(Math.random() * colors.length)];
      } else if (typeof adjective.color === "function") {
         beziers[i].style.fill = adjective.color();
      } else {
         beziers[i].style.fill = adjective.color[Math.floor(Math.random() * adjective.color.length)];
      }
   }

   setTimeout(function() {
      svgTarget2.classList.remove(animation);
      svgTarget2.classList.add("invisible");
   }, config.developerLine.CYCLE_TIME - 50);

   setTimeout(function() {
      animate(); // recursion
   }, config.developerLine.CYCLE_TIME);
}

// center intro approximately vertically in screen
function setHeaderHeight() {
   const headerContainer = document.getElementById("header-container");
   const height = window.innerHeight;
   headerContainer.style.height = `${height - 95}px`;
}

// this "master" function gets called and coordinates ALL the intro animations
function greet() {
   const msg = config.typingAnimation.MESSAGE;
   const duration = config.typingAnimation.DURATION;
   const blinkSpeed = config.typingAnimation.CURSOR_BLINK_SPEED;
   const numIterationsBeforeTyping = config.typingAnimation.NUM_ITERATIONS_BEFORE_TYPING;
   const cursorChar = config.typingAnimation.CURSOR_CHAR;
   const developerLineDelay = config.developerLine.DELAY_BETWEEN_NAME_AND_DEVELOPER_LINE;
   const greet = document.getElementById("greetings");
   let cursor = "";

   // make header container tall enough to push the rest of the page down
   setHeaderHeight();

   // add event listener to ensure the header is always appropriately sized
   window.addEventListener("resize", setHeaderHeight);

   // set my name
   document.getElementById("my-name").textContent = config.name;

   // set the noun
   document.getElementById("noun").textContent = config.noun;

   // responsible for the blinking insertion point
   setInterval(function() {
      cursor = cursorChar;

      setTimeout(function() {
         cursor = cursorChar.substring(0,0);
      }, blinkSpeed);
   }, 2 * blinkSpeed);

   // displays blinking insertion point
   for (let i = 0; i < numIterationsBeforeTyping; i++) {
      setTimeout(function() {
         greet.textContent = cursor;
      }, 100 * i);
   }

   // plays typing animation that shows string from config.typingAnimation.MESSAGE
   setTimeout(function() {
      for (let i = 0; i <= msg.length; i++) {
         setTimeout(function() {
            greet.textContent = msg.substring(0, i) + cursor;
         }, i * Math.floor(duration / msg.length));
      }
   }, 100 * numIterationsBeforeTyping);

   setTimeout(function() {
      // ensures cursor continues to blink after typing animation concludes
      setInterval(function() {
         greet.textContent = msg + cursor;
      }, 100);

      // displays my name
      const svgTarget1 = document.getElementById("background");

      svgTarget1.classList.remove("invisible");
      svgTarget1.classList.add("my-name");

   }, duration + 100 * numIterationsBeforeTyping);

   // starts "<adjective> developer" animation
   setTimeout(animate, duration + (100 * numIterationsBeforeTyping) + developerLineDelay);
}

// kick it all off!
greet();
/* =========================================================
   C.U.L.T. FREE BOOK CHAOS SYSTEM

   PURPOSE:
   Creatures explode out of the Order Summary ONCE.

   After the opening explosion, they settle into fixed
   positions around the receipt and continue spinning,
   bobbing and wobbling in place.

   This file is ONLY used by cult-free.html.
   ========================================================= */


/* =========================================================
   CHAOS CHARACTERS

   Add or remove emojis here whenever you want.
   ========================================================= */

const chaosCharacters = [
  "🦄",
  "🐹",
  "🌈",
  "✨",
  "⭐",
  "💖",
  "🎀",
  "💫"
];


/* =========================================================
   HOW MANY CREATURES APPEAR

   Increase this number for more chaos.
   ========================================================= */

const creatureCount = 20;


/* =========================================================
   FIND IMPORTANT PAGE ELEMENTS
   ========================================================= */

const receipt =
  document.querySelector(".cult-receipt");

const behindLayer =
  document.getElementById("cult-chaos-behind");

const frontLayer =
  document.getElementById("cult-chaos-front");


/* =========================================================
   ACCESSIBILITY

   If someone has reduced-motion enabled,
   do not run the animation.
   ========================================================= */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   START THE CHAOS
   ========================================================= */

if (
  receipt &&
  behindLayer &&
  frontLayer &&
  !prefersReducedMotion
) {

  setTimeout(() => {

    releaseCreatures();

  }, 450);

}


/* =========================================================
   RELEASE CREATURES

   They begin in the centre of the receipt,
   fly outward once,
   then stay around it permanently.
   ========================================================= */

function releaseCreatures() {

  const receiptBox =
    receipt.getBoundingClientRect();


  const startX =
    receiptBox.left +
    receiptBox.width / 2;


  const startY =
    receiptBox.top +
    receiptBox.height / 2;


  for (
    let i = 0;
    i < creatureCount;
    i++
  ) {

    createCreature(
      i,
      startX,
      startY,
      receiptBox
    );

  }

}


/* =========================================================
   CREATE ONE CREATURE
   ========================================================= */

function createCreature(
  index,
  startX,
  startY,
  receiptBox
) {

  const creature =
    document.createElement("span");


  creature.className =
    "cult-chaos-particle";


  creature.textContent =
    randomCharacter();


  /* =====================================================
     FRONT OR BACK

     Some creatures appear behind the page.
     Others appear in front of normal page content.

     The receipt itself stays above all of them.
     ===================================================== */

  const layer =
    Math.random() < 0.45
      ? behindLayer
      : frontLayer;


  layer.appendChild(creature);


  /* =====================================================
     RANDOM CREATURE SIZE
     ===================================================== */

  creature.style.fontSize =
    `${randomNumber(28, 62)}px`;


  /* =====================================================
     START INSIDE ORDER SUMMARY
     ===================================================== */

  creature.style.left =
    `${startX}px`;

  creature.style.top =
    `${startY}px`;


  /* =====================================================
     FIND A FIXED DESTINATION

     Creatures are distributed around the receipt,
     rather than directly on top of it.
     ===================================================== */

  const destination =
    getPositionAroundReceipt(
      index,
      receiptBox
    );


  const moveX =
    destination.x -
    startX;


  const moveY =
    destination.y -
    startY;


  /* =====================================================
     OPENING EXPLOSION

     Creature flies outward ONCE.
     ===================================================== */

  const openingAnimation =
    creature.animate(

      [
        {
          transform:
            "translate(-50%, -50%) scale(0.2) rotate(0deg)",

          opacity: 0
        },

        {
          opacity: 1,
          offset: 0.12
        },

        {
          transform:
            `translate(-50%, -50%)
             translate(
               ${moveX}px,
               ${moveY}px
             )
             scale(1)
             rotate(
               ${randomNumber(-540, 540)}deg
             )`,

          opacity: 1
        }
      ],

      {
        duration:
          randomNumber(
            1400,
            2400
          ),

        easing:
          "cubic-bezier(.15,.75,.25,1)",

        fill:
          "forwards"
      }

    );


  /* =====================================================
     AFTER THE EXPLOSION

     Move the creature permanently to its destination,
     then start its little in-place animation.
     ===================================================== */

  openingAnimation.finished.then(() => {

    creature.style.left =
      `${destination.x}px`;

    creature.style.top =
      `${destination.y}px`;

    creature.style.transform =
      "translate(-50%, -50%)";


    startIdleAnimation(
      creature
    );

  });

}


/* =========================================================
   POSITIONS AROUND THE RECEIPT

   Creatures form a loose ring around the Order Summary.

   They are deliberately pushed OUTSIDE the receipt area
   so the receipt stays readable.
   ========================================================= */

function getPositionAroundReceipt(
  index,
  receiptBox
) {

  const angle =
    (
      index /
      creatureCount
    ) *
    Math.PI *
    2;


  /* Horizontal distance from receipt */

  const radiusX =
    receiptBox.width / 2 +
    randomNumber(
      70,
      180
    );


  /* Vertical distance from receipt */

  const radiusY =
    receiptBox.height / 2 +
    randomNumber(
      50,
      140
    );


  let x =
    receiptBox.left +
    receiptBox.width / 2 +
    Math.cos(angle) *
    radiusX;


  let y =
    receiptBox.top +
    receiptBox.height / 2 +
    Math.sin(angle) *
    radiusY;


  /* =====================================================
     KEEP THEM INSIDE THE SCREEN
     ===================================================== */

  x =
    Math.max(
      30,
      Math.min(
        window.innerWidth - 30,
        x
      )
    );


  y =
    Math.max(
      30,
      Math.min(
        window.innerHeight - 30,
        y
      )
    );


  return {
    x,
    y
  };

}


/* =========================================================
   IDLE ANIMATION

   After settling, each creature stays in its own place
   and gently spins / bobs / wiggles forever.
   ========================================================= */

function startIdleAnimation(
  creature
) {

  const bobAmount =
    randomNumber(
      5,
      16
    );


  const rotationAmount =
    randomNumber(
      12,
      45
    );


  const direction =
    Math.random() < 0.5
      ? -1
      : 1;


  creature.animate(

    [
      {
        transform:
          "translate(-50%, -50%) translateY(0) rotate(0deg)"
      },

      {
        transform:
          `translate(-50%, -50%)
           translateY(-${bobAmount}px)
           rotate(
             ${rotationAmount * direction}deg
           )`
      },

      {
        transform:
          `translate(-50%, -50%)
           translateY(${bobAmount / 2}px)
           rotate(
             ${-rotationAmount * direction}deg
           )`
      },

      {
        transform:
          "translate(-50%, -50%) translateY(0) rotate(0deg)"
      }
    ],

    {
      duration:
        randomNumber(
          2600,
          5200
        ),

      iterations:
        Infinity,

      easing:
        "ease-in-out"
    }

  );

}


/* =========================================================
   RANDOM CHARACTER
   ========================================================= */

function randomCharacter() {

  return chaosCharacters[
    Math.floor(
      Math.random() *
      chaosCharacters.length
    )
  ];

}


/* =========================================================
   RANDOM NUMBER
   ========================================================= */

function randomNumber(
  minimum,
  maximum
) {

  return (
    Math.random() *
    (maximum - minimum) +
    minimum
  );

}

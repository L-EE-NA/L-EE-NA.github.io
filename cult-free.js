/* =========================================================
   C.U.L.T. FREE BOOK CHAOS SYSTEM

   PURPOSE:
   Makes unicorns, hamsters, rainbows, sparkles and other
   nonsense explode out of the fake Order Summary.

   Some creatures fly BEHIND the page.
   Some creatures fly IN FRONT of the page.

   This file is ONLY used by cult-free.html.
   ========================================================= */


/* =========================================================
   CHAOS CHARACTERS

   Add or remove emojis from this list whenever you want.
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
   CHAOS AMOUNTS

   Increase these numbers for more insanity.
   Lower them if the page becomes too chaotic.

   openingExplosionSize:
   Big explosion when the page first loads.

   wanderingCreatureCount:
   Creatures that keep flying around indefinitely.

   repeatingExplosionSize:
   Smaller explosions that happen every few seconds.
   ========================================================= */

const openingExplosionSize = 55;

const wanderingCreatureCount = 22;

const repeatingExplosionSize = 14;


/* =========================================================
   FIND THE IMPORTANT HTML ELEMENTS
   ========================================================= */

const receipt =
  document.querySelector(".cult-receipt");

const behindLayer =
  document.getElementById("cult-chaos-behind");

const frontLayer =
  document.getElementById("cult-chaos-front");


/* =========================================================
   REDUCED MOTION CHECK

   If somebody has asked their browser/device for reduced
   animation, we do not generate the chaos.
   ========================================================= */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   START ONLY IF EVERYTHING EXISTS
   ========================================================= */

if (
  receipt &&
  behindLayer &&
  frontLayer &&
  !prefersReducedMotion
) {

  startCultChaos();

}


/* =========================================================
   START THE CHAOS
   ========================================================= */

function startCultChaos() {

  /* Give the page a tiny moment to load first. */

  setTimeout(() => {

    createExplosion(openingExplosionSize);

    createWanderingCreatures(
      wanderingCreatureCount
    );

  }, 450);


  /* =======================================================
     REPEATING EXPLOSIONS

     Every 5.2 seconds, the receipt spits out another
     smaller batch of magical nonsense.
     ======================================================= */

  setInterval(() => {

    createExplosion(
      repeatingExplosionSize
    );

  }, 5200);


  /* =======================================================
     CLICKING THE RECEIPT

     If somebody clicks the Order Summary,
     another explosion immediately happens.
     ======================================================= */

  receipt.addEventListener(
    "click",
    () => {

      createExplosion(25);

    }
  );

}


/* =========================================================
   CREATE AN EXPLOSION

   All particles begin in the centre of the Order Summary
   and shoot outward in random directions.
   ========================================================= */

function createExplosion(amount) {

  const receiptBox =
    receipt.getBoundingClientRect();


  /* Centre of the receipt on the screen */

  const startX =
    receiptBox.left +
    receiptBox.width / 2;

  const startY =
    receiptBox.top +
    receiptBox.height / 2;


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    /* =====================================================
       CREATE ONE PARTICLE
       ===================================================== */

    const particle =
      document.createElement("span");


    particle.className =
      "cult-chaos-particle cult-chaos-burst";


    particle.textContent =
      randomCharacter();


    /* =====================================================
       CHOOSE WHETHER IT FLIES BEHIND OR IN FRONT

       Roughly half go behind the page.
       Roughly half fly directly across it.
       ===================================================== */

    const layer =
      Math.random() < 0.5
        ? behindLayer
        : frontLayer;


    layer.appendChild(particle);


    /* =====================================================
       START IN THE CENTRE OF THE RECEIPT
       ===================================================== */

    particle.style.left =
      `${startX}px`;

    particle.style.top =
      `${startY}px`;


    /* =====================================================
       RANDOM SIZE
       ===================================================== */

    particle.style.fontSize =
      `${randomNumber(24, 65)}px`;


    /* =====================================================
       RANDOM DIRECTION + DISTANCE
       ===================================================== */

    const angle =
      Math.random() *
      Math.PI *
      2;


    const distance =
      randomNumber(250, 850);


    const destinationX =
      Math.cos(angle) *
      distance;


    const destinationY =
      Math.sin(angle) *
      distance;


    particle.style.setProperty(
      "--chaos-x",
      `${destinationX}px`
    );


    particle.style.setProperty(
      "--chaos-y",
      `${destinationY}px`
    );


    /* =====================================================
       RANDOM SPIN
       ===================================================== */

    particle.style.setProperty(
      "--chaos-rotation",
      `${randomNumber(-900, 900)}deg`
    );


    /* =====================================================
       RANDOM FINAL SIZE
       ===================================================== */

    particle.style.setProperty(
      "--chaos-scale",
      randomNumber(0.7, 1.6)
    );


    /* =====================================================
       RANDOM ANIMATION SPEED
       ===================================================== */

    const duration =
      randomNumber(2200, 4800);


    particle.style.setProperty(
      "--chaos-duration",
      `${duration}ms`
    );


    /* =====================================================
       CLEAN UP AFTER THE EXPLOSION

       Removes finished particles so thousands of invisible
       emojis do not accumulate in the page forever.
       ===================================================== */

    setTimeout(() => {

      particle.remove();

    }, duration + 250);

  }

}


/* =========================================================
   CREATE WANDERING CREATURES

   These do NOT disappear.

   They continually fly between random locations around
   the screen, spinning as they travel.
   ========================================================= */

function createWanderingCreatures(amount) {

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
    i < amount;
    i++
  ) {

    /* =====================================================
       CREATE CREATURE
       ===================================================== */

    const creature =
      document.createElement("span");


    creature.className =
      "cult-chaos-particle";


    creature.textContent =
      randomCharacter();


    /* =====================================================
       FRONT OR BACK LAYER
       ===================================================== */

    const layer =
      Math.random() < 0.45
        ? behindLayer
        : frontLayer;


    layer.appendChild(creature);


    /* =====================================================
       START AT THE RECEIPT
       ===================================================== */

    creature.style.left =
      `${startX}px`;

    creature.style.top =
      `${startY}px`;


    creature.style.fontSize =
      `${randomNumber(28, 72)}px`;


    /* =====================================================
       BUILD RANDOM FLIGHT PATH

       First point keeps the creature at the receipt.
       The remaining points send it around the screen.
       ===================================================== */

    const waypoints = [

      {
        transform:
          "translate(-50%, -50%) rotate(0deg) scale(0.3)"
      }

    ];


    for (
      let point = 0;
      point < 7;
      point++
    ) {

      const targetX =
        randomNumber(
          30,
          Math.max(
            31,
            window.innerWidth - 70
          )
        );


      const targetY =
        randomNumber(
          30,
          Math.max(
            31,
            window.innerHeight - 70
          )
        );


      const translateX =
        targetX -
        startX;


      const translateY =
        targetY -
        startY;


      waypoints.push({

        transform:
          `translate(-50%, -50%)
           translate(
             ${translateX}px,
             ${translateY}px
           )
           rotate(
             ${randomNumber(-700, 700)}deg
           )
           scale(
             ${randomNumber(0.7, 1.4)}
           )`

      });

    }


    /* =====================================================
       ANIMATE FOREVER
       ===================================================== */

    creature.animate(

      waypoints,

      {
        duration:
          randomNumber(
            11000,
            23000
          ),

        iterations:
          Infinity,

        direction:
          "alternate",

        easing:
          "ease-in-out"
      }

    );

  }

}


/* =========================================================
   RANDOM CHARACTER

   Picks one emoji from chaosCharacters.
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

   Used for random sizes, positions, spins and speeds.
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

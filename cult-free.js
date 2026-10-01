/* =========================================================
   C.U.L.T. FREE BOOK - CURATED CHAOS SYSTEM

   PURPOSE:
   The creatures burst out of the Order Summary ONCE.

   They then settle into deliberately chosen positions
   around the OUTSIDE of the page content.

   After settling, every creature stays in its own spot
   but has its own movement:
   hovering, spinning, flipping, wiggling, bouncing, etc.

   This file is ONLY used by cult-free.html.
   ========================================================= */


/* =========================================================
   CREATURE LAYOUT

   x = horizontal position as a percentage of the screen.
   y = vertical position as a percentage of the screen.

   size = emoji size in pixels.

   move = animation style after the creature settles.

   layer:
   front  = clear and colourful
   behind = softer background decoration

   The positions are deliberately concentrated around
   the OUTER EDGES so the writing remains readable.
   ========================================================= */

const chaosItems = [

  /* ===== TOP OUTER AREA ===== */

  {
    emoji: "🦄",
    x: 7,
    y: 10,
    size: 56,
    move: "hover",
    layer: "front"
  },

  {
    emoji: "🫧",
    x: 20,
    y: 7,
    size: 48,
    move: "pulse",
    layer: "behind"
  },

  {
    emoji: "🌟",
    x: 82,
    y: 8,
    size: 48,
    move: "spin",
    layer: "behind"
  },

  {
    emoji: "🍭",
    x: 94,
    y: 13,
    size: 50,
    move: "wiggle",
    layer: "front"
  },


  /* ===== LEFT SIDE ===== */

  {
    emoji: "🐹",
    x: 6,
    y: 27,
    size: 54,
    move: "bounce",
    layer: "front"
  },

  {
    emoji: "🌈",
    x: 13,
    y: 38,
    size: 52,
    move: "sway",
    layer: "front"
  },

  {
    emoji: "🎀",
    x: 6,
    y: 49,
    size: 50,
    move: "flip",
    layer: "front"
  },

  {
    emoji: "🍓",
    x: 13,
    y: 60,
    size: 48,
    move: "hover",
    layer: "front"
  },

  {
    emoji: "💫",
    x: 6,
    y: 72,
    size: 48,
    move: "spin-reverse",
    layer: "front"
  },

  {
    emoji: "🧁",
    x: 14,
    y: 84,
    size: 50,
    move: "wiggle",
    layer: "front"
  },

  {
    emoji: "☁️",
    x: 7,
    y: 92,
    size: 62,
    move: "float",
    layer: "behind"
  },


  /* ===== RIGHT SIDE ===== */

  {
    emoji: "🦋",
    x: 94,
    y: 25,
    size: 48,
    move: "flutter",
    layer: "front"
  },

  {
    emoji: "💖",
    x: 86,
    y: 36,
    size: 52,
    move: "pulse",
    layer: "front"
  },

  {
    emoji: "⭐",
    x: 94,
    y: 48,
    size: 54,
    move: "spin",
    layer: "front"
  },

  {
    emoji: "🍬",
    x: 86,
    y: 60,
    size: 46,
    move: "flip",
    layer: "front"
  },

  {
    emoji: "🐣",
    x: 94,
    y: 71,
    size: 48,
    move: "bounce",
    layer: "front"
  },

  {
    emoji: "🌸",
    x: 86,
    y: 82,
    size: 50,
    move: "sway",
    layer: "front"
  },

  {
    emoji: "🦄",
    x: 94,
    y: 92,
    size: 54,
    move: "hover",
    layer: "front"
  },


  /* ===== BOTTOM OUTER AREA ===== */

  {
    emoji: "🌈",
    x: 28,
    y: 88,
    size: 54,
    move: "wiggle",
    layer: "front"
  },

  {
    emoji: "✨",
    x: 38,
    y: 94,
    size: 46,
    move: "spin",
    layer: "front"
  },

  {
    emoji: "💕",
    x: 63,
    y: 94,
    size: 48,
    move: "pulse",
    layer: "front"
  },

  {
    emoji: "🎀",
    x: 74,
    y: 88,
    size: 52,
    move: "flip",
    layer: "front"
  }

];


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
   ========================================================= */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   START
   ========================================================= */

if (
  receipt &&
  behindLayer &&
  frontLayer &&
  !prefersReducedMotion
) {

  setTimeout(() => {

    releaseChaos();

  }, 450);

}


/* =========================================================
   RELEASE ALL CREATURES

   Every creature begins in the centre of the receipt.

   They burst outward ONCE toward their assigned position.
   ========================================================= */

function releaseChaos() {

  const receiptBox =
    receipt.getBoundingClientRect();


  const startX =
    receiptBox.left +
    receiptBox.width / 2;


  const startY =
    receiptBox.top +
    receiptBox.height / 2;


  /* =======================================================
     MOBILE

     On smaller screens we use every second creature,
     otherwise the screen becomes overcrowded.
     ======================================================= */

  const isMobile =
    window.innerWidth < 700;


  const itemsToUse =
    isMobile
      ? chaosItems.filter(
          (item, index) =>
            index % 2 === 0
        )
      : chaosItems;


  itemsToUse.forEach(
    (item, index) => {

      createCreature(
        item,
        index,
        startX,
        startY,
        isMobile
      );

    }
  );

}


/* =========================================================
   CREATE ONE CREATURE
   ========================================================= */

function createCreature(
  item,
  index,
  startX,
  startY,
  isMobile
) {

  const creature =
    document.createElement("span");


  creature.className =
    "cult-chaos-particle";


  creature.textContent =
    item.emoji;


  /* =======================================================
     CHOOSE FRONT OR BACK LAYER
     ======================================================= */

  const layer =
    item.layer === "behind"
      ? behindLayer
      : frontLayer;


  layer.appendChild(creature);


  /* =======================================================
     BACKGROUND CREATURES ARE SOFTER
     ======================================================= */

  const settledOpacity =
    item.layer === "behind"
      ? 0.18
      : 1;


  /* =======================================================
     SIZE

     Slightly smaller on phones.
     ======================================================= */

  const finalSize =
    isMobile
      ? item.size * 0.72
      : item.size;


  creature.style.fontSize =
    `${finalSize}px`;


  /* =======================================================
     START INSIDE THE RECEIPT
     ======================================================= */

  creature.style.left =
    `${startX}px`;

  creature.style.top =
    `${startY}px`;


  creature.style.opacity = 0;


  /* =======================================================
     DESTINATION

     Converts our percentage coordinates into actual
     screen positions.
     ======================================================= */

  const destinationX =
    window.innerWidth *
    (item.x / 100);


  const destinationY =
    window.innerHeight *
    (item.y / 100);


  const moveX =
    destinationX -
    startX;


  const moveY =
    destinationY -
    startY;


  /* =======================================================
     SMALL OVERSHOOT

     Makes the opening movement feel like a proper burst
     instead of a boring straight slide.
     ======================================================= */

  const overshootX =
    moveX * 1.08;


  const overshootY =
    moveY * 1.08;


  /* =======================================================
     OPENING BURST

     This happens ONCE.
     ======================================================= */

  const burst =
    creature.animate(

      [
        {
          transform:
            "translate(-50%, -50%) scale(0.15) rotate(0deg)",

          opacity: 0
        },

        {
          transform:
            `translate(-50%, -50%)
             translate(
               ${overshootX}px,
               ${overshootY}px
             )
             scale(1.12)
             rotate(
               ${randomNumber(-420, 420)}deg
             )`,

          opacity: settledOpacity,

          offset: 0.82
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
               ${randomNumber(-50, 50)}deg
             )`,

          opacity: settledOpacity
        }
      ],

      {
        duration:
          randomNumber(
            1250,
            2100
          ),

        delay:
          index * 18,

        easing:
          "cubic-bezier(.18,.76,.25,1)",

        fill:
          "forwards"
      }

    );


  /* =======================================================
     AFTER THE BURST

     Permanently move the creature to its final position.

     It will NEVER travel around the screen again.
     ======================================================= */

  burst.finished.then(() => {

    burst.cancel();


    creature.style.left =
      `${destinationX}px`;


    creature.style.top =
      `${destinationY}px`;


    creature.style.opacity =
      settledOpacity;


    creature.style.transform =
      "translate(-50%, -50%)";


    startIdleMovement(
      creature,
      item.move
    );

  });

}


/* =========================================================
   IDLE MOVEMENT

   The creature remains in ONE fixed location.

   Only its local movement changes.
   ========================================================= */

function startIdleMovement(
  creature,
  movement
) {

  let frames;

  let duration;

  let easing =
    "ease-in-out";


  /* =======================================================
     HOVER
     ======================================================= */

  if (movement === "hover") {

    frames = [

      {
        transform:
          "translate(-50%, -50%) translateY(0) rotate(-3deg)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(-11px) rotate(4deg)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(0) rotate(-3deg)"
      }

    ];

    duration =
      randomNumber(
        3000,
        4500
      );

  }


  /* =======================================================
     FLOAT
     ======================================================= */

  else if (movement === "float") {

    frames = [

      {
        transform:
          "translate(-50%, -50%) translate(0, 0)"
      },

      {
        transform:
          "translate(-50%, -50%) translate(7px, -9px)"
      },

      {
        transform:
          "translate(-50%, -50%) translate(-5px, -3px)"
      },

      {
        transform:
          "translate(-50%, -50%) translate(0, 0)"
      }

    ];

    duration =
      randomNumber(
        5000,
        7000
      );

  }


  /* =======================================================
     SPIN CLOCKWISE
     ======================================================= */

  else if (movement === "spin") {

    frames = [

      {
        transform:
          "translate(-50%, -50%) rotate(0deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(360deg)"
      }

    ];

    duration =
      randomNumber(
        5500,
        8500
      );

    easing =
      "linear";

  }


  /* =======================================================
     SPIN ANTICLOCKWISE
     ======================================================= */

  else if (movement === "spin-reverse") {

    frames = [

      {
        transform:
          "translate(-50%, -50%) rotate(0deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(-360deg)"
      }

    ];

    duration =
      randomNumber(
        5000,
        8000
      );

    easing =
      "linear";

  }


  /* =======================================================
     WIGGLE
     ======================================================= */

  else if (movement === "wiggle") {

    frames = [

      {
        transform:
          "translate(-50%, -50%) rotate(0deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(-11deg) translateX(-4px)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(9deg) translateX(4px)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(-5deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(0deg)"
      }

    ];

    duration =
      randomNumber(
        2300,
        3400
      );

  }


  /* =======================================================
     FLIP
     ======================================================= */

  else if (movement === "flip") {

    frames = [

      {
        transform:
          "translate(-50%, -50%) rotateY(0deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotateY(180deg) scale(1.08)"
      },

      {
        transform:
          "translate(-50%, -50%) rotateY(360deg)"
      }

    ];

    duration =
      randomNumber(
        4200,
        6500
      );

  }


  /* =======================================================
     BOUNCE
     ======================================================= */

  else if (movement === "bounce") {

    frames = [

      {
        transform:
          "translate(-50%, -50%) translateY(0) scaleY(1)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(-13px) scaleY(1.04)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(0) scaleY(0.95)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(0) scaleY(1)"
      }

    ];

    duration =
      randomNumber(
        2400,
        3500
      );

  }


  /* =======================================================
     SWAY
     ======================================================= */

  else if (movement === "sway") {

    frames = [

      {
        transform:
          "translate(-50%, -50%) rotate(-9deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(9deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(-9deg)"
      }

    ];

    duration =
      randomNumber(
        3200,
        4800
      );

  }


  /* =======================================================
     PULSE
     ======================================================= */

  else if (movement === "pulse") {

    frames = [

      {
        transform:
          "translate(-50%, -50%) scale(1)"
      },

      {
        transform:
          "translate(-50%, -50%) scale(1.14)"
      },

      {
        transform:
          "translate(-50%, -50%) scale(1)"
      }

    ];

    duration =
      randomNumber(
        2200,
        3400
      );

  }


  /* =======================================================
     BUTTERFLY FLUTTER
     ======================================================= */

  else if (movement === "flutter") {

    frames = [

      {
        transform:
          "translate(-50%, -50%) rotate(-4deg) scaleX(1)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(5deg) scaleX(0.82)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(-3deg) scaleX(1)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(4deg) scaleX(0.88)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(-4deg) scaleX(1)"
      }

    ];

    duration =
      randomNumber(
        1500,
        2300
      );

  }


  /* =======================================================
     FALLBACK

     If a movement name is ever mistyped,
     the creature simply hovers.
     ======================================================= */

  else {

    frames = [

      {
        transform:
          "translate(-50%, -50%) translateY(0)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(-8px)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(0)"
      }

    ];

    duration =
      3500;

  }


  /* =======================================================
     RUN IDLE MOVEMENT FOREVER

     Random delay prevents everything moving in sync.
     ======================================================= */

  creature.animate(

    frames,

    {
      duration: duration,

      delay:
        randomNumber(
          0,
          1800
        ),

      iterations:
        Infinity,

      easing: easing
    }

  );

}


/* =========================================================
   RANDOM NUMBER HELPER
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

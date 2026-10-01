/* =========================================================
   C.U.L.T. FREE BOOK CHAOS SYSTEM

   WHAT THIS DOES:

   1. Emojis explode out of the Order Summary ONCE.
   2. They scatter around the screen.
   3. They stay where they land.
   4. Each emoji gets its own little movement:
      spinning, hovering, flipping, wiggling, pulsing, etc.
   5. There are NO repeating explosions.

   This file is ONLY used by cult-free.html.
   ========================================================= */


/* =========================================================
   EMOJI COLLECTION

   Add or remove emojis from this list whenever you want.
   ========================================================= */

const chaosCharacters = [
  "🦄",
  "🐹",
  "🌈",
  "✨",
  "⭐",
  "🌟",
  "💖",
  "💕",
  "💫",
  "🎀",
  "🦋",
  "🌸",
  "🍓",
  "🍒",
  "🧁",
  "🍭",
  "🍬",
  "🍦",
  "🐣",
  "☁️",
  "🫧",
  "🌙",
  "🪩",
  "🍪",
  "🧸"
];


/* =========================================================
   SETTINGS

   totalParticles:
   How many emojis explode out.

   Increase it for more insanity.
   Decrease it if it feels crowded.
   ========================================================= */

const totalParticles = 38;


/* =========================================================
   FIND THE PAGE ELEMENTS
   ========================================================= */

const receipt =
  document.querySelector(".cult-receipt");

const behindLayer =
  document.getElementById("cult-chaos-behind");

const frontLayer =
  document.getElementById("cult-chaos-front");


/* =========================================================
   ACCESSIBILITY

   If somebody has reduced motion enabled,
   we do not run the chaos.
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

    releaseChaos();

  }, 450);

}


/* =========================================================
   RELEASE THE ONE-TIME EXPLOSION
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


  for (
    let i = 0;
    i < totalParticles;
    i++
  ) {

    createParticle(
      startX,
      startY,
      receiptBox,
      i
    );

  }

}


/* =========================================================
   CREATE ONE EMOJI
   ========================================================= */

function createParticle(
  startX,
  startY,
  receiptBox,
  index
) {

  const particle =
    document.createElement("span");


  particle.className =
    "cult-chaos-particle";


  particle.textContent =
    randomFrom(
      chaosCharacters
    );


  /* =======================================================
     FRONT OR BACK

     Most are fully visible in front.

     Some go into the softer background layer.
     ======================================================= */

  const isBehind =
    Math.random() < 0.22;


  const layer =
    isBehind
      ? behindLayer
      : frontLayer;


  layer.appendChild(
    particle
  );


  /* =======================================================
     SIZE
     ======================================================= */

  const size =
    randomNumber(
      28,
      67
    );


  particle.style.fontSize =
    `${size}px`;


  /* =======================================================
     START INSIDE THE ORDER SUMMARY
     ======================================================= */

  particle.style.left =
    `${startX}px`;


  particle.style.top =
    `${startY}px`;


  particle.style.opacity =
    0;


  /* =======================================================
     CHOOSE WHERE THIS EMOJI WILL LAND

     The function below tries to keep the final emoji
     OUTSIDE the receipt area.
     ======================================================= */

  const landing =
    getLandingPosition(
      startX,
      startY,
      receiptBox
    );


  const moveX =
    landing.x -
    startX;


  const moveY =
    landing.y -
    startY;


  /* =======================================================
     OPACITY

     Background emojis are deliberately softer.
     ======================================================= */

  const finalOpacity =
    isBehind
      ? 0.18
      : 1;


  /* =======================================================
     OPENING SPIN
     ======================================================= */

  const middleRotation =
    randomNumber(
      -380,
      380
    );


  const finalRotation =
    randomNumber(
      -720,
      720
    );


  /* =======================================================
     ONE-TIME EXPLOSION

     Slight stagger makes them spill out rather than
     appearing as one perfectly synchronized blob.
     ======================================================= */

  const burst =
    particle.animate(

      [

        {
          transform:
            "translate(-50%, -50%) scale(0.1) rotate(0deg)",

          opacity: 0
        },


        {
          transform:
            `translate(-50%, -50%)
             translate(
               ${moveX * 0.72}px,
               ${moveY * 0.72}px
             )
             scale(1.15)
             rotate(
               ${middleRotation}deg
             )`,

          opacity:
            finalOpacity,

          offset:
            0.68
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
               ${finalRotation}deg
             )`,

          opacity:
            finalOpacity
        }

      ],


      {
        duration:
          randomNumber(
            1400,
            2500
          ),

        delay:
          randomNumber(
            0,
            240
          ) +
          index * 5,

        easing:
          "cubic-bezier(.16,.78,.25,1)",

        fill:
          "forwards"
      }

    );


  /* =======================================================
     AFTER THE EXPLOSION

     Put the emoji permanently where it landed.

     IT IS NOT REMOVED.

     Then give it a random little movement.
     ======================================================= */

  burst.finished.then(() => {

    burst.cancel();


    particle.style.left =
      `${landing.x}px`;


    particle.style.top =
      `${landing.y}px`;


    particle.style.opacity =
      finalOpacity;


    particle.style.transform =
      "translate(-50%, -50%)";


    startIdleMovement(
      particle
    );

  });

}


/* =========================================================
   FIND A LANDING POSITION

   Emojis scatter naturally around the receipt.

   If a generated position lands inside the receipt,
   we try again.

   The final position is also kept inside the screen.
   ========================================================= */

function getLandingPosition(
  startX,
  startY,
  receiptBox
) {

  let finalX;
  let finalY;


  for (
    let attempt = 0;
    attempt < 30;
    attempt++
  ) {

    const angle =
      randomNumber(
        0,
        Math.PI * 2
      );


    const distance =
      randomNumber(
        280,
        650
      );


    finalX =
      startX +
      Math.cos(angle) *
      distance;


    finalY =
      startY +
      Math.sin(angle) *
      distance;


    /* =====================================================
       KEEP INSIDE SCREEN
       ===================================================== */

    finalX =
      Math.max(
        35,
        Math.min(
          window.innerWidth - 35,
          finalX
        )
      );


    finalY =
      Math.max(
        35,
        Math.min(
          window.innerHeight - 35,
          finalY
        )
      );


    /* =====================================================
       PROTECTED RECEIPT AREA

       Adds extra breathing room around the Order Summary.
       ===================================================== */

    const protection =
      55;


    const insideProtectedReceipt =

      finalX >
        receiptBox.left -
        protection

      &&

      finalX <
        receiptBox.right +
        protection

      &&

      finalY >
        receiptBox.top -
        protection

      &&

      finalY <
        receiptBox.bottom +
        protection;


    if (
      !insideProtectedReceipt
    ) {

      break;

    }

  }


  return {

    x: finalX,

    y: finalY

  };

}


/* =========================================================
   IDLE MOVEMENT

   IMPORTANT:

   These animations do NOT send emojis around the page.

   The emoji stays in its final spot.

   It only performs a small local movement.
   ========================================================= */

function startIdleMovement(
  particle
) {

  const movement =
    Math.floor(
      Math.random() * 8
    );


  let frames;

  let duration;

  let easing =
    "ease-in-out";


  /* =======================================================
     1. SLOW CLOCKWISE SPIN
     ======================================================= */

  if (
    movement === 0
  ) {

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
        6500,
        10000
      );


    easing =
      "linear";

  }


  /* =======================================================
     2. SLOW ANTICLOCKWISE SPIN
     ======================================================= */

  else if (
    movement === 1
  ) {

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
        6000,
        9500
      );


    easing =
      "linear";

  }


  /* =======================================================
     3. HOVER UP AND DOWN
     ======================================================= */

  else if (
    movement === 2
  ) {

    frames = [

      {
        transform:
          "translate(-50%, -50%) translateY(0) rotate(-3deg)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(-12px) rotate(4deg)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(0) rotate(-3deg)"
      }

    ];


    duration =
      randomNumber(
        2800,
        4400
      );

  }


  /* =======================================================
     4. WIGGLE
     ======================================================= */

  else if (
    movement === 3
  ) {

    frames = [

      {
        transform:
          "translate(-50%, -50%) rotate(-8deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(9deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(-5deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(7deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotate(-8deg)"
      }

    ];


    duration =
      randomNumber(
        2200,
        3400
      );

  }


  /* =======================================================
     5. FLIP
     ======================================================= */

  else if (
    movement === 4
  ) {

    frames = [

      {
        transform:
          "translate(-50%, -50%) rotateY(0deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotateY(180deg)"
      },

      {
        transform:
          "translate(-50%, -50%) rotateY(360deg)"
      }

    ];


    duration =
      randomNumber(
        4500,
        7200
      );

  }


  /* =======================================================
     6. PULSE
     ======================================================= */

  else if (
    movement === 5
  ) {

    frames = [

      {
        transform:
          "translate(-50%, -50%) scale(1)"
      },

      {
        transform:
          "translate(-50%, -50%) scale(1.15)"
      },

      {
        transform:
          "translate(-50%, -50%) scale(1)"
      }

    ];


    duration =
      randomNumber(
        2500,
        3800
      );

  }


  /* =======================================================
     7. SIDE-TO-SIDE SWAY
     ======================================================= */

  else if (
    movement === 6
  ) {

    frames = [

      {
        transform:
          "translate(-50%, -50%) translateX(-5px) rotate(-7deg)"
      },

      {
        transform:
          "translate(-50%, -50%) translateX(5px) rotate(7deg)"
      },

      {
        transform:
          "translate(-50%, -50%) translateX(-5px) rotate(-7deg)"
      }

    ];


    duration =
      randomNumber(
        3200,
        5000
      );

  }


  /* =======================================================
     8. LITTLE BOUNCE
     ======================================================= */

  else {

    frames = [

      {
        transform:
          "translate(-50%, -50%) translateY(0) scaleY(1)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(-10px) scaleY(1.05)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(0) scaleY(0.94)"
      },

      {
        transform:
          "translate(-50%, -50%) translateY(0) scaleY(1)"
      }

    ];


    duration =
      randomNumber(
        2300,
        3500
      );

  }


  /* =======================================================
     RUN THE CHOSEN MOVEMENT FOREVER

     Random delay means they do not all animate in sync.
     ======================================================= */

  particle.animate(

    frames,

    {
      duration:
        duration,

      delay:
        randomNumber(
          0,
          1600
        ),

      iterations:
        Infinity,

      easing:
        easing
    }

  );

}


/* =========================================================
   RANDOM ITEM HELPER
   ========================================================= */

function randomFrom(
  array
) {

  return array[
    Math.floor(
      Math.random() *
      array.length
    )
  ];

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

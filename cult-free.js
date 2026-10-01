/* =========================================================
   C.U.L.T. FREE BOOK - ONE-TIME CHAOS BURST

   PURPOSE:
   Emojis explode out from the Order Summary ONCE,
   then fade away.

   No recurring movement.
   No awkward fixed positioning.
   No constant chaos forever.

   This file is ONLY used by cult-free.html.
   ========================================================= */


/* =========================================================
   CHAOS CHARACTERS
   Add or remove emojis whenever you want.
   ========================================================= */

const chaosCharacters = [
  "🦄",
  "🐹",
  "🌈",
  "✨",
  "⭐",
  "💖",
  "🎀",
  "💫",
  "🧁",
  "🍭",
  "🦋",
  "🐣",
  "🌸",
  "🍬",
  "💕",
  "🍓"
];


/* =========================================================
   CHAOS SETTINGS
   ========================================================= */

const totalParticles = 42;

const behindLayer =
  document.getElementById("cult-chaos-behind");

const frontLayer =
  document.getElementById("cult-chaos-front");

const receipt =
  document.querySelector(".cult-receipt");

const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =========================================================
   START THE CHAOS
   ========================================================= */

if (
  behindLayer &&
  frontLayer &&
  receipt &&
  !prefersReducedMotion
) {
  setTimeout(() => {
    releaseChaosBurst();
  }, 450);
}


/* =========================================================
   RELEASE CHAOS BURST
   Everything starts from the centre of the order summary.
   ========================================================= */

function releaseChaosBurst() {
  const receiptBox = receipt.getBoundingClientRect();

  const startX =
    receiptBox.left + receiptBox.width / 2;

  const startY =
    receiptBox.top + receiptBox.height / 2;

  for (let i = 0; i < totalParticles; i++) {
    createChaosParticle(startX, startY, i);
  }
}


/* =========================================================
   CREATE ONE PARTICLE
   ========================================================= */

function createChaosParticle(startX, startY, index) {
  const particle = document.createElement("span");

  particle.className = "cult-chaos-particle";
  particle.textContent = randomFrom(chaosCharacters);

  const useBehindLayer = Math.random() < 0.35;
  const layer = useBehindLayer ? behindLayer : frontLayer;

  layer.appendChild(particle);

  const size = randomNumber(28, 68);
  const angle = randomNumber(0, Math.PI * 2);
  const distance = randomNumber(180, 520);

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  const rotateStart = randomNumber(-40, 40);
  const rotateMiddle = randomNumber(-360, 360);
  const rotateEnd = randomNumber(-720, 720);

  const driftX = randomNumber(-40, 40);
  const driftY = randomNumber(-40, 40);

  const duration = randomNumber(1700, 2800);
  const delay = randomNumber(0, 220);

  const finalOpacity = useBehindLayer ? 0.18 : 1;

  particle.style.left = `${startX}px`;
  particle.style.top = `${startY}px`;
  particle.style.fontSize = `${size}px`;
  particle.style.opacity = 0;

  const animation = particle.animate(
    [
      {
        transform:
          `translate(-50%, -50%) scale(0.15) rotate(${rotateStart}deg)`,
        opacity: 0
      },
      {
        transform:
          `translate(-50%, -50%)
           translate(${moveX * 0.72}px, ${moveY * 0.72}px)
           scale(1.08)
           rotate(${rotateMiddle}deg)`,
        opacity: finalOpacity,
        offset: 0.5
      },
      {
        transform:
          `translate(-50%, -50%)
           translate(${moveX + driftX}px, ${moveY + driftY}px)
           scale(0.9)
           rotate(${rotateEnd}deg)`,
        opacity: 0
      }
    ],
    {
      duration: duration,
      delay: delay,
      easing: "cubic-bezier(0.18, 0.8, 0.25, 1)",
      fill: "forwards"
    }
  );

  animation.finished.then(() => {
    particle.remove();
  });
}


/* =========================================================
   HELPERS
   ========================================================= */

function randomFrom(array) {
  return array[
    Math.floor(Math.random() * array.length)
  ];
}

function randomNumber(minimum, maximum) {
  return Math.random() * (maximum - minimum) + minimum;
}

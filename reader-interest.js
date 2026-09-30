/* =========================================================
   READER INTEREST SYSTEM
   Connects the book heart button to Firebase.
   ========================================================= */


/* =========================================================
   FIREBASE IMPORTS
   ========================================================= */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  signInAnonymously
}
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIGURATION
   Connects this website to the Leena Author Site project.
   ========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyBA00dqYUFz0CJD_8C-XjyRMsX1CeKqLB4",
  authDomain: "leena-author-site.firebaseapp.com",
  projectId: "leena-author-site",
  storageBucket: "leena-author-site.firebasestorage.app",
  messagingSenderId: "636190618905",
  appId: "1:636190618905:web:8ccaac81693cd73d3d0188",
  measurementId: "G-PVCBPJFMX3"
};


/* =========================================================
   START FIREBASE
   ========================================================= */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


/* =========================================================
   READER INTEREST FUNCTION
   ========================================================= */

async function startReaderInterest() {

  const section = document.querySelector(".reader-interest");

  const button = document.getElementById("interest-button");

  const countDisplay = document.getElementById("interest-count");


  /* Stop safely if this page does not contain an interest button. */

  if (!section || !button || !countDisplay) {
    return;
  }


  /* Each book page tells this script which Firebase book it belongs to. */

  const bookId = section.dataset.bookId;

  if (!bookId) {
    console.error("No Firebase book ID was supplied.");
    return;
  }


  /* =======================================================
     WAIT FOR FIREBASE TO RESTORE THE READER'S ID
     ======================================================= */

  button.disabled = true;

  countDisplay.textContent = "♡ Loading reader interest…";

  try {

    await auth.authStateReady();

    let user = auth.currentUser;


    /* If this browser has never visited before,
       quietly create an anonymous reader identity. */

    if (!user) {

      const credential = await signInAnonymously(auth);

      user = credential.user;

    }


    /* =====================================================
       FIRESTORE LOCATIONS
       ===================================================== */

    const bookReference =
      doc(db, "books", bookId);

    const readerHeartReference =
      doc(
        db,
        "books",
        bookId,
        "interests",
        user.uid
      );


    /* =====================================================
       LOAD CURRENT HEART COUNT + THIS READER'S HEART
       ===================================================== */

    const [
      bookSnapshot,
      readerHeartSnapshot
    ] = await Promise.all([

      getDoc(bookReference),

      getDoc(readerHeartReference)

    ]);


    if (!bookSnapshot.exists()) {
      throw new Error("Book record does not exist.");
    }


    let interestCount =
      Number(bookSnapshot.data().interestCount || 0);

    let alreadyHearted =
      readerHeartSnapshot.exists();


    /* =====================================================
       DISPLAY FUNCTIONS
       ===================================================== */

    function showCount() {

      if (interestCount === 1) {

        countDisplay.textContent =
          "♡ 1 reader wants this too";

      } else {

        countDisplay.textContent =
          `♡ ${interestCount} readers want this too`;

      }

    }


    function showHeartedState() {

      alreadyHearted = true;

      button.classList.add("is-hearted");

      button.setAttribute("aria-pressed", "true");

      const heart =
        button.querySelector(".interest-heart");

      if (heart) {
        heart.textContent = "♥";
      }

    }


    showCount();


    if (alreadyHearted) {
      showHeartedState();
    }


    button.disabled = false;


    /* =====================================================
       WHEN THE READER CLICKS THE HEART
       ===================================================== */

    button.addEventListener("click", async () => {

      /* Already counted.
         Do nothing instead of adding another heart. */

      if (alreadyHearted) {
        return;
      }


      button.disabled = true;


      try {

        const newCount =
          await runTransaction(
            db,
            async (transaction) => {


              /* Check whether this reader already has a heart. */

              const existingHeart =
                await transaction.get(readerHeartReference);


              if (existingHeart.exists()) {
                return null;
              }


              /* Get the latest count. */

              const latestBook =
                await transaction.get(bookReference);


              if (!latestBook.exists()) {
                throw new Error("Book record does not exist.");
              }


              const currentCount =
                Number(
                  latestBook.data().interestCount || 0
                );


              const nextCount =
                currentCount + 1;


              /* Increase the public counter. */

              transaction.update(
                bookReference,
                {
                  interestCount: nextCount
                }
              );


              /* Create this reader's permanent heart record. */

              transaction.set(
                readerHeartReference,
                {
                  createdAt: serverTimestamp()
                }
              );


              return nextCount;

            }
          );


        /* If another tab already created the heart,
           simply reload the real count. */

        if (newCount === null) {

          const latestBook =
            await getDoc(bookReference);

          interestCount =
            Number(
              latestBook.data().interestCount || 0
            );

        } else {

          interestCount = newCount;

        }


        showHeartedState();

        showCount();


      } catch (error) {

        console.error(
          "Reader interest could not be saved:",
          error
        );

        countDisplay.textContent =
          "♡ Couldn't save your heart — try again.";

      }


      button.disabled = false;

    });


  } catch (error) {

    console.error(
      "Reader interest could not load:",
      error
    );

    countDisplay.textContent =
      "♡ Reader interest unavailable.";

    button.disabled = true;

  }

}


/* =========================================================
   RUN THE SYSTEM
   ========================================================= */

startReaderInterest();

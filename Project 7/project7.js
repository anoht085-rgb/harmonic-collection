// Project 7 — Toggle: 90s Minimal vs Supermodel Mode

document.addEventListener("DOMContentLoaded", function () {
  let button = document.getElementById("mood-toggle");
  let body = document.body;

  let moodLabel = document.querySelector("[data-mood-label]");
  let moodDescription = document.querySelector("[data-mood-description]");
  let moodCaption = document.querySelector("[data-mood-caption]");

  button.addEventListener("click", function () {
    // This is the required classList.toggle pattern.
    body.classList.toggle("togglesaurus");

    // Check which mode we're in and update the copy.
    if (body.classList.contains("togglesaurus")) {
      // 90s Maximal / Supermodel Glam
      button.textContent = "Return to 90s Minimal Mode";

      if (moodLabel) {
        moodLabel.textContent = "90s Maximal — Supermodel Glam";
      }

      if (moodDescription) {
        moodDescription.textContent =
          "In supermodel mode, the 90s turns neon and glossy. Think Versace campaigns, metallic shadows, and high-contrast flash. The same photograph is pushed into a louder palette, echoing runway lights and after-party chaos.";
      }

      if (moodCaption) {
        moodCaption.textContent = "neon highlight, runway flash, excess";
      }
    } else {
      // Back to 90s Minimal / Calvin Klein
      button.textContent = "Activate 90s Supermodel Mode";

      if (moodLabel) {
        moodLabel.textContent = "90s Minimal — CK";
      }

      if (moodDescription) {
        moodDescription.textContent =
          "In minimal mode, the 90s is quiet and stripped down. Clean Helvetica, grayscale photography, and soft contrast reference Calvin Klein campaigns where negative space and body language do all the talking.";
      }

      if (moodCaption) {
        moodCaption.textContent = "soft grayscale, clean lines";
      }
    }
  });
});

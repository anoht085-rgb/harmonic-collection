// Controls
const bgInput = document.getElementById("bg-color");
const titleColorInput = document.getElementById("title-color");
const museSelect = document.getElementById("muse");
const titleInput = document.getElementById("title");
const titleSizeInput = document.getElementById("title-size");
const grainInput = document.getElementById("grain");
const frameToggle = document.getElementById("frame-toggle");
const printButton = document.getElementById("print");

// Poster elements
const posterSection = document.getElementById("poster");
const posterInner = document.querySelector(".poster-inner");
const posterText = document.getElementById("poster-text");
const posterImage = document.getElementById("poster-image");
const posterCaption = document.getElementById("poster-caption");
const colorBean = document.querySelector(".colorbean");

// Backdrop tint + chip
function updateBackground() {
  const color = bgInput.value;
  posterSection.style.backgroundColor = color;
  if (colorBean) {
    colorBean.style.backgroundColor = color;
  }
}

// Headline color
function updateTitleColor() {
  posterText.style.color = titleColorInput.value;
}

// Title text
function updateTitleText() {
  const text = titleInput.value.trim();
  posterText.textContent = text || "UNTITLED, 1960s";
}

// Title size
function updateTitleSize() {
  const size = parseInt(titleSizeInput.value, 10) || 52;
  posterText.style.fontSize = size + "px";
}

// Grain (NO grayscale – just contrast/blur)
function updateGrain() {
  const grain = parseInt(grainInput.value, 10) || 0;
  const contrast = 1 + grain * 0.06;
  const blur = grain * 0.25;
  const brightness = 1 - grain * 0.02;

  posterImage.style.filter = `contrast(${contrast}) brightness(${brightness}) blur(${blur}px)`;
}

// Muse / mode
function updateMuse() {
  const mode = museSelect.value;

  // always use same image path
  posterImage.src = "images/mod.jpg";
  posterImage.style.transform = "scale(1)";
  posterInner.style.backgroundImage = "none";

  switch (mode) {
    case "studio":
      posterCaption.textContent =
        "Studio portrait — clean flash, sharp eyeliner, geometric silhouette.";
      break;
    case "street":
      posterCaption.textContent =
        "Carnaby Street blur — off-guard movement, mini skirt, on-camera flash.";
      posterImage.style.transform = "scale(1.03) rotate(-1.5deg)";
      break;
    case "couture":
      posterCaption.textContent =
        "Mod girls were iconic figures of the 1960s British Modernist subculture, known for their bold, youthful, and independent style ";
      posterInner.style.backgroundImage =
        "radial-gradient(circle at top left, rgba(255,204,51,0.18) 0, transparent 60%)";
      break;
    default:
      posterCaption.textContent =
        "1960s fashion study — mod attitude translated into light, silhouette, and print.";
  }
}

// Frame toggle
function updateFrame() {
  if (frameToggle.checked) {
    posterSection.classList.add("poster-framed");
  } else {
    posterSection.classList.remove("poster-framed");
  }
}

// Print
function handlePrint() {
  window.print();
}

// Listeners
bgInput.addEventListener("input", updateBackground);
titleColorInput.addEventListener("input", updateTitleColor);
titleInput.addEventListener("input", updateTitleText);
titleSizeInput.addEventListener("input", updateTitleSize);
grainInput.addEventListener("input", updateGrain);
museSelect.addEventListener("change", updateMuse);
frameToggle.addEventListener("change", updateFrame);
printButton.addEventListener("click", handlePrint);

// Init
function init() {
  updateBackground();
  updateTitleColor();
  updateTitleText();
  updateTitleSize();
  updateGrain();
  updateMuse();
  updateFrame();
}

init();

// ==== ELEMENTS ==== //
const body = document.body;

const stepIndicator = document.getElementById("step-indicator");
const yearHint = document.getElementById("year-hint");
const yearOptions = document.getElementById("year-options");

const btnEarly = document.getElementById("btn-early");
const btnLate = document.getElementById("btn-late");
const stepYear = document.getElementById("step-year");
const resetBtn = document.getElementById("reset");

// Result elements
const resultYearTag = document.getElementById("result-year-tag");
const resultDesignerTag = document.getElementById("result-designer-tag");
const resultPlatformTag = document.getElementById("result-platform-tag");
const resultImage = document.getElementById("result-image");
const resultCaption = document.getElementById("result-caption");

// ==== STATE ==== //
let selectedChapter = null; // "2000-2010" or "2010-2019"
let selectedYearId = null;  // e.g. "2001-galliano-dior"

// ==== DATA: FASHION PHOTO TIMELINE ==== //
const timeline = {
  "2000-2010": {
    label: "2000–2010 · Y2K & It Bags",
    hint: "From Galliano’s Dior fantasy to It-bag campaigns and Céline minimalism.",
    years: [
      {
        id: "2001-galliano-dior",
        label: "2001 · Galliano for Dior",
        year: "2001",
        designer: "John Galliano for Dior",
        photographer: "Nick Knight (and collaborators)",
        platform: "Print campaigns / magazines",
        img: "images/2001-galliano-dior.jpg",
        caption:
          "Early 2000s Dior under John Galliano pushes fashion photography into theatrical fantasy: dramatic silhouettes, saturated color, and digital manipulation. The image sells a whole dream world, not just a garment."
      },
      {
        id: "2003-it-bags",
        label: "2003–2005 · It-bag campaigns",
        year: "2003–2005",
        designer: "Marc Jacobs for Louis Vuitton, others",
        photographer: "Campaign photographers like Mert & Marcus",
        platform: "Billboards / magazine ads",
        img: "images/2003-it-bags.jpg",
        caption:
          "Logos and accessories become the main characters. Think Louis Vuitton’s Murakami collaborations and glossy, product-driven images where the bag is framed like a celebrity."
      },
      {
        id: "2010-celine",
        label: "2010 · Céline by Phoebe Philo",
        year: "2010",
        designer: "Phoebe Philo for Céline",
        photographer: "Juergen Teller",
        platform: "Minimal print ads",
        img: "images/2010-celine.jpg",
        caption:
          "Céline under Phoebe Philo, shot by Juergen Teller, flips the script: natural light, awkward crops, and unretouched textures. Luxury photography shifts from high-gloss fantasy to quiet, almost documentary realism."
      }
    ]
  },

  "2010-2019": {
    label: "2010–2019 · Tumblr to Instagram",
    hint: "From Tumblr moodboards to Gucci cinema and Instagram luxury feeds.",
    years: [
      {
        id: "2012-tumblr",
        label: "2012 · Tumblr soft grunge",
        year: "2012",
        designer: "Remixed editorials / indie brands",
        photographer: "Anonymous online image culture",
        platform: "Tumblr dashboards",
        img: "images/2012-tumblr.jpg",
        caption:
          "On Tumblr, fashion photography is ripped, reposted, and collaged. Soft grunge, pastel filters, and scanned editorials turn brand images into moodboard fragments and personal identity tools."
      },
      {
        id: "2015-gucci",
        label: "2015 · Gucci by Alessandro Michele",
        year: "2015",
        designer: "Alessandro Michele for Gucci",
        photographer: "Glen Luchford",
        platform: "Campaign films and editorial-style ads",
        img: "images/2015-gucci.jpg",
        caption:
          "Alessandro Michele’s Gucci campaigns look like stills from strange 70s movies: crowded subways, bedrooms, and rooftops. Photography becomes narrative and cinematic, less about one hero product and more about a full character universe."
      },
      {
        id: "2019-instagram",
        label: "2019 · Instagram luxury",
        year: "2019",
        designer: "Multiple houses, stylists, influencers",
        photographer: "Phone cameras + campaign teams",
        platform: "Instagram feeds and stories",
        img: "images/2019-instagram.jpg",
        caption:
          "By 2019, fashion images are designed for the square: #OOTD posts, sponsored content, and campaigns that assume screenshots and shares. Editorial, campaign, and selfie start to blur into the same visual language."
      }
    ]
  }
};

// ==== HELPERS ==== //

function clearChapterClasses() {
  body.classList.remove("is-early", "is-late");
  btnEarly.classList.remove("is-active");
  btnLate.classList.remove("is-active");
}

function setChapter(chapterKey) {
  selectedChapter = chapterKey;
  selectedYearId = null;

  // Update body background + button states
  clearChapterClasses();
  if (chapterKey === "2000-2010") {
    body.classList.add("is-early");
    btnEarly.classList.add("is-active");
  } else if (chapterKey === "2010-2019") {
    body.classList.add("is-late");
    btnLate.classList.add("is-active");
  }

  // Update step indicator
  const label = timeline[chapterKey].label;
  stepIndicator.textContent = "Step 2 of 2 · Choose a key year in " + label;

  // Render year buttons
  renderYearButtons(chapterKey);
}

function renderYearButtons(chapterKey) {
  const config = timeline[chapterKey];
  yearHint.textContent = config.hint;
  yearOptions.innerHTML = "";

  config.years.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "pill";
    btn.textContent = item.label;
    btn.setAttribute("data-year-id", item.id);

    btn.addEventListener("click", () => {
      selectedYearId = item.id;
      updateYearButtonActive();
      updateResult();
    });

    yearOptions.appendChild(btn);
  });

  stepYear.setAttribute("aria-hidden", "false");
}

function updateYearButtonActive() {
  const buttons = yearOptions.querySelectorAll("button");
  buttons.forEach((btn) => {
    const id = btn.getAttribute("data-year-id");
    if (id === selectedYearId) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
  });
}

function getSelectedYearConfig() {
  if (!selectedChapter || !selectedYearId) return null;
  const config = timeline[selectedChapter];
  return config.years.find((item) => item.id === selectedYearId) || null;
}

function updateResult() {
  const conf = getSelectedYearConfig();
  if (!conf) return;

  resultYearTag.textContent = "Year: " + conf.year;
  resultDesignerTag.textContent = "Designer: " + conf.designer;
  resultPlatformTag.textContent = "Platform: " + conf.platform;

  resultImage.src = conf.img;
  resultImage.alt = conf.label;

  resultCaption.textContent = conf.caption;
}

// ==== EVENT LISTENERS ==== //

// Chapter buttons
btnEarly.addEventListener("click", () => {
  setChapter("2000-2010");
});

btnLate.addEventListener("click", () => {
  setChapter("2010-2019");
});

// Reset
resetBtn.addEventListener("click", () => {
  selectedChapter = null;
  selectedYearId = null;

  clearChapterClasses();
  yearOptions.innerHTML = "";
  yearHint.textContent = "Pick a chapter first to see key fashion image moments.";
  stepYear.setAttribute("aria-hidden", "true");

  stepIndicator.textContent = "Step 1 of 2 · Choose a time chapter";

  resultYearTag.textContent = "Year: —";
  resultDesignerTag.textContent = "Designer: —";
  resultPlatformTag.textContent = "Platform: —";
  resultImage.src = "";
  resultImage.alt = "Fashion photography reference";
  resultCaption.textContent =
    "Choose a chapter, then a year, to see how fashion photography and designers redefined the image in that moment.";
});

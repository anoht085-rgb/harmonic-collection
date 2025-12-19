// Decades collage interactions
(function () {
  const stage = document.getElementById("stage");
  const layers = Array.from(stage.querySelectorAll(".layer"));
  const blends = ["multiply", "overlay", "screen", "hard-light", "soft-light", "normal"];
  let blendIndex = 0;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function shuffleLayout() {
    layers.forEach((el) => {
      const w = window.innerWidth < 740 ? rand(52, 72) : rand(34, 52); // % width
      const x = rand(3, 68); // left %
      const y = rand(4, 70); // top %
      const r = rand(-5, 5); // deg
      const o = rand(0.65, 0.9); // lower opacity = more layered/ghosty

      el.style.setProperty("--w", w + "%");
      el.style.setProperty("--x", x + "%");
      el.style.setProperty("--y", y + "%");
      el.style.setProperty("--rot", r + "deg");
      el.style.setProperty("--op", o);

      el.style.zIndex = 10 + Math.floor(rand(0, 90));
    });
  }

  function cycleBlend() {
    blendIndex = (blendIndex + 1) % blends.length;
    const mode = blends[blendIndex];
    layers.forEach((el) => {
      el.style.mixBlendMode = mode;
    });
  }

  function resetLayout() {
    // Clear inline custom properties so CSS defaults per decade take over again
    layers.forEach((el) => {
      el.removeAttribute("style");
    });
    // Reset blend mode back to base (multiply from CSS)
    layers.forEach((el) => {
      el.style.mixBlendMode = "";
    });
    blendIndex = 0;
  }

  document.getElementById("shuffle").addEventListener("click", shuffleLayout);
  document.getElementById("cycleBlend").addEventListener("click", cycleBlend);
  document.getElementById("reset").addEventListener("click", resetLayout);

  window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "s") shuffleLayout();
    if (key === "b") cycleBlend();
    if (key === "r") resetLayout();
  });
})();

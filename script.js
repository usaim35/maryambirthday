const btn = document.getElementById("openBtn");
const screen = document.getElementById("surpriseScreen");
const sound = document.getElementById("weirdSound");

btn.addEventListener("click", () => {
  screen.classList.remove("hidden");

  sound.play();
  sound.volume = 1;

  // full screen effect
  document.body.style.background = "black";
});

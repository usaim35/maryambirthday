const btn = document.getElementById("openBtn");
const scare = document.getElementById("scareScreen");
const final = document.getElementById("finalScreen");
const scareSound = document.getElementById("scareSound");
const weird = document.getElementById("weirdSound");

btn.addEventListener("click", () => {
  // Hide romantic text
  document.getElementById("romanticBox").style.display = "none";

  // Show jumpscare
  scare.classList.remove("hidden");
  scareSound.play();
  scareSound.volume = 1;

  // After 2 seconds → show final insult screen
  setTimeout(() => {
    scare.classList.add("hidden");
    final.classList.remove("hidden");
    weird.play();
    startFireworks();
  }, 2000);
});

/* Fireworks code */
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fireworks = [];

  function random(n) { return Math.random() * n; }

  function createFirework() {
    let x = random(canvas.width);
    let y = random(canvas.height / 2);
    let particles = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x, y,
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        life: 100
      });
    }
    fireworks.push(particles);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((fw, i) => {
      fw.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;

        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fillRect(p.x, p.y, 3, 3);
      });
      if (fw[0].life <= 0) fireworks.splice(i, 1);
    });

    if (Math.random() < 0.1) createFirework();

    requestAnimationFrame(animate);
  }

  animate();
}


// Initialize EmailJS
emailjs.init("JffQGAQVBq7CABXuB"); // Your Public Key

document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  emailjs.send("service_m70x0m6", "template_komaawn", {
    from_name: name,
    from_email: email,
    message: message,
  })
  .then(() => {
    showThankYouPopup();
    document.getElementById("statusMsg").innerText = "";
    document.getElementById("rsvpForm").reset();
  }, () => {
    document.getElementById("statusMsg").innerText = "⚠️ Something went wrong. Please try again.";
  });
});

// Countdown timer
const countdown = document.getElementById("countdown");
const eventDate = new Date("October 16, 2025 20:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);
  countdown.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;
}, 1000);

// 🎈 Balloons Animation
function createBalloon(color) {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.backgroundColor = color;
  balloon.style.left = Math.random() * 100 + 'vw';
  balloon.style.animationDuration = (5 + Math.random() * 3) + 's';
  document.body.appendChild(balloon);
  setTimeout(() => balloon.remove(), 8000);
}

window.addEventListener('load', () => {
  const colors = ['#ffb6c1', '#ffffff'];
  for (let i = 0; i < 15; i++) {
    setTimeout(() => createBalloon(colors[Math.floor(Math.random() * colors.length)]), i * 400);
  }
  confetti();
});

// 🎊 Confetti
function confetti() {
  for (let i = 0; i < 80; i++) {
    const confetto = document.createElement('div');
    confetto.classList.add('confetto');
    confetto.style.left = Math.random() * 100 + 'vw';
    confetto.style.backgroundColor = Math.random() > 0.5 ? '#ff69b4' : '#ffffff';
    confetto.style.animationDuration = (2 + Math.random() * 3) + 's';
    document.body.appendChild(confetto);
    setTimeout(() => confetto.remove(), 4000);
  }
}

// 💖 Thank You Popup with Animation
function showThankYouPopup() {
  const popup = document.getElementById("thankYouPopup");
  popup.classList.remove("hidden");
  confetti();
  for (let i = 0; i < 5; i++) {
    setTimeout(() => createBalloon('#ff69b4'), i * 300);
  }
  setTimeout(() => popup.classList.add("hidden"), 3500);
}

// sequence: when envelope clicked -> open flap -> show 4-5 pop items one-by-one -> final screen
const envelope = document.getElementById('envelope');
const popContainer = document.getElementById('popContainer');
const finalScreen = document.getElementById('finalScreen');
const restartBtn = document.getElementById('restartBtn');
const popSound = document.getElementById('popSound');
const finalSound = document.getElementById('finalSound');

let hasOpened = false;

// number of items to pop
const TOTAL_ITEMS = 5;
// message to show each time
const MESSAGE = "ISSE OPEN KARO PAKKA ISME HAI";

// click to open envelope and start sequence
envelope.addEventListener('click', () => {
  if (hasOpened) return; // prevent re-trigger until restart
  hasOpened = true;

  // animate flap open
  envelope.classList.add('open');

  // small delay so flap looks open before popping items
  setTimeout(() => startPops(TOTAL_ITEMS), 600);
});

function startPops(n){
  let i = 0;
  function nextPop(){
    if (i >= n){
      // after all items, show final
      setTimeout(showFinal, 700);
      return;
    }
    spawnPop(MESSAGE + (n>1 ? ` (${i+1})` : ''));
    i++;
    // spacing between pops
    setTimeout(nextPop, 900);
  }
  nextPop();
}

function spawnPop(text){
  // optional sound
  try { popSound.currentTime = 0; popSound.play().catch(()=>{}); } catch(e){}

  const d = document.createElement('div');
  d.className = 'pop-item';
  d.innerText = text;
  popContainer.appendChild(d);

  // force reflow and start animation
  requestAnimationFrame(()=> d.classList.add('pop-animate'));

  // after a short time, fade out
  setTimeout(()=> {
    d.classList.add('pop-fade');
    // remove after animation
    setTimeout(()=> d.remove(), 900);
  }, 1200);
}

function showFinal(){
  // play final sound
  try { finalSound.currentTime = 0; finalSound.play().catch(()=>{}); } catch(e){}

  // hide envelope area visually
  document.querySelector('.page').style.visibility = 'hidden';
  finalScreen.classList.remove('hidden');
}

// restart
restartBtn.addEventListener('click', () => {
  // reset
  hasOpened = false;
  document.querySelector('.page').style.visibility = 'visible';
  envelope.classList.remove('open');
  finalScreen.classList.add('hidden');
});


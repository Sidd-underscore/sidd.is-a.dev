//mostly for flippa.html
const flipper = document.querySelector('.flipper');
const main = document.querySelector('.main');
const coinContainer = document.querySelector('.coin-container');

// this waits till the JS has been loaded and then hides the loading "screen"
document.addEventListener("DOMContentLoaded", function(event) { 
  const loading = document.querySelectorAll('.loading');
  const main = document.querySelectorAll('.main');
  loading[0].classList.add('hidden');
  loading[0].setAttribute('aria-hidden', 'true');
  main[0].style.display = 'flex';
});

function flipDaCoin() {
  var lowerBound = 1;
  var upperBound = 2;
  var result = (Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound);
  console.log(result);

  flipper.classList.remove('flip-tails');
  flipper.classList.remove('flip-heads');
  
  window.requestAnimationFrame(function(time) { //https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Tips
    window.requestAnimationFrame(function(time) {     
      if (result == 1) {
        flipper.classList.add('flip-heads');
        flipper.classList.remove('flip-tails');
        coinContainer.setAttribute('aria-label', 'Result is heads');
      } else {
        flipper.classList.add('flip-tails');
        flipper.classList.remove('flip-heads');
        coinContainer.setAttribute('aria-label', 'Result is tails');
      }
    });
  });
}

document.addEventListener('click', flipDaCoin);
document.addEventListener('touchend', flipDaCoin);
document.addEventListener('keydown', function(e) {
  if (e.which == 32) { flipDaCoin(); }
});

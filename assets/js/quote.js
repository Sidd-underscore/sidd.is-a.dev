var i = 0;
var txt = randomText();
var speed = 50;

document.addEventListener("DOMContentLoaded", function() {
  typeWriter();
})

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("quote").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function randomText() {
  var textArray = [
    'What\'s beautiful about the internet is you don\'t know who I am and I don\'t know either.',
    'Oh, so you\'re a node dev, huh? List every NPM package.',
    'WHICH TAB IS THAT MUSIC COMING FROM?!?!',
    'I know for a *fact* that all of my parentheses are in the righ- oh wait, found the problem.',
    'I\'m not antisocial; I\'m just not user friendly.',
    'while :; do rm -rf node_modules && npm install; done;'
  ];
  var randomNumber = Math.floor(Math.random()*textArray.length);

  return textArray[randomNumber];
}

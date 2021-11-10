function defineThing() {
  if (window.location.search == "?geraldine") {
    document.getElementById('main').classList.add('gerladine')
    console.log("Gerld Toggled");
  } else if (window.location.search == "?alphabet") {
    document.getElementById('main').classList.add('alphabet')
    console.log("Alphabet Toggled");
  }
};


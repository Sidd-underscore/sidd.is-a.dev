
function defineThing() {
  if (window.location.search === "?thing=imgen") {
    document.getElementById('imgen').style.opacity = "100";
  }
}

function submitImgen() {
  var e = document.getElementById("imgen-sel");
  var value = e.options[e.selectedIndex].value;// get selected option value
  var text = e.options[e.selectedIndex].text;

  var a = document.getElementById("url-imgen").value;

  if (text === "gun") {
    var img = document.createElement('img');
    img.src = "https://api.weky.xyz/canvas/gun?image=" + a;
    document.getElementById('output').appendChild(img);
  }

   if (text === "saveonlyone") {
    var img = document.createElement('img');
    img.src = "https://api.weky.xyz/canvas/saveonlyone?image=" + a;
    document.getElementById('output').appendChild(img);
  }
}
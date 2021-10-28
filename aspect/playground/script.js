
function defineThing() {
  if (window.location.search === "?thing=imgen") {
    document.getElementById('imgen').style.opacity = "100";
  }
};

function submitImgen() {
  var e = document.getElementById("imgen-sel");
  var value = e.options[e.selectedIndex].value;// get selected option value
  var text = e.options[e.selectedIndex].text;

  var a = document.getElementById("url-imgen").value;

  var form = document.getElementById('imgen-form');
  var field = document.getElementById('url-imgen');
  var fieldstatus = document.getElementById('cool');
  var regExPattern = new RegExp('^https?://', 'i');



  document.getElementById("imgen-sub").innerHTML = "Loading... (this may take a moment)";
  if (value === "gun") {
    if (regExPattern.test(field.value)) {
      var img = document.createElement('img');
      img.src = "https://api.weky.xyz/canvas/gun?image=" + a;
      document.getElementById('output').appendChild(img)
    } else {
            alert('Please put "https" in your image URL!');

    }
  };

  if (value === "mask") {
  if (regExPattern.test(field.value)) {
      var img = document.createElement('img');
      img.src = "https://api.weky.xyz/canvas/mask?image=" + a;
      document.getElementById('output').appendChild(img)
    } else {
            alert('Please put "https" in your image URL!');

    }
  
  };

  if (text === "saveonlyone") {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  };

};
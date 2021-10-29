
function defineThing() {
  if (window.location.search === "?thing=imgen") {
    document.getElementById('imgen').style.opacity = "100";
  }
};


function showDiv(divId, element) {
  document.getElementById(divId).style.display = element.value == 'saveonlyone' ? 'block' : 'none';
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
      img.class = "lazy";

      document.getElementById('output').appendChild(img)
    } else {
      alert('Please put "https" in your image URL!');

    }
  };

  if (value === "mask") {
    if (regExPattern.test(field.value)) {
      var img = document.createElement('img');
      img.src = "https://api.weky.xyz/canvas/mask?image=" + a;
            img.class = "lazy";

      document.getElementById('output').appendChild(img)
    } else {
      alert('Please put "https" in your image URL!');

    }

  };

  if (value === "worship") {
    if (regExPattern.test(field.value)) {
      var img = document.createElement('img');
      img.src = "https://api.weky.xyz/canvas/pray?image=" + a;
            img.class = "lazy";

      document.getElementById('output').appendChild(img)
    } else {
      alert('Please put "https" in your image URL!');

    }

  };

  if (value === "rifleshoot") {
    if (regExPattern.test(field.value)) {
      var img = document.createElement('img');
      img.src = "https://api.weky.xyz/canvas/rifleshoot?image=" + a;
            img.class = "lazy";

      document.getElementById('output').appendChild(img)
    } else {
      alert('Please put "https" in your image URL!');

    }

  };

  if (value === "robert") {
    if (regExPattern.test(field.value)) {
      var img = document.createElement('img');
      img.src = "https://api.weky.xyz/canvas/robert?image=" + a;
            img.class = "lazy";

      document.getElementById('output').appendChild(img)
    } else {
      alert('Please put "https" in your image URL!');

    }

  };

  if (text === "saveonlyone") {
      var field2 = document.getElementById('url-2-imgen');
  var field3 = document.getElementById('url-3-imgen');

    if (regExPattern.test(field.value && field2.value && field3.value)) {
        var b = document.getElementById("url-2-imgen").value;
  var c = document.getElementById("url-3-imgen").value;
      var img = document.createElement('img');
      img.src = "https://api.weky.xyz/canvas/saveonlyone?image=" + a + "&image2=" + b + "&image3=" + c;
      img.class = "lazy";
      document.getElementById('output').appendChild(img)
    } else {
      alert('Please put "https" in your image URL!');

    }

  };
  document.getElementById("imgen-sub").innerHTML = "Imgen it";

};
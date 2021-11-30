// Detect offline/online mode in simple way.
window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus(event) {
  var condition = navigator.onLine ? "online" : "offline";
  document.body.className = condition
 
  var divs = document.getElementsByTagName('main');

    for (var i = 0, l = divs.length; i < l; i++) {
        if (divs[i].getAttribute('class') == 'main') 
            if (divs[i].style.display == 'none') divs[i].style.display = '';
            else divs[i].style.display = 'none';
    }
}


// To learn more, follow on this post:
// https://medium.com/simplejs/how-to-enable-offline-detection-using-simple-browser-apis-398b4989605a

function newGif(){
  vex.dialog.open({
      message: 'Enter gif url',
      input: [
          '<input name="gifurl" type="text" placeholder="https://cdn.glitch.com/a685c911-5e22-4019-b3e8-bd3e0790290f%2FRooms%20Banner.jpg?v=1631934710507" required />'
      ].join(''),
      // buttons: [
      //     $.extend({}, vex.dialog.buttons.YES, { text: 'Login' }),
      //     $.extend({}, vex.dialog.buttons.NO, { text: 'Back' })
      // ],
      callback: function (data) {
          if (!data) {
              console.log('Cancelled')
          } else {
              document.getElementById("input").value += '![](' + data.gifurl + ')'
            change();

          }
      }
  })
};

function newUrl(){
  vex.dialog.open({
      message: 'Enter link. LINK MUST START WITH https://',
      input: [
          '<input name="texttodisplay" type="text" placeholder="The text to display"  />',
        '<input name="url" type="text" placeholder="http://cool.url/wow" required />'
      ].join(''),
      // buttons: [
      //     $.extend({}, vex.dialog.buttons.YES, { text: 'Login' }),
      //     $.extend({}, vex.dialog.buttons.NO, { text: 'Back' })
      // ],
      callback: function (data) {
          if (!data) {
              console.log('Cancelled')
          } else {
              document.getElementById("input").value += '[' + data.texttodisplay + '](' + data.url + ')'
            change();

          }
      }
  })
};



//for formatting stuff 




function boldIt(){

  var idoftextarea='input';
  
	function getSelectedText(idoftextarea){
		var textarea = document.getElementById(idoftextarea);
		var text =textarea.value;
		var indexStart=textarea.selectionStart;
		var indexEnd=textarea.selectionEnd;
                   document.getElementById("input").value += '**' + text.substring(indexStart, indexEnd) + '**'
    
    
	 
	}
  


	getSelectedText(idoftextarea)
  
  change();

  
  };

function italicIt(){

  var idoftextarea='input';
	function getSelectedText(idoftextarea){
		var textArea = document.getElementById(idoftextarea);
		var text =textArea.value;
		var indexStart=textArea.selectionStart;
		var indexEnd=textArea.selectionEnd;
                   document.getElementById("input").value += '*' + text.substring(indexStart, indexEnd) + '*'
	 
	}


	getSelectedText(idoftextarea)
  change()
  ;};

function showImgstuff() {
  var mydiv = document.getElementById('imgstuff');
    var otherdivlol = document.getElementById('text');

  	otherdivlol.style.display="none"
	mydiv.style.display="block"
}
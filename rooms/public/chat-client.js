function join(){
  vex.dialog.open({
      message: 'Enter Chat Code 👇',
      input: [
          '<input name="code" type="text" placeholder="wordOne+wordTwo" required />'
      ].join(''),
      // buttons: [
      //     $.extend({}, vex.dialog.buttons.YES, { text: 'Login' }),
      //     $.extend({}, vex.dialog.buttons.NO, { text: 'Back' })
      // ],
      callback: function (data) {
          if (!data) {
              console.log('Cancelled')
          } else {
              console.log("code", data.code)
              location.href = "/c#"+ data.code.toLowerCase() + "-two"
          }
      }
  })
}

function newChat(){
  window.open("/c")
}

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
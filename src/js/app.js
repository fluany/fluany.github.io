(function(){
  var downloadButton = document.querySelectorAll('.btn-download');
  downloadButton.forEach(function(element) {
    element.addEventListener('click', function() {
      ga('send', 'event', 'link', 'click', 'Download');
    });
  })
})()

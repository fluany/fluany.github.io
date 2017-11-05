(function(){
  var downloadButton = document.querySelectorAll('.btn-download')
  downloadButton.forEach(function(element) {
    if (chrome.app.isInstalled) {
      element.style.display = 'none'
    }else{
      element.addEventListener('click', function() {
        ga('send', 'event', 'link', 'click', 'Download')
      })
    }
  })
})()

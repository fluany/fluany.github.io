const downloadButton = document.querySelectorAll('.btn-download')
downloadButton.forEach(function(element){
  element.addEventListener('click', () => {
    console.log('clicked')
    ga('send', 'event', 'link', 'click', 'Download')
  })
})

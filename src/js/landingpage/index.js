function runLanding(){
  const downloadButton = document.querySelectorAll('.btn-download')

  downloadButton.forEach(element => {
      element.addEventListener('click', () => {
        ga('send', 'event', 'link', 'click', 'Download')
      })
  })
}

export default runLanding

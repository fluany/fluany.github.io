import './landingpage'
import { fbLogin, fbInit } from './login/facebook'
const facebookBtn = document.querySelector('.auth-content__facebook')

facebookBtn.addEventListener('click', function(){
  fbInit()
    .login()
    .then(response => {
      const token = response.headers['x-auth-token']
      if (token) {
        console.log('saved')
        // localStorage.setItem('id_token', token)
      }
    })
})


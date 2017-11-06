import axios from 'axios'
import config from '../config'

function fbInit(){
  FB.init({
    appId      : config.FACEBOOK_APP_ID,
    status     : false,
    cookie     : false,
    xfbml      : false,
    version    : 'v2.8'
  });

  return {
    login: fbLogin
  }
}

function fbLogin(){
  return new Promise((resolve, reject) => {
    FB.login(result => {
      if (result.authResponse) {
        return axios.post(`${config.API_URL}/facebook`,
                          { access_token: result.authResponse.accessToken })
          .then(response => resolve(response))
          .catch((error) => reject(error))
      } else {
        reject('authResponse is required')
      }
    })
  })
}

function fbLogout() {
  localStorage.removeItem('id_token')
}

export { fbInit }

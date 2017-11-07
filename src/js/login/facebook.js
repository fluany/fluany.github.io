import axios from 'axios'
import Config from '../config'

function fbInit(){
  FB.init({
    appId      : Config.FB_APP_ID,
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
        return axios.post(`${Config.API_URL}/facebook`,
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

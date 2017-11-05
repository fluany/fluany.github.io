import axios from 'axios'
const APP_ID = '2040055196220728'
const API_URL = 'http://localhost:3000/api/v1/auth'

function fbInit(){
  FB.init({
    appId      : APP_ID,
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
        return axios.post(`${API_URL}/facebook`,
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

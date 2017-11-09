import runLanding from './landingpage'
import runLogin from './login'

const isLogin = document.querySelector('.content-login')
if(isLogin){
  runLogin()
}else {
  runLanding()
}

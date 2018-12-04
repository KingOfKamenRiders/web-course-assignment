import axios from 'axios'

export function login(cid,password,callback) {
  axios.post('/api/user/login',{
      cid:cid,
      password:password,
  }).then((response)=>callback(response))
    .catch((error)=>console.log(error))
}

export function signUp(cid,password,callback) {
  axios.post('/api/user/signUp',{
      cid:cid,
      password:password,
  }).then((response)=>callback(response))
    .catch((error)=>console.log(error))
}
export function logout(callback) {
  axios.get('/api/user/logout')
    .then((res)=>callback(res))
    .catch((err)=>console.log(err))
}

export function isLoggedIn(callback) {
  axios.get('/api/user/isLoggedIn')
    .then((res)=>callback(res))
    .catch((err)=>console.log(err))
}

import axios from 'axios'

export function login(cid,password,callback) {
  axios.get('/api/login',{
    params:{
      cid:cid,
      password:password,
    }
  }).then((response)=>callback(response))
    .catch((error)=>console.log(error))
}

export function signUp(cid,password,callback) {
  axios.get('/api/signUp',{
    params:{
      cid:cid,
      password:password,
    }
  }).then((response)=>callback(response))
    .catch((error)=>console.log(error))
}
export function logout(callback) {
  axios.get('/api/logout')
    .then((res)=>callback(res))
    .catch((err)=>console.log(err))
}

export function isLoggedIn(callback) {
  axios.get('/api/isLoggedIn')
    .then((res)=>callback(res))
    .catch((err)=>console.log(err))
}

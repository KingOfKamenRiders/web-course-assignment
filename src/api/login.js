import axios from 'axios'

export function login(cid,password,callback) {
  axios.post('/api/login',{
      cid:cid,
      password:password,
  }).then((response)=>callback(response))
    .catch((error)=>console.log(error))
}

export function signUp(cid,password,callback) {
  axios.post('/api/signUp',{
      cid:cid,
      password:password,
  }).then((response)=>callback(response))
    .catch((error)=>console.log(error))
}

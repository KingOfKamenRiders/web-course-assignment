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

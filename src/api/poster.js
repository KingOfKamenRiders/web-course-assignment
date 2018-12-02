import axios from 'axios'

export function getAllPosters(callback) {
  axios.get('/api/allPosters')
    .then((res)=>callback(res))
    .catch((err)=>console.log(err))
}

export function uploadPoster(data,callback) {
  axios({
    method:'post',
    url:'/api/poster',
    data:data,
  }).then((res)=>callback(res))
    .catch(err=>console.log(err))
}

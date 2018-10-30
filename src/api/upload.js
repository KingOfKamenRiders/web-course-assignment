import axios from 'axios'

export function uploadImg(data,callback) {
  axios({
    method: 'post',
    url: '/api/uploadImg',
    data: data,
    headers:{ 'content-type': 'multipart/form-data' },
  }).then((response)=>callback(response))
    .catch((error)=>console.log(error));
}
export function getMyHeroes(callback) {
  axios.get('/api/myHeroes')
    .then((response)=>callback(response))
    .catch((error)=>console.log(error));
}

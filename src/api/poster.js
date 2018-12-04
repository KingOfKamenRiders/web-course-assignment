import axios from 'axios'

export function getAllPosters(tags,callback) {
  axios.get('/api/poster/allPosters',{
    params:{
      tags:JSON.stringify(tags)
    }
  })
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

export function getPoster(path,callback) {
  axios.get('/api/poster',{
    params:{
      path:path,
    }
  }).then((res)=>callback(res))
}

export function getPosterTag(path,cb) {
  axios.get('/api/poster/tags',{
    params:{
      path:path,
    }
  }).then(res=>cb(res))
}

export function getComments(path,cb) {
  axios.get('/api/poster/comments',{
    params:{
      path:path,
    }
  }).then(res=>cb(res))
}

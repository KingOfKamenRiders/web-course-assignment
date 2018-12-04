import axios from 'axios'

export function getHotTags(callback) {
  axios.get('/api/tag/hotTags')
    .then(res=>callback(res))
    .catch(err=>console.log(err))
}

export function comment(comment,callback) {
  axios.post('/api/tag/comment',comment)
    .then((res)=>callback(res))
    .catch(err=>console.log(err));
}

export function getAllTags(cb) {
  axios.get('/api/tag/all')
    .then(res=>cb(res))
    .catch(err => console.log(err));
}


import axios from 'axios'

export function getHotTags(callback) {
  axios.get('hotTags')
    .then(res=>callback(res))
    .catch(err=>console.log(err))
}


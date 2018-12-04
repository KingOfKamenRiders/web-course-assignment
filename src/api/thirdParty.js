import axios from 'axios'

export function getWeather(cb) {
  axios.get('https://restapi.amap.com/v3/weather/weatherInfo',{
    params:{
      key:'6ba64518f2ae52cfe8e04507ef19128d',
      city:'320100',
      extensions:'all'
    }
  }).then(res=>cb(res))
}

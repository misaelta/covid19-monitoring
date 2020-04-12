import axios from 'axios'


const api = axios.create({

    baseURL:'https://api.thevirustracker.com/free-api?countryTotals=ALL'
})


export default api;
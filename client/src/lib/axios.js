import axios_ from 'axios'

const axios = axios_.create({
    withCredentials: true,
    baseURL: '/api'
})

export default axios
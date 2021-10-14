import axios from 'axios'
import store from "@/store/store";
import {getToken} from "@/main/cookiesJs";
import {Message} from "element-ui";

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        Message.error(error || 'Error')
        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data

        if (res.success) {
            return res.data;
        } else {
            Message.error(res.message || 'Error')
            return Promise.reject(new Error(res.message || 'Error'))
        }
    },
    error => {
        Message.error(error || 'Error')
        console.log('err' + error)
        return Promise.reject(error)
    }
)

export default service

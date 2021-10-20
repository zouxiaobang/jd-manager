import axios from 'axios'
import {getToken, removeRefreshToken, removeToken} from "@/main/cookiesJs";
import {Message} from "element-ui";

// create an axios instance
const service = axios.create({
    baseURL: "/",
    timeout: 5000
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        let token = getToken();

        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        console.log(response)
        const res = response.data

        if (res.code === 200) {
            return res.data;
        } else {
            Message.error(res.msg || 'Error')
            return Promise.reject(new Error(res.msg || 'Error'))
        }
    },
    error => {
        Message.error(error || 'Error')
        console.log(error)
        if (error.response.status === 401) {
            // token失效
            removeToken()
            removeRefreshToken()
            this.$router.push("/login")
        }
        return Promise.reject(error)
    }
)

export default service

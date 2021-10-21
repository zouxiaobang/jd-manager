import axios from 'axios'
import {getToken, isSignOut, removeRefreshToken, removeSignOut, removeToken, setSignOut} from "@/main/cookiesJs";
import {Message, MessageBox} from "element-ui";
import router from "@/router/router";

// create an axios instance
const service = axios.create({
  baseURL: "/api",
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
    console.log(error)
    if (error.response.status === 401) {
      if (isSignOut() === undefined || !isSignOut()) {
        setSignOut(true);
        MessageBox.confirm('登录已过期，请重新登录', 'tip', {
          confirmButtonText: '确定',
          showClose: false,
          showCancelButton: false,
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          // token失效
          removeToken()
          removeRefreshToken();
          let currentPath = router.currentRoute.path;
          if (currentPath !== undefined) {
            router.push({path: `/login?redirect=${currentPath}`})
          } else {
            router.push('/login')
          }
        })
      }
    } else {
      Message.error(error || 'Error')
    }
    removeSignOut()
    return Promise.reject(error)
  }
)

export default service

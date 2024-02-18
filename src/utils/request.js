import axios from "axios"

const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 3000,
})

const { request, response } = instance.interceptors

// 添加请求拦截器
request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

const srvGet = (url, params) => {
  return instance({
    url:url, 
    method:"get",
    params
  })
}


const srvPost = (url, data) => {
  return instance({
    url:url, 
    method:"post",
    data
  })
}

export {
  srvGet,
  srvPost
}
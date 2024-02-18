import { srvPost, srvGet } from "@/utils/request"

const apiUrls = {
  register: "/user/register",
  login: "/user/login",
  logout: "/user/logout",
  userInfo: "/user/info"
}

const registerSrv = () => {
  return srvPost(apiUrls.register)
}

const loginSrv = () => {
  return srvPost(apiUrls.login)
}

const logoutSrv = () => {
  return srvGet(apiUrls.logout)
}

const getUserInfoSrv = () => {
  return srvGet(apiUrls.userInfo)
}

export { registerSrv, loginSrv, logoutSrv, getUserInfoSrv }

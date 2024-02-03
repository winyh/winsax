import { srvPost, srvGet } from "@/utils/request"

const apiUrls = {
  register: "/system/register",
  login: "/system/login",
  logout: "/system/logout",
  systemInfo: "/system/info"
}

const postSystemInfoSrv = () => {
  return srvPost(apiUrls.systemInfo)
}

const getSystemInfoSrv = () => {
  return srvGet(apiUrls.systemInfo)
}

export { postSystemInfoSrv, getSystemInfoSrv }

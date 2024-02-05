import { srvPost, srvGet } from "@/utils/request"

const apiUrls = {
  oss: "/backend/file/oss",
  ossList: "/backend/file/list",
  logout: "/user/logout",
  userInfo: "/user/info"
}

const uploadSrv = () => {
  return srvPost(apiUrls.oss)
}

const getFilesSrv = () => {
  return srvGet(apiUrls.ossList)
}

export { uploadSrv, getFilesSrv }

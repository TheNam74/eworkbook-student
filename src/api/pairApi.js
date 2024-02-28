/* eslint-disable */
import axiosClient from './axiosClient'

class pairApi {
  getOrCreatePair = (teacherid, studentid) => {
    const url = `/pairs/${teacherid}/${studentid}`
    return axiosClient.get(url)
  }
}

export default new pairApi()

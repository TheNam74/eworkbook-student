/* eslint-disable */
import axiosClient from './axiosClient'

class consultApi {
  createConsult = consult => {
    const url = `/consults`
    return axiosClient.post(url, consult)
  }
}

export default new consultApi()

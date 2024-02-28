/* eslint-disable */
import axiosClient from './axiosClient'

class assignmentApi {
    getOneAssignment = (params) => {
        const url = '/assignments/one'
        return axiosClient.get(url, { params })
    }
}

export default new assignmentApi()

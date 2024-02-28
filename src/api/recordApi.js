/* eslint-disable */
import axiosClient from './axiosClient'

class recordApi {
  getRecord = id => {
    const url = `/records/id?%3Aid=${id}`
    return axiosClient.get(url)
  }
  getRecordsByUser = userId => {
    const url = `/records/user/${userId}`
    return axiosClient.get(url)
  }
  getRecords = params => {
    const url = '/records/paging'
    return axiosClient.get(url, { params })
  }
  getRecordFields = async () => {
    const url = '/records/fields'
    return await axiosClient.get(url)
  }
  getRecordsPaging = params => {
    // console.log('params', params)
    const url = '/records/paging'
    return axiosClient.get(url, { params })
  }
  getRecordBooks = async id => {
    const url = `/recordBooks/user/${id}`
    return await axiosClient.get(url)
  }
  getRecordBooksPaging = params => {
    // console.log('params', params)
    const url = '/recordBooks/paging'
    return axiosClient.get(url, { params })
  }

  getAssignmentsPaging = params => {
    // console.log('params', params)
    const url = '/assignments/paging'
    return axiosClient.get(url, { params })
  }
  getOneAssignment = params => {
    // console.log('params', params)
    const url = '/assignments/one'
    return axiosClient.get(url, { params })
  }

  getRecordById = id => {
    const url = `/records/${id}`
    return axiosClient.get(url)
  }
  getPeopleAlsoLearn = async (id, userId) => {
    const url = `/recordBooks/alsoLearn/${id}/${userId}`
    return await axiosClient.get(url)

  }
  getDoTimes = async (id, userid) => {
    const url = `/records/doTimes/${id}/${userid}`
    return await axiosClient.get(url)
  }
}

export default new recordApi()

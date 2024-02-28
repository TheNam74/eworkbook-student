/* eslint-disable */
import axiosClient from './axiosClient'
import { useSelector } from "react-redux";
class MaterialApi {
  getMaterial = id => {
    const url = `/materials/${id}`
    return axiosClient.get(url)
  }

  getRootMaterial = id => {
    const url = `/materials/root/${id}`
    return axiosClient.get(url)
  }
  getMaterials = params => {
    const url = '/materials/paging'
    return axiosClient.get(url, { params })
  }
  getMaterialFields = async () => {
    const url = '/materials/fields'
    return await axiosClient.get(url)
  }
  // getMaterials = (params,access_token) => {
  //   const url = '/materials';
  //   return axiosClient.get(url, { params ,headers:{authorization: `Bearer ${access_token}`}});
  // }
  getAllRecordOfThisRoot = (id, userid) => {
    // console.log('getAllRecordOfThisRoot', id)

    const url = `/records/book/${id}/${userid}`
    return axiosClient.get(url)
  }
  getBookRecord = (userid, bookid) => {
    const url = `/recordBooks/${userid}/${bookid}`
    return axiosClient.get(url)
  }

  getParentMaterial = (materialId) => {
    const url = `/materials/parentMaterial/${materialId}`
    return axiosClient.get(url)
  }
  getDemoMaterialId = () => {
    const url = `/materials/demoId`
    return axiosClient.get(url)
  }

  getNextMaterial = (data) => {
    const url = `/materials/getNextMaterial`
    return axiosClient.post(url, data)
  }
}
const materialApi = new MaterialApi()
export default materialApi

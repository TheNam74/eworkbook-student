/* eslint-disable */
import axiosClient from "./axiosClient";

class RatingApi {
  createRating=(params)=>{
    const url= `/ratings`
    return axiosClient.post(url,{...params});
  }
  getRatingByMaterialId=(params)=>{
    const url=`/ratings/paging`
    return axiosClient.get(url,{params})
  }
  getUserRating=(params)=>{
    const url=`/ratings/single`
    return axiosClient.get(url,{params})
  }

  updateRating=(params)=>{
    const url=`/ratings/update`
    return axiosClient.patch(url,params);
  }

  createVoting=(params)=>{
    const url= `/ratings/voting`
    return axiosClient.post(url,{...params});
  }
  getVoting=(params)=>{
    const url=`/ratings/voting`
    return axiosClient.get(url,{...params})
  }
  getSingleVotingByUserIdAndRatingId=(params)=>{
    const url=`/ratings/singleVoting?ratingId=${params.ratingId}&userId=${params.userId}`
    return axiosClient.get(url)
  }
  getStarRatio= (params)=>{
    const url= `/ratings/ratio?materialId=${params.materialId}&starValue=${params.starValue}`
    return axiosClient.get(url);
  }
}
const ratingApi = new RatingApi()
export default ratingApi;

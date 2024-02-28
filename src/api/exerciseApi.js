import axiosClient from "./axiosClient";

class ExerciseApi {
  getExercise = (params = '') => {
    const url = '/exercises';
    return axiosClient.get(url, { params });
  };

  getExercisesOfMaterial = (materialid) => {
    // console.log('getExercisesOfMaterial', materialid);
    const url = `/exercises?parentMaterial=${materialid}`;
    return axiosClient.get(url);
  }

  getKeys = (id) => {
    const url = '/exercises/keys';
    return axiosClient.get(url, { params: { id } });
  }

  receiveStatus = (data) => {
    const url = '/exercises/status';
    return axiosClient.post(url, { data });
  }
}
const exerciseApi = new ExerciseApi()
export default exerciseApi;

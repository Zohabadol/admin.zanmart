import { Toastify } from "../../../components/toastify";
import { privateRequest } from "../../../config/axios.config"
// fetch api 
export const fetchApi = async(apiEndPoint)=>{
       try {
          const response = await privateRequest.get(`${apiEndPoint}`)
          
          return response;
       } catch (error) {
           Toastify.Error(error?.message);
       }
}
// added 
export const addedApi = async(apiEndPoint,data)=>{
    try {
       const response = await privateRequest.post(`${apiEndPoint}`,data)
        if(response?.data?.success){
         Toastify.Success(response?.data?.message)
        }
       return response;
    } catch (error) {
        Toastify.Error(error?.message);
    }
}
// update 
export const updatedApi = async(apiEndPoint,data)=>{
    try {
       const response = await privateRequest.put(`${apiEndPoint}`,data)
        if(response?.data?.success){
         Toastify.Success(response?.data?.message)
        }
       return response;
    } catch (error) {
        Toastify.Error(error?.message);
    }
}
// delete api 
export const deleteApi = async(apiEndPoint)=>{
       try {
          const response = await privateRequest.delete(`${apiEndPoint}`)
           if(response?.data?.success){
            Toastify.Success(response?.data?.message)
           }
          return response;
       } catch (error) {
           Toastify.Error(error?.message);
       }
}
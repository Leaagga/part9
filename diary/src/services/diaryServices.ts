import axios from 'axios';
import { Diary, NewDiary } from "../types";
interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}
const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data)
}

export const createDiaries = async(object: NewDiary) => {
  try{
    const response=await axios.post<Diary>(baseUrl, object)
    return(response.data)
  }catch(error){
if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.log(error);
      return({error:{data:error.response?.data,status:error.response?.status}})
    }
  }

}
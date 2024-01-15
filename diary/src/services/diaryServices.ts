import axios from 'axios';
import { Diary, NewDiary } from "../types";
export interface ValidationError {
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

    const response=await axios.post<Diary>(baseUrl, object)
    return(response.data)


}
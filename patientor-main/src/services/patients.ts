import axios, { AxiosError } from "axios";
import { EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );
console.log(data);
  return data;
};
const createEntry=async(pid:string,object:EntryWithoutId)=>{
  try{
  const {data}=await axios.post(
    `${apiBaseUrl}/patients/${pid}/entries`,
    object
  );
  console.log(data);
  return data;
}catch(err){
  console.log(err );
  const error=err as AxiosError;
  const errorData=error.response?.data;
  console.log(errorData);
  return({Error:errorData});
}
};
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );
    console.group(data);
  return data;
};
const getOne=async(id:string|undefined)=>{
const {data}=await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
console.log(data);
  return data;
};
export default {
  getAll, create,getOne,createEntry
};


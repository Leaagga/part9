import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );
console.log(data);
  return data;
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
  getAll, create,getOne
};


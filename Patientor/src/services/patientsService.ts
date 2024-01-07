import patientData from "../../data/patients";
import { NewPatient, Patient,PatientWithoutssn} from "../types";
import { v1 as uuid } from 'uuid';

const patients:Patient[]=patientData;

const getPatients=():PatientWithoutssn[]=>{
  return patients.map(p=>({
  id:p.id,name:p.name,dateOfBirth:p.dateOfBirth,gender:p.gender,occupation:p.occupation,
}));
};
const addPatient=(object:NewPatient):PatientWithoutssn=>{
  const {name,dateOfBirth,gender,occupation,ssn}=object;
  const id = uuid();
  const newPatient:Patient={name,dateOfBirth,gender,occupation,ssn,id};
  console.log(newPatient);
  console.log(patients);
  patients.push(newPatient);
  console.log(patients);
  return {name,dateOfBirth,gender,occupation,id};
};
export default {getPatients,addPatient};
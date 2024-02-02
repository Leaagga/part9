import patientData from "../../data/patients";
import { NewPatient, Patient,NonSensitivePatient, Entry,EntryWithoutId} from "../types";
import { v1 as uuid } from 'uuid';


const patients:Patient[]=patientData;

const getPatients=():NonSensitivePatient[]=>{
  return patients.map(p=>({
  id:p.id,name:p.name,dateOfBirth:p.dateOfBirth,gender:p.gender,occupation:p.occupation,entries:p.entries
}));
};
const getPatient=(id:string):Patient|undefined=>{
  const patient=patients.find(p=>p.id===id);
  return patient;
};
const addEntry=(pid:string,entry:EntryWithoutId):Entry|undefined=>{
  const id = uuid();
  const patient=patients.find(p=>p.id===pid);
  if(!patient){return undefined;}
  const patientEntry:Entry={...entry,id};
  console.log(patientEntry);
  patient.entries.push(patientEntry);
  return patientEntry;
};
const addPatient=(object:NewPatient):NonSensitivePatient=>{
  const {name,dateOfBirth,gender,occupation,ssn,entries}=object;
  const id = uuid();
  const newPatient:Patient={name,dateOfBirth,gender,occupation,ssn,id,entries};
  console.log(newPatient);
  console.log(patients);
  patients.push(newPatient);
  console.log(patients);
  return {name,dateOfBirth,gender,occupation,id};
};
export default {getPatients,addPatient,getPatient,addEntry};
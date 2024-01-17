import patientData from "../../data/patients";
import { NewPatient, Patient,NonSensitivePatient} from "../types";
import { v1 as uuid } from 'uuid';

const patients:Patient[]=patientData;

const getPatients=():NonSensitivePatient[]=>{
  return patients.map(p=>({
  id:p.id,name:p.name,dateOfBirth:p.dateOfBirth,gender:p.gender,occupation:p.occupation,
}));
};
const getPatient=(id:string):Patient|undefined=>{
  const patient=patients.find(p=>p.id=id);
  if(patient){
    patient?.entries?null:patient.entries=[]
  }

  return patient;
};
const addPatient=(object:NewPatient):NonSensitivePatient=>{
  const {name,dateOfBirth,gender,occupation,ssn}=object;
  const id = uuid();
  const newPatient:Patient={name,dateOfBirth,gender,occupation,ssn,id,entries:[]};
  console.log(newPatient);
  console.log(patients);
  patients.push(newPatient);
  console.log(patients);
  return {name,dateOfBirth,gender,occupation,id};
};
export default {getPatients,addPatient,getPatient};
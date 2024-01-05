import data from "../../data/patients";
import { Patient,PatientWithoutssn} from "../../types";
const patients:Patient[]=data;

const getPatients=():PatientWithoutssn[]=>{
  return patients.map(p=>({
  id:p.id,name:p.name,dateOfBirth:p.dateOfBirth,gender:p.gender,occupation:p.occupation,
}));
};
export default {getPatients};
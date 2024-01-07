
import data from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnosis:Diagnosis[]=data;

const getDiagnosis=():Diagnosis[]=>{
  return diagnosis;
};

export default {getDiagnosis};
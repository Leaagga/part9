export interface Diagnosis{
      code: string;
    name:  string;
    latin?:  string;
}
export enum Gender{
  Female='female',
  Other='other',
  Male='male'
}
export interface Patient{
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
}
export type PatientWithoutssn=Omit<Patient,"ssn">;
export type NewPatient=Omit<Patient,"id">;
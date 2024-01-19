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
  occupation: string,
  entries:Entry[],
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
interface DischargeObject{
  date:string;
  criteria:string;
}
interface SickLeaveObject{
      startDate:string;
    endDate:string;
}
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface OccupationalHealthcareEntry extends BaseEntry{
  type: 'OccupationalHealthcare';
employerName:string;
  sickLeave?: SickLeaveObject

}
interface HospitalEntry extends BaseEntry{
type: 'Hospital';
  discharge: DischargeObject;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
export type PatientWithoutssn=Omit<Patient,"ssn">;
export type NewPatient=Omit<Patient,"id">;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
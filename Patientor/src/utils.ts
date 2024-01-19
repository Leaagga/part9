import { Gender, NewPatient,Entry} from './types';
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};
const isType=(type:string):boolean=>{
  return type==="HealthCheck"||type==="OccupationalHealthcare"||type==="Hospital";
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};
const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};
const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};
const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};
const parseEntry=(entries:unknown):Entry[]=>{
    if ( !entries||!(entries instanceof Array)) {
    throw new Error('Incorrect or missing data');
  }
  const newEntries:Entry[]=entries.map(e=>{
    console.log(e)
    if (typeof e !== 'object'||!e){
    throw new Error('Incorrect or missing data');
  }
  if('type' in e&&'id' in e&&'description' in e&&'date' in e&&'specialist' in e&&(isString(e.type)&&isType(e.type))){
    return e;
  }
    throw new Error('Incorrect data: a field missing');})
    console.log(newEntries);
return newEntries;
};
const toNewPatientEntry = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object&&'entries'in object)  {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      gender: parseGender(object.gender),
      ssn:parseSsn(object.ssn),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      entries:parseEntry(object.entries)
    };
  
    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};
export default toNewPatientEntry;
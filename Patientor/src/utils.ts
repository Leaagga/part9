import { Gender, NewPatient,Entry,Diagnosis, SickLeaveObject, DischargeObject, EntryWithoutId} from './types';
const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};
const parseDescription=(description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};
const parseId=(id: unknown): string => {
  if (!isString(id)) {
    throw new Error('Incorrect or missing id');
  }
  return id;
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
const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};
const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
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

const parseSickLeave=(sickLeave:unknown):SickLeaveObject=>{
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if('startDate' in sickLeave&&'endDate' in sickLeave){
  const newSickLeave={
    startDate:parseDate(sickLeave.startDate),
    endDate:parseDate(sickLeave.endDate)
    };
  if(newSickLeave.endDate>newSickLeave.startDate){
    return newSickLeave;}
}
throw new Error('Incorrect data: a field missing');
};
const parseCriteria=(criteria:unknown):string=>{
    if (!isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }

  return criteria;
};
const parseDischarge=(discharge:unknown):DischargeObject=>{
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if('date' in discharge&&'criteria' in discharge){
  const newSickLeave={
    date:parseDate(discharge.date),
    criteria:parseCriteria(discharge.criteria)
};

  return newSickLeave;
}
throw new Error('Incorrect data: a field missing');
};
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  console.log(object.diagnosisCodes);
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

// const parseType=(type: unknown): "HealthCheck"|"OccupationalHealthcare"|"Hospital" => {
//   if (!isString(type)) {
//     throw new Error('Incorrect type: ' + type);
//   }
//   if(!(type==="HealthCheck"||type==="OccupationalHealthcare"||type==="Hospital")){
//     throw new Error('Incorrect type: ' + type);
//   }
//   return type;
// };
const parseHealthCheckRating=(hr: unknown): number => {
  const set1 = new Set([0,1, 2, 3]);
  if (!(set1.has(Number(hr)))||!isNumber(Number(hr))) {
    throw new Error('Incorrect type: ' + hr);
  }
  return Number(hr);
};
const parseEmployerName=(employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }

  return employerName;
};
export const toNewEntry=(e:unknown):EntryWithoutId=>{
      if (typeof e !== 'object'||!e){
    throw new Error('Incorrect or missing data');
  }
  let newPatientEntry;
  if('type' in e&&'description' in e&&'date' in e&&'specialist' in e){
    
    switch(e.type){
      case 'Hospital':
                if(!('discharge' in e)){
          throw new Error('Incorrect or missing data');
        }
            newPatientEntry={
      type:'Hospital' ,
      specialist:parseSpecialist(e.specialist),
      date:parseDate(e.date),
      description:parseDescription(e.description),
    discharge:parseDischarge(e.discharge),
  diagnosisCodes:parseDiagnosisCodes(e)};

          break;
      case 'OccupationalHealthcare':
        if(!('employerName' in e)){
          throw new Error('Incorrect or missing data');
        }
    newPatientEntry={
      type:'OccupationalHealthcare',
      specialist:parseSpecialist(e.specialist),
      date:parseDate(e.date),
      description:parseDescription(e.description),
    employerName:parseEmployerName(e.employerName),
  diagnosisCodes:parseDiagnosisCodes(e)};

        if(!('sickLeave' in e)){
          break;
        }else{
              Object.defineProperties(newPatientEntry,{
                sickLeave:{
                  value:parseSickLeave(e.sickLeave),
                  writable:true}});
        }
        break;
      case 'HealthCheck':
        if(!('healthCheckRating' in e)){
          throw new Error('Incorrect or missing data');
        }
      newPatientEntry={
      type:'HealthCheck',
      specialist:parseSpecialist(e.specialist),
      date:parseDate(e.date),
      description:parseDescription(e.description),
      healthCheckRating:parseHealthCheckRating(e.healthCheckRating),
    diagnosisCodes:parseDiagnosisCodes(e)};
          
        break;
        default:
          throw new Error('Incorrect or missing data');
    }
    console.log(newPatientEntry);
      return newPatientEntry as EntryWithoutId;
    
  
    
  }
    throw new Error('Incorrect data: a field missing');
};
const parseEntries=(entries:unknown):Entry[]=>{
    if ( !entries||!(entries instanceof Array)) {
    throw new Error('Incorrect or missing data');
  }
const newEntries:Entry[]=entries.map(e=>{
    console.log(e);
    if(!e){throw new Error('Incorrect data: a field missing');}
    return parseEntry(e);
});

    console.log(newEntries);
return newEntries;

};
const parseEntry =(object:unknown):Entry=>{
  if (typeof object !== 'object'||!object){
    throw new Error('Incorrect or missing data');
  }
  const Entrywithoutid=toNewEntry(object);
  if('id' in object){
  const entry={...Entrywithoutid,
    id:parseId(object.id)
  };
  return entry;}
  throw new Error('Incorrect data: a field missing');
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
      entries:parseEntries(object.entries)
    };
  
    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};
export default toNewPatientEntry;
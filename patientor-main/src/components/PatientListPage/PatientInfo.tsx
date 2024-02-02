import { useParams } from "react-router-dom";
import { Diagnosis, Gender, Patient,Entry } from "../../types";
import { useEffect, useState } from "react";
import PatientsService from '../../services/patients';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { Button } from "@mui/material";
import OccupationalHealthcareEntryComp from "./OccupationalHealthcareEntry";
import HospitalEntryComp from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import NewPatientForm from "./NewPatientForm";
const PatientInfo=()=>{
  const {id}= useParams();
  const [patient,setPatient]=useState<Patient>();
  const [entries,setEntries]=useState<Entry[]>([]);
    
  useEffect(()=>{
    PatientsService.getOne(id).then(p=>{
      setPatient(p);
      setEntries(p.entries);
    });

  },[]);
  if(!patient){return null;}
  const genderIconHandler=(gender:Gender)=>{
  switch(gender){
    case 'female':
      return<FemaleIcon/>;
    case 'other':
      return <TransgenderIcon />;
    case 'male':
        return <MaleIcon />;
  }
  };
  const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
   const EntryDetails=(entry:Entry)=>{
    console.log(entry);
    switch(entry.type){
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryComp entry={entry}/>;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
      case "Hospital":
        return <HospitalEntryComp entry={entry} />;
      default:
        return assertNever(entry);
    }
   };
return(<div>
  <div><h2>{patient.name}{genderIconHandler(patient.gender)}</h2></div>
  <div>ssn: {patient.ssn}</div>
  <div>occupation: {patient.occupation}</div>
  <NewPatientForm id={patient.id} entries={entries} setEntries={setEntries} />
  <div>
    <h3>entries</h3>
    <div>
      {patient.entries.map(e=>
      
        <div >{EntryDetails(e)}
          {/* <p>{e.date} <i>{e.description}</i></p>
          <ul>{e.diagnosisCodes?.map(dc=>
            <li>{dc} {diagnoses.find(d=>d.code==dc)?.name}</li>
          )}</ul> */}
        </div>
  )}

  </div>
  </div>
  </div>);
};
export default PatientInfo;
import { useParams } from "react-router-dom";
import { Gender, Patient } from "../../types";
import { useEffect, useState } from "react";
import PatientsService from '../../services/patients';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
const PatientInfo=()=>{
  const {id}= useParams();
  const [patient,setPatient]=useState<Patient>();
  useEffect(()=>{
    PatientsService.getOne(id).then(p=>setPatient(p));
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

return(<div>
  <div><h2>{patient.name}{genderIconHandler(patient.gender)}</h2></div>
  <div>ssn: {patient.ssn}</div>
  <div>occupation: {patient.occupation}</div>
  <div>
    <h3>entries</h3>
    <div>
      {patient.entries.map(e=>
        <div>
          <p>{e.date} <i>{e.description}</i></p>
          <ul>{e.diagnosisCodes?.map(dc=>
            <li>{dc}</li>
          )}</ul>
        </div>
  )}
  </div>
  </div>
  </div>);
};
export default PatientInfo;
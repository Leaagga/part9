import {Alert,Button, Card, RadioGroup, TextField,Radio,FormControl,FormLabel,FormControlLabel } from "@mui/material";
import { useState,SyntheticEvent } from "react";
import PatientsService from '../../services/patients';
import { EntryWithoutId, HealthCheckRating,Entry } from "../../types";


interface NewPatientFormProps{
  id:string;
  entries:Entry[];
  setEntries:React.Dispatch<React.SetStateAction<Entry[] | undefined>>;
}
const NewPatientForm=({id,entries,setEntries}:NewPatientFormProps)=>{
  const [type,setType]=useState<string>("HealthCheck");
  const [description,setDescription]=useState<string>();
  const [date,setDate]=useState<string>();
  const [specialist,setSpecialist]=useState<string>();
  const [healthCheckRating,setHealthCheckRating]=useState<string>();
  const [diagnosisCodes,setDiagnosisCodes]=useState<string>();
  const [visible,setVisible]=useState<boolean>(false);
  const [error,setError]=useState<string>();
  const [criteria,setCriteria]=useState<string>();
  const [dischangeDate,setDischargeDate]=useState<string>();
  const [startDate,setStartDate]=useState<string>();
  const [endDate,setEndDate]=useState<string>();
  const displayWhenVisible={display:visible?'':'none'};
  const undisplayWhenVisible={display:visible?'none':''};
  const handleTypeEntry=()=>{
    switch(type){
      case 'HealthCheck':
        return {
      type,
      description,
      date,
      specialist,
      healthCheckRating:Number(healthCheckRating),
      diagnosisCodes:diagnosisCodes?.split(",")
    };
    case 'OccupationalHealthcare':
      return {
      type,
      description,
      date,
      specialist,
      sickLeave: {
        startDate,
        endDate
      },
      diagnosisCodes:diagnosisCodes?.split(",")
    };
    case 'Hospital':
      return {
      type,
      description,
      date,
      specialist,
      discharge: {
        date:dischangeDate,
        criteria
      },
      diagnosisCodes:diagnosisCodes?.split(",")
    };
    }
  };
  const handlePatientForm=async (event:SyntheticEvent)=>{
    try{
    event.preventDefault();

    const entryObject=handleTypeEntry();
    const response=await PatientsService.createEntry(id,entryObject as EntryWithoutId);
    if(response.Error){throw(response.Error as string);}
    setEntries(entries.concat(response));}catch(error){
      setError(error as string);
    }
       
    
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };
return <div>
        {error?<Alert severity="error">{error}</Alert>:null}
        <Button style={undisplayWhenVisible} variant="contained" onClick={()=>setVisible(true)}>ADD NEW ENTRY</Button>
        <Card style={displayWhenVisible} variant="outlined" sx={{border:'dotted',p:'8px',borderWidth:'2px',borderColor:'black',margin:'4px'}}>
        <h3>New {type} entry</h3>
        <form onSubmit={handlePatientForm}>
          <FormControl>
          <FormLabel>Entry Type</FormLabel>
          <RadioGroup row defaultValue="HealthCheck" name="radio-buttons-group" onChange={handleTypeChange}>
            <FormControlLabel label="HealthCheck" value='HealthCheck' control={<Radio size="small"/>} />
            <FormControlLabel label="Hospital" value='Hospital' control={<Radio size="small"/>} />
            <FormControlLabel label="OccupationalHealthcare" value='OccupationalHealthcare' control={<Radio size="small"/>} />
            </RadioGroup>
          </FormControl>
          <TextField margin="dense" label='Description' variant="standard" value={description} onChange={({target})=>setDescription(target.value)} fullWidth/>
          <TextField margin="dense" label='Date' variant="standard" value={date} onChange={({target})=>setDate(target.value)} fullWidth/>
          <TextField margin="dense" label='Specialist' variant="standard" value={specialist} onChange={({target})=>setSpecialist(target.value)} fullWidth/>
          {type==='HealthCheck'?<TextField margin="dense" label='Healthcheck rating' variant="standard" value={healthCheckRating} onChange={({target})=>setHealthCheckRating(target.value)} fullWidth/>:null}
          <TextField margin="dense" label='Diagnosis codes' variant="standard" value={diagnosisCodes} onChange={({target})=>setDiagnosisCodes(target.value)} fullWidth/>
{          type==='Hospital'?<FormControl fullWidth margin="dense" sx={{px:'4px'}}>
          <FormLabel>Discharge</FormLabel>
          <TextField variant="standard" margin="dense" label='start' onChange={({target})=>setStartDate(target.value)} value={startDate} fullWidth/>
          <TextField variant="standard" margin="dense" label='end' onChange={({target})=>setEndDate(target.value)} value={endDate} fullWidth/>
          </FormControl>:null}
{          type==='OccupationalHealthcare'?<FormControl fullWidth margin="dense" sx={{px:'4px'}} >
          <FormLabel>Sickleave</FormLabel>
          <TextField variant="standard" margin="dense" label='date' onChange={({target})=>setDischargeDate(target.value)} value={dischangeDate} fullWidth/> 
          <TextField variant="standard" margin="dense" label='criteria' onChange={({target})=>setCriteria(target.value)} value={criteria} fullWidth/> 
          </FormControl>:null}
          <Button sx={{my:'4px'}} variant="contained" color="error" onClick={()=>setVisible(false)}>CANCEL</Button>
          <Button sx={{my:'4px'}} variant="outlined" type="submit" style={{float:'right'}}>ADD</Button>
        </form>
      </Card></div>;
};
export default NewPatientForm;
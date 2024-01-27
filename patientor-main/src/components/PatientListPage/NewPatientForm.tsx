import {Alert,Button, Card, TextField } from "@mui/material";
import { useState,SyntheticEvent } from "react";
import PatientsService from '../../services/patients';
import { EntryWithoutId, HealthCheckRating,Entry } from "../../types";
interface NewPatientFormProps{
  id:string;
  entries:Entry[];
  setEntries:React.Dispatch<React.SetStateAction<Entry[] | undefined>>;
}
const NewPatientForm=({id,entries,setEntries}:NewPatientFormProps)=>{
  const [description,setDescription]=useState<string>();
  const [date,setDate]=useState<string>();
  const [specialist,setSpecialist]=useState<string>();
  const [healthCheckRating,setHealthCheckRating]=useState<string>();
  const [diagnosisCodes,setDiagnosisCodes]=useState<string>();
  const [visible,setVisible]=useState<boolean>(false);
  const [error,setError]=useState<string>();
  const displayWhenVisible={display:visible?'':'none'};
  const undisplayWhenVisible={display:visible?'none':''};
  const handlePatientForm=async (event:SyntheticEvent)=>{
    try{
    event.preventDefault();
    const entryObject={
      type:'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating:Number(healthCheckRating),
      diagnosisCodes:diagnosisCodes?.split(",")
    };
    const response=await PatientsService.createEntry(id,entryObject as EntryWithoutId);
    if(response.Error){throw(response.Error as string);}
    setEntries(entries.concat(response));}catch(error){
      setError(error as string);
    }
       
    
  };
return <div>
        {error?<Alert severity="error">{error}</Alert>:null}
        <Button style={undisplayWhenVisible} variant="contained" onClick={()=>setVisible(true)}>ADD NEW ENTRY</Button>
        <Card style={displayWhenVisible} variant="outlined" sx={{border:'dotted',p:'8px',borderWidth:'2px',borderColor:'black',margin:'4px'}}>
        <h3>New HealthCheck entry</h3>
        <form onSubmit={handlePatientForm}>
          <TextField margin="dense" label='Description' variant="standard" value={description} onChange={({target})=>setDescription(target.value)} fullWidth/>
          <TextField margin="dense" label='Date' variant="standard" value={date} onChange={({target})=>setDate(target.value)} fullWidth/>
          <TextField margin="dense" label='Specialist' variant="standard" value={specialist} onChange={({target})=>setSpecialist(target.value)} fullWidth/>
          <TextField margin="dense" label='Healthcheck rating' variant="standard" value={healthCheckRating} onChange={({target})=>setHealthCheckRating(target.value)} fullWidth/>
          <TextField margin="dense" label='Diagnosis codes' variant="standard" value={diagnosisCodes} onChange={({target})=>setDiagnosisCodes(target.value)} fullWidth/>
          {/* <TextField label='' onChange={} value={} fullWidth/>
          <TextField label='' onChange={} value={} fullWidth/>
          <TextField label='' onChange={} value={} fullWidth/> */}
          <Button sx={{my:'4px'}} variant="contained" color="error" onClick={()=>setVisible(false)}>CANCEL</Button>
          <Button sx={{my:'4px'}} variant="outlined" type="submit" style={{float:'right'}}>ADD</Button>
        </form>
      </Card></div>;
};
export default NewPatientForm;
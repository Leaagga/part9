import {SelectChangeEvent,Alert,Button,Input,Card, RadioGroup,InputLabel,OutlinedInput ,MenuItem, TextField,Radio,FormControl,FormLabel,FormControlLabel,Select } from "@mui/material";
import { useState,SyntheticEvent, useEffect } from "react";
import PatientsService from '../../services/patients';
import { EntryWithoutId, HealthCheckRating,Entry, Diagnosis } from "../../types";
import diagnsisService from "../../services/diagnoses";

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
  const [diagnosisCodes,setDiagnosisCodes]=useState<string[]>([]);
  const [visible,setVisible]=useState<boolean>(false);
  const [error,setError]=useState<string>();
  const [criteria,setCriteria]=useState<string>();
  const [dischangeDate,setDischargeDate]=useState<string>();
  const [startDate,setStartDate]=useState<string>();
  const [endDate,setEndDate]=useState<string>();
  const displayWhenVisible={display:visible?'':'none'};
  const undisplayWhenVisible={display:visible?'none':''};
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(()=>{
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnsisService.getAll();
      console.log(diagnoses);
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();},[]);
  const diagnosesCodes:Array<Diagnosis['code']>=diagnoses.map(d=>{
    return(d.code);});
    console.log(diagnosesCodes);
  const handleTypeEntry=()=>{
    switch(type){
      case 'HealthCheck':
        return {
      type,
      description,
      date,
      specialist,
      healthCheckRating:Number(healthCheckRating),
      diagnosisCodes:diagnosisCodes};
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
      diagnosisCodes:diagnosisCodes};
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
      diagnosisCodes:diagnosisCodes};
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
  
  const handleCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
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
          <FormControl margin="dense" fullWidth>
            <InputLabel shrink htmlFor='Date'>Date</InputLabel>
          <Input  type='date'  id='Date' value={date} onChange={({target})=>setDate(target.value)}/>
          </FormControl>
          <TextField  label='Specialist' variant="standard" value={specialist} onChange={({target})=>setSpecialist(target.value)} fullWidth/>
          
          <FormControl margin="dense" fullWidth>
            <InputLabel >Diagnoses Codes</InputLabel>
          <Select multiple value={diagnosisCodes} onChange={handleCodesChange} input={<OutlinedInput label="Code" />} fullWidth>
            {diagnosesCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
              </MenuItem>))}</Select>
          </FormControl>
          {type==='HealthCheck'?<TextField margin="dense" label='Healthcheck rating' variant="standard" value={healthCheckRating} onChange={({target})=>setHealthCheckRating(target.value)} fullWidth/>:null}
{          type==='Hospital'?<FormControl fullWidth margin="dense" sx={{px:'4px'}}>
          <FormLabel>Discharge</FormLabel>
          <FormControl margin="dense">
            <InputLabel shrink htmlFor='start'>start</InputLabel>
          <Input type='date' margin="dense" id='start' value={startDate} onChange={({target})=>setStartDate(target.value)} fullWidth/>
          </FormControl>
          <FormControl margin="dense">
            <InputLabel shrink htmlFor='end'>end</InputLabel>
          <Input type='date' margin="dense" id='end' value={endDate} onChange={({target})=>setEndDate(target.value)} fullWidth/>
          </FormControl>
          </FormControl>:null}
{          type==='OccupationalHealthcare'?<FormControl fullWidth margin="dense" sx={{px:'4px'}} >
          <FormLabel>Sickleave</FormLabel>
          <FormControl margin="dense">
            <InputLabel shrink htmlFor='DischargeDate'>date</InputLabel>
          <Input type='date' margin="dense" id='DischargeDate' onChange={({target})=>setDischargeDate(target.value)} value={dischangeDate} fullWidth/>
          </FormControl>
          <TextField variant="standard" margin="dense" label='criteria' onChange={({target})=>setCriteria(target.value)} value={criteria} fullWidth/> 
          </FormControl>:null}
          <Button sx={{my:'4px'}} variant="contained" color="error" onClick={()=>setVisible(false)}>CANCEL</Button>
          <Button sx={{my:'4px'}} variant="outlined" type="submit" style={{float:'right'}}>ADD</Button>
        </form>
      </Card></div>;
};
export default NewPatientForm;
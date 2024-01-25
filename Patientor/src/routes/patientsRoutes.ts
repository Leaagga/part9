import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';
import { toNewEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
res.send(patientsService.getPatients());
});
router.get('/:id',(req,res)=>{
  console.log(req.params);
  res.send(patientsService.getPatient(req.params.id));
});
router.post('/', (req, res) => {try{
  const newPatient=toNewPatientEntry(req.body);
  const response=patientsService.addPatient(newPatient);
  console.log(response);
  res.json(response);}catch(error:unknown){
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
router.post('/:id/entries', (req, res) => {try{
  const pid=req.params.id;
  const newEntry=toNewEntry(req.body);
  console.log(newEntry);
  const response=patientsService.addEntry(pid,newEntry);
  res.json(response);}catch(error:unknown){
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;
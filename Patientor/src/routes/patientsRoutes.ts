import express from 'express';
import patientsService from '../services/patientsService';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const router = express.Router();

router.get('/', (_req, res) => {
res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
  const {name,dateOfBirth,gender,occupation,ssn}=req.body;
  const response=patientsService.addPatient({name,dateOfBirth,gender,occupation,ssn});
  console.log(response);
  res.json(response);
});

export default router;
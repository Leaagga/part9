import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

import diagnosesRouter from './routes/diagnosesRoutes';
import patientsRouter from './routes/patientsRoutes';
const PORT = 3000;
app.use('/api/diagnoses',diagnosesRouter);
app.use('/api/patients',patientsRouter);
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
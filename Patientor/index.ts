import express from 'express';
const app = express();
app.use(express.json());
import diagnosesRouter from './src/routes/diagnosesRoutes';
const PORT = 3000;
app.use('/api/diagnoses',diagnosesRouter);
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
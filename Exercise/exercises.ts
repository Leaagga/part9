import express from 'express';
import {calculateExercises} from './exerciseCalculator';

const app = express();
app.use(express.json());

app.post('/exercises',(req,res)=>{
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises,target}=req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const daily:number[]=daily_exercises.map((d:string)=>Number(d));
  const targetNew:number=Number(target);
  
  const response=calculateExercises({target:targetNew,daily});
  res.json(response);
});
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

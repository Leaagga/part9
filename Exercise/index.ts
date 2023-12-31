import express from 'express';
import  {calculateBmi} from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi',(req,res)=>{
  const {height,weight}=req.query;
  calculateBmi({height:Number(height),weight:Number(weight)});
  res.send(calculateBmi({height:Number(height),weight:Number(weight)}));
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

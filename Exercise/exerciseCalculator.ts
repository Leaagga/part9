interface CalculateOutput{
periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
interface MultiplyValues {
  daily: number[];
  target: number;
}
const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const newArgs=args.slice(2);
  
  if (!newArgs.find((n:string)=>isNaN(Number(n)))) {
    return {
      daily:args.slice(3).map(d=>Number(d)),
     target:Number(args[2])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
export const calculateExercises=(multiplyValues:MultiplyValues):CalculateOutput=>{
  const {daily,target}=multiplyValues;
  const periodLength=daily.length;
  const trainingDays=daily.filter(d=>d>0).length;
  let totalLength=0;
  daily.forEach(d=>totalLength=totalLength+d);
  const averageDaily=totalLength/periodLength;
  let rating:number;
  let ratingDescription:string;
  if(averageDaily>=target){
    rating=1;
    ratingDescription='very good';
  }else if(averageDaily<target&&averageDaily>target*2/3){
    rating=2;
    ratingDescription='not too bad but could be better';
  }else{
    rating=3;
    ratingDescription='not enough';
  }
  const success=averageDaily>=target;
  return({
periodLength,
  trainingDays,
  success,
  rating,
  ratingDescription,
  target,
  average: averageDaily
  });
};
try{
// const daily:number[]=process.argv.slice(3).map(d=>Number(d))
// const target:number=Number(process.argv[2])

console.log(calculateExercises(parseArguments(process.argv)));}catch(error){
  console.log(error);
}

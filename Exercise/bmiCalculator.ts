interface MultiplyValuesBMI {
  height: number;
  weight: number;
}
const bmiparseArguments = (args: string[]): MultiplyValuesBMI => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')
  const newArgs=args.slice(2)
  
  if (!newArgs.find((n:string)=>isNaN(Number(n)))) {
    return {
      height:Number(args[2]),
    weight:Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi=(BMIObject:MultiplyValuesBMI)=>{
  const { height,weight}=BMIObject
  const BMI=weight/(height*height/10000)
if(BMI<18.5){
  return('underweight')
}else if(18.5<=BMI&&BMI<25){
return('Normal (healthy weight)')
}else if(25<=BMI&&BMI<30){
   return('overweight')
}else{
  return('obesity')
}
}
try{
  console.log(calculateBmi(bmiparseArguments(process.argv)))}catch(error){
    console.log(error)
  }


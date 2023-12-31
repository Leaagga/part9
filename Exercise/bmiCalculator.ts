const calculateBmi=(height:number,weight:number)=>{
  const BMI=weight/(height*height/10000)
if(BMI<18.5){
  return('Unormal (underweight)')
}else if(18.5<=BMI&&BMI<25){
return('Normal (healthy weight)')
}else if(25<=BMI&&BMI<30){
   return('Unormal (overweight)')
}else{
  return('Unormal (obesity)')
}
}
console.log(calculateBmi(180, 74))
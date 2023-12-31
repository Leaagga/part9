interface CalculateOutput{
periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
const calculateExercises=(daily:number[],target:number):CalculateOutput=>{
  const periodLength=daily.length
  const trainingDays=daily.filter(d=>d>0).length
  let totalLength=0
  daily.forEach(d=>totalLength=totalLength+d)
  const averageDaily=totalLength/periodLength
  let rating:number
  let ratingDescription:string
  if(averageDaily>=target){
    rating=1
    ratingDescription='very good'
  }else if(averageDaily<target&&averageDaily>target*2/3){
    rating=2
    ratingDescription='not too bad but could be better'
  }else{
    rating=3
    ratingDescription='not enough'
  }
  const success=averageDaily>=target
  return({
periodLength,
  trainingDays,
  success,
  rating,
  ratingDescription,
  target,
  average: averageDaily
  })
}
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))
import { courseProps } from "../App"
const Total=(props:courseProps):JSX.Element=>{
  const {courseParts}=props
const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
return(
  <p>
        Number of exercises {totalExercises}
  </p>
)
}
export default Total
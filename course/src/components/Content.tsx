import { courseProps } from "../App"
const Content=(props:courseProps):JSX.Element=>{
  const {courseParts}=props
  return(
    <div>
      {courseParts.map(c=><p>{c.name} {c.exerciseCount}</p>)}
      </div>)
}
export default Content
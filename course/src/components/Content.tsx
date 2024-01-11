import { courseProps } from "../App"
import Part from "./Part"
const Content=(props:courseProps):JSX.Element=>{
 const {courseParts}=props
  return(
    <div>{courseParts.map(part=><Part part={part}/>)}
      </div>
      )
}
export default Content
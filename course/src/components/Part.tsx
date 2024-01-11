import { CoursePart } from "../App";

const Part=({part}:{part:CoursePart}):JSX.Element=>{
 const assertNever = (value: never): never => {
   throw new Error(
     `Unhandled discriminated union member: ${JSON.stringify(value)}`
   );
};
const partsCase=(part:CoursePart):React.ReactNode=>{
  console.log(part)
    switch(part.kind){
      case 'basic':
        return(<div><p><b>{part.name} {part.exerciseCount}</b></p>
     <p><i>{part.description}</i></p></div>
    )
        break;
      case 'group':
        return(<div>
        <p><b>{part.name} {part.exerciseCount}</b></p>
        <p>project exercises {part.groupProjectCount}</p> 
        </div>)
        break;
      case 'background':
        return(
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
   <p><i>{part.description}</i></p>

<p>submit to {part.backgroundMaterial}</p>
</div>)
        break;
        case "special":
          return(<div>
            <p><b>{part.name} {part.exerciseCount}</b></p>
     <p><i>{part.description}</i></p>
      <p>required skills: {part.requirements.join()}</p>
      </div>)
        break;
       default:
        console.log(part)
           return assertNever(part);
    }
}
  return(<div>
    {partsCase(part)}
  </div>)
}
export default Part
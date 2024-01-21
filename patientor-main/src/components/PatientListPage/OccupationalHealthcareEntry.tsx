import { OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';
import Card from '@mui/material/Card';
const OccupationalHealthcareEntryComp=({entry}:{entry:OccupationalHealthcareEntry})=>{
  console.log(entry);
  return<Card variant="outlined" sx={{borderWidth:'2px',borderColor:'black',margin:'4px'}}>
          <div>{entry.date} <WorkIcon /> <i>{entry.employerName}</i></div>
          <div><i>{entry.description}</i></div>
          <div>diagnose by {entry.specialist}</div></Card>
        ;
};
export default OccupationalHealthcareEntryComp;
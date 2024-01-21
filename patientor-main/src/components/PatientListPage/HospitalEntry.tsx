import { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Card from '@mui/material/Card';
const HospitalEntryComp=({entry}:{entry:HospitalEntry})=>{
    console.log(entry);
return<Card variant="outlined" sx={{borderWidth:'2px',borderColor:'black',margin:'4px'}}>
        <div>{entry.date} <LocalHospitalIcon /></div>
        <div><i>{entry.description}</i></div>
        <div>diagnose by {entry.specialist}</div>
      </Card>;
};
export default HospitalEntryComp;
import { HealthCheckEntry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red, yellow } from "@mui/material/colors";
import Card from '@mui/material/Card';
const HealthCheckEntryComp=({entry}:{entry:HealthCheckEntry})=>{
    console.log(entry);
  const HealthCheckRatingIcon=(entry:HealthCheckEntry)=>{
    switch(entry.healthCheckRating){
      case 0:
        return <FavoriteIcon color="success" />;
      case 1:
        return <FavoriteIcon sx={{color:yellow[500]}} />;
      case 2:
        return <FavoriteIcon sx={{color:red[500]}} />;
      case 3:
        return <HeartBrokenIcon sx={{color:red[500]}} />;
    }
  };
return<Card variant="outlined" sx={{borderWidth:'2px',borderColor:'black',margin:'4px'}}>
        <div>{entry.date} <MedicalInformationIcon /></div>
        <div><i>{entry.description}</i></div>
        {HealthCheckRatingIcon(entry)}
        <div>diagnose by {entry.specialist}</div>
      </Card>;
};
export default HealthCheckEntryComp;
import { useState } from "react"
import {createDiaries} from '../services/diaryServices'

const EntryForm=()=>{
  // const [newDiary,setNewDiary]=useState<NewDiary>()
  const [date,setDate]=useState('')
  const [visibility,setVisibility]=useState('')
  const [weather,setWeather]=useState('')
  const [comment,setComment]=useState('')
    const diaryCreation = (event: React.SyntheticEvent) => {
      event.preventDefault()
      const diaryToAdd = {
        date,
        visibility,
        weather,
        comment
      }
      try{
      createDiaries(diaryToAdd)
      setComment('')
    setVisibility('')
  setDate('')
setComment('')}catch(error){
  console.log(error)
}
      // setNewDiary({
      //   date,
      //   visibility,
      //   weather,
      //   comment
      // });
      // setNewDiary()
    };
return(
<div>
  <form onSubmit={diaryCreation}>
    <div>
  date
  <input value={date} onChange={event=>setDate(event.target.value)}/>
  </div>
  <div>
  visibility
  <input value={visibility} onChange={event=>setVisibility(event.target.value)}/>
  </div>
  <div>
  weather
  <input value={weather} onChange={event=>setWeather(event.target.value)}/>
  </div>
  <div>
  comment
  <input value={comment} onChange={event=>setComment(event.target.value)}/>
  </div>
  <button type='submit'>submit</button>
  </form>
</div>)
}
export default EntryForm
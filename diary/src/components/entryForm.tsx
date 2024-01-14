import { useState } from "react"
import {createDiaries} from '../services/diaryServices'

const EntryForm=()=>{
  // const [newDiary,setNewDiary]=useState<NewDiary>()
  const [date,setDate]=useState('')
  const [visibility,setVisibility]=useState('')
  const [weather,setWeather]=useState('')
  const [comment,setComment]=useState('')
  const [error,setError]=useState('')
    const diaryCreation =async (event: React.SyntheticEvent) => {
      event.preventDefault()
      const diaryToAdd = {
        date,
        visibility,
        weather,
        comment
      }
      try{
      const response=await createDiaries(diaryToAdd)
      console.log(response)
      if(response.error){
        throw(response.error)
      }
      setWeather('')
      setComment('')
    setVisibility('')
  setDate('')
setComment('')}catch(error){
  console.log(error)
  setError(error.data)
  setTimeout(()=>{
    setError('')
  },5000)
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
  <div style={{color:'red'}}>{error?error:null}</div>
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
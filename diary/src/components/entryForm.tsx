import { useState } from "react"
import {createDiaries} from '../services/diaryServices'
import { Diary, NewDiary, Visibility, Weather } from "../types"
import React from "react";
interface EntryFormProps{
  diaries:Diary[];
  setDiaries:React.Dispatch<React.SetStateAction<Diary[]>>;
  
}
const EntryForm=(props:EntryFormProps)=>{
  const {  diaries,  setDiaries}=props
  // const [newDiary,setNewDiary]=useState<NewDiary>()
  const [date,setDate]=useState('')
  const [visibility,setVisibility]=useState<Visibility>('null' as Visibility)
  const [weather,setWeather]=useState<Weather>('null' as Weather)
  const [comment,setComment]=useState('')

    const diaryCreation =async (event: React.SyntheticEvent) => {
      event.preventDefault()
      const diaryToAdd:NewDiary = {
        date,
        visibility,
        weather,
        comment
      }
   
      const response=await createDiaries(diaryToAdd)
      console.log(response)
      setWeather('null' as Weather)
      setComment('')
    setVisibility('null' as Visibility)
  setDate('')
setComment('')
const newDiaries=diaries.concat(response as Diary)
  setDiaries(newDiaries)


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
  <input type='date' value={date} onChange={event=>setDate(event.target.value)}/>
  </div>
  <div>
  visibility
  <input type='radio' id="visibilityChioce1" value='poor' onChange={event=>setVisibility(event.target.value as Visibility)}/>
  <label htmlFor="visibilityChioce1">poor</label>
  <input type='radio' id="visibilityChioce2" value='ok' onChange={event=>setVisibility(event.target.value as Visibility)}/>
  <label htmlFor="visibilityChioce2">ok</label>
  <input type='radio' id="visibilityChioce3" value='good' onChange={event=>setVisibility(event.target.value as Visibility)}/>
  <label htmlFor="visibilityChioce3">good</label>
  <input type='radio' id="visibilityChioce4" value='great' onChange={event=>setVisibility(event.target.value as Visibility)}/>
  <label htmlFor="visibilityChioce4">great</label>
  </div>
  <div>
  weather
  <input type='radio' id="weatherChioce1" value='sunny' onChange={event=>setWeather(event.target.value as Weather)}/>
  <label htmlFor="weatherChioce1">sunny</label>
  <input type='radio' id="weatherChioce2" value='rainy' onChange={event=>setWeather(event.target.value as Weather)}/>
  <label htmlFor="weatherChioce2">rainy</label>
  <input type='radio' id="weatherChioce3" value='cloudy' onChange={event=>setWeather(event.target.value as Weather)}/>
  <label htmlFor="weatherChioce3">cloudy</label>
  <input type='radio' id="weatherChioce4" value='stormy' onChange={event=>setWeather(event.target.value as Weather)}/>
  <label htmlFor="weatherChioce4">stormy</label>
  <input type='radio' id="weatherChioce5" value='windy' onChange={event=>setWeather(event.target.value as Weather)}/>
  <label htmlFor="weatherChioce5">windy</label>
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
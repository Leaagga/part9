import { useState } from "react"
import {createDiaries} from '../services/diaryServices'
import { Diary } from "../types"
 
import React from "react";
interface EntryFormProps{
  diaries:Diary;
  setDiaries:React.Dispatch<React.SetStateAction<Diary[]>>;
  
}
const EntryForm=(props:EntryFormProps)=>{
  const {  diaries,  setDiaries}=props
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
setComment('')
const newDiaries=diaries.concat(response)
  setDiaries(newDiaries)}catch(error){
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
  <input type='date' value={date} onChange={event=>setDate(event.target.value)}/>
  </div>
  <div>
  visibility
  <input type='radio' id="visibilityChioce1" value='poor' onChange={event=>setVisibility(event.target.value)}/>
  <label htmlFor="visibilityChioce1">poor</label>
  <input type='radio' id="visibilityChioce2" value='ok' onChange={event=>setVisibility(event.target.value)}/>
  <label htmlFor="visibilityChioce2">ok</label>
  <input type='radio' id="visibilityChioce3" value='good' onChange={event=>setVisibility(event.target.value)}/>
  <label htmlFor="visibilityChioce3">good</label>
  <input type='radio' id="visibilityChioce4" value='great' onChange={event=>setVisibility(event.target.value)}/>
  <label htmlFor="visibilityChioce4">great</label>
  </div>
  <div>
  weather
  <input type='radio' id="weatherChioce1" value='sunny' onChange={event=>setWeather(event.target.value)}/>
  <label htmlFor="weatherChioce1">sunny</label>
  <input type='radio' id="weatherChioce2" value='rainy' onChange={event=>setWeather(event.target.value)}/>
  <label htmlFor="weatherChioce2">rainy</label>
  <input type='radio' id="weatherChioce3" value='cloudy' onChange={event=>setWeather(event.target.value)}/>
  <label htmlFor="weatherChioce3">cloudy</label>
  <input type='radio' id="weatherChioce4" value='stormy' onChange={event=>setWeather(event.target.value)}/>
  <label htmlFor="weatherChioce4">stormy</label>
  <input type='radio' id="weatherChioce5" value='windy' onChange={event=>setWeather(event.target.value)}/>
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
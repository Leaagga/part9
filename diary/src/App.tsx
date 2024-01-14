import { useEffect, useState } from 'react'
import { Diary } from './types'
import {getAllDiaries} from './services/diaryServices'
import DiaryEntry from './components/diaryEntry'
import EntryForm from './components/entryForm' 
function App() {
const [diaries,setDiaries]=useState<Diary[]>([])
useEffect(()=>{
  getAllDiaries().then(data=>{
    setDiaries(data)
  })
  
},[])
  return (<div>
    <h2>Add new entry</h2>
    <EntryForm />
    <h2>Diary entries</h2>
    <div>
    {diaries.map(diary=><DiaryEntry diary={diary}/>)}
    </div></div>
  )
}

export default App

import { useEffect, useState } from 'react'
import { Diary } from './types'
import {getAllDiaries} from './services/diaryServices'
import DiaryEntry from './components/diaryEntry'
function App() {
const [diaries,setDiaries]=useState<Diary[]>([])
useEffect(()=>{
  getAllDiaries().then(data=>{
    setDiaries(data)
  })
  
})
  return (<div>
    <h2>Diary entries</h2>
    <div>
    {diaries.map(diary=><DiaryEntry diary={diary}/>)}
    </div></div>
  )
}

export default App

import { Diary } from "../types"

const DiaryEntry=({diary}:{diary:Diary})=>{

return(
<div key={diary.id}>
  <p><b>{diary.date}</b></p>
  <p>visibility: {diary.visibility}</p>
  <p>weather: {diary.weather}</p>
  {/* <p>comment: {diary.comment}</p> */}
  </div>)
}
export default DiaryEntry
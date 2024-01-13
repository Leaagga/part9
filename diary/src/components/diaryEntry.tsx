import { Diary } from "../types"

const DiaryEntry=({diary}:{diary:Diary})=>{

return(
<div>
  <p><b>{diary.date}</b></p>
  <p>visibility: {diary.visibility}</p>
  <p>waether: {diary.weather}</p>
  {/* <p>comment: {diary.comment}</p> */}
  </div>)
}
export default DiaryEntry
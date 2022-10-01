import React,{useEffect,useState} from 'react'
import "./chatStyles.css"
import axios from "axios"
import { Paper } from '@mui/material'
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Chatbox() {
    const [inbox,setInbox] = useState([])
    useEffect(()=>{
      axios.get("https://aircall-job.herokuapp.com/activities")
      .then((res=>{
          
          setInbox(res.data)
      }))
    },[])

    const time=(d)=>{
        const date=new Date(d)
        const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        const  am_pm = date.getHours() >= 12 ? " PM" : "AM";
        const minutes = date.getMinutes()
        const t = `${hours}:${minutes} ${am_pm}`
        return t

    }

    const getDate=(d)=>{
        const date = new Date(d);
        const month = date.getMonth()+1;
        const newDate= date.getDate()
        const year = date.getFullYear()
        let m
        switch(month){
            case 1:{
              m="Jan"
              return `${m} , ${newDate} ${year}`
            }
            case 2:{
                m="Feb"
                return `${m} , ${newDate} ${year}`
              }
              case 3:{
                m="March"
                return `${m} , ${newDate} ${year}`
              }
              case 4:{
                 m="Apr"
                 return `${m} , ${newDate} ${year}`
              }
              case 5:{
                m="May"
                return `${m} , ${newDate} ${year}`
              }
              case 6:{
                m="Jun"
                return `${m} , ${newDate} ${year}`
              }
              case 7:{
                m="Jul"
                return `${m} , ${newDate} ${year}`
              }
              case 8:{
                m="Aug"
                return `${m} , ${newDate} ${year}`
              }
              case 9:{
                m="Sep"
                return `${m} , ${newDate} ${year}`
              }
              case 10:{
                m="Oct"
                return `${m} , ${newDate} ${year}`
              }
              case 11:{
                m="Nov"
                return `${m} , ${newDate} ${year}`
              }
              case 12:{
                m="Dec"
                return `${m} , ${newDate} ${year}`
              }
              default:{
                return ""
              }

        }
        

    }
    const archiveCall=(id)=>{
        axios.post(`https://aircall-job.herokuapp.com/activities/${id}`,{
                is_archived: true       
        }).then(res=>{
            const unarchive = inbox.filter((f)=>(f.id!==res.data.id))
            setInbox(unarchive)
        })

    }
  return (
    
        <Paper elevation={3} className="chatbox-container" sx={{backgroundColor:"#fcfcfc"}}>
        <div className="chat-header">
            <div className="activity">
                <WhatsAppIcon sx={{color:"green",marginRight:"2px"}}/>
                <span>Activity</span>
            </div>
            <div style={{margin:"20px"}}>
            <span>Inbox</span>
            <hr style={{borderTop: "3px solid red",position:"absolute",bottom:"-28px",width:"100%"}}></hr>
            </div>
            <div style={{margin:"20px"}}>All Calls</div>
        </div>

       { inbox.length&&inbox.map((box,i)=>{
          return <div>
              <div style={{display:"flex",margin:"5px"}}>
              <hr style={{width:"150px",borderTop: "1px dashed lightgray"}}></hr> 
              <span style={{fontSize:"small",color:"lightgray"}}>{getDate(box.created_at)}</span>
              <hr style={{width:"150px",borderTop: "1px dashed lightgray"}}></hr>
              </div>
             
          <Paper  className="chats" elevation={0} sx={{borderRadius:"15px",cursor:"pointer"}} onClick={()=>{archiveCall(box.id)}}>
              <div className="inbox-detail">
              <div>
              <PhoneCallbackIcon sx={{marginRight:"5px",color:"gray",fontSize:"20px"}}/>
              </div>
              <div>
              <span style={{fontWeight:"bold"}}>{box.from}</span><br/>
              <span style={{color:"gray"}}>tried to call on {box.via}</span>
              </div>
              </div>
              <div>
                  <span style={{color:"lightgray"}}>{time(box.created_at)}</span>
              </div>
          </Paper>
          </div> 
       })}
         </Paper>  
        
    
  )
}

export default Chatbox
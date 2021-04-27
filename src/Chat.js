import { Avatar,IconButton } from '@material-ui/core';
import { AttachFile,InsertEmoticon,SearchOutlined } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import React,{useState,useEffect} from 'react';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import "./Chat.css";
import {useParams} from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function Chat() {
    const [input,setinput]= useState("");
    const [seed,setSeed]=useState("");
    const { roomId }=useParams();
    const [roomname,setroomname]=useState("");
    const [messages,setmessages]=useState([]);
    const [{user},dispatch]=useStateValue();
    useEffect(()=>{
       if(roomId){
           db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
               setroomname(snapshot.data().name)
           ));
           db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
               setmessages(snapshot.docs.map(doc=>doc.data()))
           ))

       }
    },[roomId])

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[roomId]);
    const sendmessage=(e)=>{
        e.preventDefault();
        console.log("you typed>>>",input);
        
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setinput("");
    };
    return (
        <div className='chat'>
          <div className="chat_header">
               <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*5000)}.svg`}/>
              <div className="chat_headerinfo">
                        <h3>{roomname}</h3>
                       <p>
                           last seen{" "}
                           {new Date(
                               messages[messages.length-1]?.timestamp?.toDate()
                           ).toUTCString()}
                       </p>
                      </div>
                      <div className="chat_headerright">
                    <IconButton>
                    <SearchOutlined/>
                    </IconButton>
                       <IconButton>
                       <AttachFile/>
                       </IconButton>
                        <IconButton>
                         <MoreVert/>
                            </IconButton>
           </div>
        </div>
        <div className="chat_body">
         {messages.map(message=>(
            <p className={`chat_message ${message.name===user.displayName &&
            'chat_reciever'}`}>
          <span className="chat_name">{message.name}</span> 
          {message.message}
          <span className="chat_timestamp">
             {new Date(message.timestamp?.toDate()).toUTCString()}
          </span>
          </p>   
         ))}
             
        </div>
        <div className="chat_footer">
          <InsertEmoticonIcon/>
          <form>
              <input value={input} onChange={e=>setinput(e.target.value)} 
              placeholder="Type a message" type="text"/>
              <button onClick={sendmessage} type="submit">send a message</button>
          </form>
           <MicIcon/>
        </div>
            
        </div>
    )
}

export default Chat

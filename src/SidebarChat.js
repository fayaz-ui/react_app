import React,{useState,useEffect} from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import db from './firebase';
import {Link } from "react-router-dom";

function SidebarChat({id, name, addnewchat}) {
    const [seed,setSeed]= useState("");
    const [messages, setmessages]=useState("");

    useEffect(()=>{
       
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((Snapshot)=>(
                setmessages(Snapshot.docs.map((doc)=>doc.data()))
            ))
        }

    },[id])

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);

    const createchat=() => {
        const roomname=prompt("please enter name for chat");
        if(roomname){
            //do some clever stuff..
            db.collection('rooms').add({
                name: roomname,
            })
        }
    };

    return !addnewchat ?(
        <Link to={`/rooms/${id}`}>
        <div className="sidebarchat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarchat_info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):
    (
        <div onClick={createchat}
        className="sidebarchat">
            <h2>
                Add new chat
            </h2>
        </div>
    );
}

export default SidebarChat

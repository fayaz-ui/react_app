import React from 'react';
import {button} from "@material-ui/core";
import "./Login.css";
import {auth, provider} from "./firebase";
import { actionTypes } from './Reducer';
import { useStateValue } from "./StateProvider";

function Login() {

    const [{}, dispatch]= useStateValue();

    const signin=()=>{
       auth
            .signInWithPopup(provider)
            .then((result)=>{
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error)=>alert(error.message));
    };


    return (
        <div className="login">
         <div className="login_container">
             <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/>
             <div className="login_text">
                 <h1>Sign in to WhatsApp</h1>
                 <p>hey there !! you are about to entering world's first open chatting Web App</p>
                 <p>feel free to Login</p>
             </div>
             <button onClick={signin}>Sign in with Google</button>
             <p>&copy; 1999-2021 by @fayazansari_, All rights reserved.</p>
         </div>
            
        </div>
    );
}

export default Login

import React,{useState} from "react";
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Route } from "react-router-dom";
import {BrowserRouter as Router } from "react-router-dom";
import {Switch } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import {user} from "./Login";
function App() {
  const [{ user }, dispatch] = useStateValue();
 return (
      <div className="App">
      {!user ?(
        <Login />
      ):(
        <div className="app_body">
      <Router>
      
      <Sidebar/>
      <Switch>
      <Route path="/rooms/:roomId">
      
        <Chat/>
        </Route>
        <Route path="/">
        <Chat/>
        </Route>
      </Switch>
      </Router>
      
      </div>
    
  )} 
  <div className="footeroftheapp">
      <p>&copy; 1999-2021 by @fayazansari_ All rights reserved.</p>
      </div>
  </div>
 );
}

export default App;

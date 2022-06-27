import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Account from "./Components/Pages/Account/Account";
import Friends from "./Components/Pages/Friends/Friends";
import Messages from "./Components/Pages/Messages/Messages";
import Signup from "./Components/Pages/Signup/Signup";
import Login from "./Components/Pages/Login/Login";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as utilities from "./Components/Utilities/FireStoreUtilities.js";
import React, { useState, useEffect } from "react";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBisJrkBQc6oiZj6_FViCT1H5oNtCzk-VI",
  authDomain: "chat-app-a56ef.firebaseapp.com",
  projectId: "chat-app-a56ef",
  storageBucket: "chat-app-a56ef.appspot.com",
  messagingSenderId: "852350334158",
  appId: "1:852350334158:web:b28be44fe585e9e36a8c9f",
  measurementId: "G-SQTHSLRWFW",
};

//Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Checks if current user is logged in
  async function getIsLoggedIn() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      //User is logged in
      if (user) {
        setIsLoggedIn(true);
        console.log("Logged in successfully");

        //Checks if user is in Firestore database
        utilities.getUser(user.uid).then((userExists) => {
          //If user is not in database
          if (!userExists) {
            //Adds user to Firestore database
            utilities.addUser(user.uid);
          } else {
            //User is in database so do nothing
            return;
          }
        });
      } else {
        //User is not logged in
        console.log("not logged in");
        setIsLoggedIn(false);
      }
    });
  }

  getIsLoggedIn();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

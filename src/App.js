import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Account from "./Components/Pages/Account/Account";
import Friends from "./Components/Pages/Friends/Friends";
import Messages from "./Components/Pages/Messages/Messages";
import Signup from "./Components/Pages/Signup/Signup";
import Login from "./Components/Pages/Login/Login";
import NavigationBar from "./Components/Navigation/NavigationBar";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as utilities from "./Components/Utilities/FireStoreUtilities.js";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { render } from "@testing-library/react";

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

  //Using useEffect to check if the user is logged in stops inifite loop
  useEffect(() => {
    //Checks if current user is logged in
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      //User is logged in
      if (user) {
        //Checks if user is in Firestore database
        utilities.getUser(user.uid).then((userExists) => {
          //If user is not in database
          if (!userExists) {
            //Adds user to Firestore database
            utilities.addUser(user.uid);
          }
        });
        setIsLoggedIn(true);
        console.log("User is logged in");
      } else {
        //User is not logged in
        setIsLoggedIn(false);
        console.log("User is not logged in");
      }
    });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <NavigationBar /> <Home />
          </div>
        }
      />
      <Route
        path="/account"
        element={
          <div>
            <NavigationBar /> <Account />
          </div>
        }
      />
      <Route
        path="/friends"
        element={
          <div>
            <NavigationBar /> <Friends />
          </div>
        }
      />
      <Route
        path="/messages"
        element={
          <div>
            <NavigationBar /> <Messages />
          </div>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

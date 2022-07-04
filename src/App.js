import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Account from "./Components/Pages/Account/Account";
import Signup from "./Components/Pages/Signup/Signup";
import Login from "./Components/Pages/Login/Login";
import NavigationBar from "./Components/Navigation/NavigationBar";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as utilities from "./Components/Utilities/FireStoreUtilities.js";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DetailsForm from "./Components/Pages/Signup/DetailsForm";

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
            utilities.addUser(user.uid, user.displayName);
          }
        });
        setIsLoggedIn(true);
        console.log("User is logged in");
        console.log(user.displayName);
      } else {
        //User is not logged in
        setIsLoggedIn(false);
        console.log("User is not logged in");
      }
    });
  }, []);

  const auth = getAuth();
  //If user is logged in and they haven't filled out their details, redirect to details form
  if (isLoggedIn && auth.currentUser.displayName === null) {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/**Redirect user to details page if trying to access resitricted content */}
        <Route path="/account" element={<DetailsForm />} />
        <Route path="/" element={<DetailsForm />} />
        <Route path="/details" element={<DetailsForm />} />
      </Routes>
    );
    //If user is logged in and they have filled out their details, give full url access
  } else if (isLoggedIn && auth.currentUser.displayName !== null) {
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/details"
          element={
            <div>
              <NavigationBar /> <Home />
            </div>
          }
        />
      </Routes>
    );
    //User is not logged in, only allow access to login and signup pages
  } else {
    return (
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/**Redirect user to login page if trying to access resitricted content */}
          <Route path="/account" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/details" element={<Login />} />
        </Routes>
      </div>
    );
  }
}

export default App;

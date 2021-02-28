import './App.css';
import React from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({

})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

document.addEventListener('DOMContentLoaded', function() {
  // Send a GET request to the URL
  fetch('https://api.nasa.gov/planetary/apod?api_key=RxdvkBaLfpVSPVF3Q9dYOepXvuBL3LhUeWD1eibG')
  // Put response into json form
  .then(response => response.json())
  .then(data => {
      // Log data to the console
      console.log(data);
  });
});

export default App;

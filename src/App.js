import './App.css';
import React, { useRef, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/analytics';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAtZp2SR8Nx4XT4Tv3zLZ5uO8eXme-VP4g",
  authDomain: "ah-project-7ff92.firebaseapp.com",
  projectId: "ah-project-7ff92",
  storageBucket: "ah-project-7ff92.appspot.com",
  messagingSenderId: "681373402737",
  appId: "1:681373402737:web:191835635a81b72dfabdd0",
  measurementId: "G-C2HXL0BRYW"
});

const auth = firebase.auth();
const firestore = firebase.firestore();
//const analytics = firebase.analytics();

document.addEventListener('DOMContentLoaded', function() {
  navigator.geolocation.getCurrentPosition(
    data => {
      console.log(data)
    }, 
    error => console.log(error)
  );
});

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>🔥</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Share information, request backup and Communicate!!
      </p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(50);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Message" />

      <button type="submit" disabled={!formValue}>Send</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="alsfjdka"/>
      <p>{text}</p>
    </div>
  </>)
}

// document.addEventListener('DOMContentLoaded', function() {
  // Send a GET request to the URL
  // fetch('https://api.nasa.gov/planetary/apod?api_key=RxdvkBaLfpVSPVF3Q9dYOepXvuBL3LhUeWD1eibG')
  // Put response into json form
  // .then(response => response.json())
  // .then(data => {
      // Log data to the console
      //console.log(data);
  //});
//});

export default App;

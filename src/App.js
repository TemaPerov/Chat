import "./App.css";
import { useEffect, useState, useContext, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Chat from "./containers/Chat";

firebase.initializeApp({
  apiKey: "AIzaSyDjIqIghYyE1VnwQQ4AQxQHnZd3T_CGF6g",
  authDomain: "chat-503a6.firebaseapp.com",
  databaseURL: "https://chat-503a6-default-rtdb.firebaseio.com",
  projectId: "chat-503a6",
  storageBucket: "chat-503a6.appspot.com",
  messagingSenderId: "617378192496",
  appId: "1:617378192496:web:d09cc4886d25fe7ed9e8b5",
  measurementId: "G-SS2KYCR2ZR",
});

const auth = firebase.auth();
const db = firebase.firestore();

export const Context = createContext(null);


function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (<div className='louderBox'>
      <p className="pLouder">Loading...</p>
      </div>
    )
 
  }
  return (
    <div className="App">
      <Context.Provider
        value={{
          firebase,
          auth,
          db,
          user,
        }}
      >
      
          <Chat />
    
      </Context.Provider>
    </div>
  );
}
export default App;

// const SignIn = () => {
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   };
//   return <button onClick={signInWithGoogle}>Sign in with Google</button>;
// };

// const SignOut = () => {
//   return auth.currentUser && (<button onClick={() => auth.signOut()}>Sign Out</button>
//   );
// };

// const ChatRoom = () => {
//   const messagesRef = db.collection("messages");
// const mess = db
//   .collection("messeges")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//     });
//   });

//   const query = messagesRef.orderBy("createAt").limit(25);

//   const [messages] = useCollectionData(query, { idField: "id" });
//   const [formValue, setFormValue] = useState("");

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     console.log(e)
//     const { uid, photoUrl } = auth.currentUser;

//     await messagesRef.add({
//       text: formValue,
//       createAt: firebase.firestore.FieldValue.serverTimestamp(),
//       // uid,
//       // photoUrl,
//     });
//     setFormValue("");
//   };

//   return (
//     <>
//       <div>
//         Chat rooom
//         {messages &&
//           messages.map((msg) => (
//             <ChatMessage key={msg.id} message={msg.text} />
//           ))}
//       </div>
//       <form onSubmit={sendMessage}>
//         <input
//           value={formValue}
//           onChange={(e) => setFormValue(e.target.value)}
//         />

//         <button type="submit">send</button>
//       </form>
//     </>
//   );
// };

// const ChatMessage = ({ message, uid, photoUrl }) => {
//   // const  {test, uid}  = props;
//   // console.log(test)
//   const messageClass = (uid = auth.currentUser.uid ? "sent" : "received");
//   return (
//     <div className={`message${messageClass}`}>
//       <img src={photoUrl} />
//       <p>{message}</p>
//     </div>
//   );
// };

// function App(){
//   const [user,setUser]=useState(()=>auth.currentUser)
//   const [initializing,setIninitializing]=useState(true)

//  useEffect(()=>{
//    const unsubscribe = auth.onAuthStateChanged(user=>{
//      if(user){
//        setUser(user);
//      }else{
//        setUser(null)
//      }
//      if(initializing){
//       setIninitializing(false)
//      }
//    })
//    return unsubscribe
//  },[])

// const signInWithGoogle = async()=>{
//   const provider =new firebase.auth.GoogleAuthProvider();
//   auth.useDeviceLanguage()
//   try{
//     await auth.signInWithPopup(provider);
//   }catch(error){
//     console.log(error)
//   }
// }
// const sighnOut=async()=>{
//  try{
//    await firebase.auth().signOut();
//  }catch(error){
//    console.log(error)
//  }
// }
// if(initializing)return "Loading...";
// return(
//   <div>
//     {user ? (
//       <>
//       <button onClick={sighnOut}>Sign out</button>
//       <p>Welcome to chat</p>
//       <Chanal user={user} db ={db}/>
//       </>
//       ):(
//        <button onClick={signInWithGoogle}>Sign in with Google</button>
//     )}

//   </div>
// )
// }

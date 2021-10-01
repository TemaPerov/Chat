import styles from "./Chat.module.css";
import firebase from "firebase/compat/app";
import ChatRoom from "../componets/ChatRoom";
import List from "../componets/List";
import { useContext } from "react";
import { Context } from "../App";

const Chat = () => {
  const { auth, db, user } = useContext(Context);
  const login = async ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    const user = await auth.signInWithPopup(provider);
  }

  return (
    <>
      <div className={styles.container}>
        {user ? (
          <>
            <List/>
            <ChatRoom auth={auth} db={db} />
          </>
        ) : (
          <button className={styles.button} onClick={login}>
          Sign in with Google
        </button>
        )}
      </div>
    </>
  );
};

export default Chat;

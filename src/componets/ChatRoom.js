import styles from "./ChatRoom.module.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import { useState, useContext, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import sendIcon from "../img/send.png";
import { Context } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { getDataThunk, getDataTextAction,getLastMess,removeLastMessAction} from "../store/action";
import man from '../img/man.png'

import axios from "axios";

const ChatRoom = (name) => {
  const messageRef = useRef();
  const dispatch = useDispatch();
  const { auth, db, user } = useContext(Context);
  const [message, setMessage] = useState();
  const nameCollect = useSelector((store) => store.nameOfColection);
  const dataValue = useSelector((store) => store.dataValue);
  const nameList = useSelector(store=>store.names)
  // const nameOfDilog = localStorage.getItem("nameCollection")

  const nameColFunk = () => {
    if (nameCollect) {
   
      localStorage.setItem("nameCollection", JSON.stringify(nameCollect));
      return nameCollect.name;
    } else {
      return "null";
    }
  };
  const messagesRef = db.collection(nameColFunk());
  const query = messagesRef.orderBy("createAt");
  const [messages, louding] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const [writing, setWriting] = useState();

  useEffect(() => {
    if (dataValue) {
      setTimeout(() => {
        console.log(nameCollect.uid)
        messagesRef.add({
          text: dataValue,
          createAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid: nameCollect.uid,
          photoUrl: nameCollect.img,
        });
       
        setWriting(false);
        dispatch(getDataTextAction(false));
      }, 5000);
    }
  }, [dataValue]);

  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({ block: "end" });
  };

  const sendMessage = async (e) => {
    if(formValue.trim()){ 
 
    e.preventDefault();
    await messagesRef.add({
      text: formValue.trim(),
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
      photoUrl: user.photoURL,
    });
 
    setFormValue("");
    setWriting(true);
    dispatch(getDataThunk());
  }
  };
  const [nameWrit, setNameWrit] = useState();

  const nameWriting = () => {
    if (nameCollect.name) {
      const c = nameCollect.name.split(" ");
      setNameWrit(c[0]);
   
    }
  };
  useEffect(() => {
    nameWriting();  
    if (messageRef.current) {
      scrollToBottom();
    }
 
  }, [messages, writing]);

  useEffect(()=>{ 
      dispatch(getLastMess(db,nameList))    
  },[writing])
useEffect(()=>{
setWriting(false)
},[nameWrit])
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleName}>
          <div className={styles.headrName}>
           <img
              className={styles.iconImg}
              src={nameCollect.img ? nameCollect.img : man}
              alt="photos"
            />
            <p>{nameCollect.name}</p>
          </div>
          <button className={styles.button} onClick={() => auth.signOut()}>
            Sign Out
          </button>
        </div>

        <div className={styles.messageBox}>
          {louding ? (
            <div className="louderBox">
            <p>Louding...</p>
            </div>
          ) : (
            messages && messages.map((msg) => (
              <div
                key={msg.id}
                ref={messageRef}
                className={styles.scrollMessageBox}
              >
                {msg && <ChatMessage msg={msg} auth={auth} user={user} />}
              </div>
            ))
          )}
         
        </div>

        <div className={styles.inputBox}>
        {writing && (
            <p className={styles.writing}>{nameWrit} is writing...</p>
          )}
          <form onSubmit={sendMessage} className={styles.inputBoxWithButton}>
         
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Type your messager"
            />
            <span className={styles.buttonBox}>
              <img src={sendIcon} alt="send" onClick={sendMessage} />
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;

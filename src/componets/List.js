import styles from "./List.module.css";
import { Context } from "../App";
import { useState, useContext, useEffect,useRef} from "react";
import search from '../img/search.png'
import {sendCollectionName,getLastMess, filterListAction} from "../store/action"
import { useDispatch,useSelector } from "react-redux";
import { useCollectionData } from "react-firebase-hooks/firestore";
const List = () => {
const { auth, db, user } = useContext(Context);

const dispatch = useDispatch()
const lastMess = useSelector(store=>store.lastMess)
const lastTimeMess = useSelector(store=>store.lastTimeMess)
const nameList = useSelector(store=>store.names)
const filterList = useSelector(store=>store.filterList)
const [elSerch,setElSearch]=useState('')

  const SendName =(name,img,uid)=>{
    const obj ={
      name:name,
      img:img,
      uid:uid
    }

    dispatch(sendCollectionName(obj))
    setElSearch('')
    searchContact('')
  }
  useEffect(()=>{

    dispatch(filterListAction(nameList))
    const nameOfDilog = localStorage.getItem("nameCollection")
    const parseString = JSON.parse(nameOfDilog)
 
    if(parseString){
    
      SendName(parseString.name,parseString.img,parseString.uid)
    }
  },[])

const timeFunk = (uid) => {
  let c = lastMess.filter((el,i)=>el.uid == uid).map(el=>el.createAt)
  if(c[0]){
    const options = {  year: 'numeric', month: 'short', day: 'numeric' };
    const timeOfMess = new Date(c[0].seconds * 1000);
    const dateOfMess = `${timeOfMess
      .toLocaleString("en-US", options)
      .replace(/:\d+ /, " ")}`;
    return <p>{dateOfMess}</p>;
  }

};


const searchContact=(e)=>{
  setElSearch(e)
  const filterList = nameList.filter(el=>{
    return el.name.toLowerCase().includes(e.toLowerCase())
  })
dispatch(filterListAction(filterList))
}
const filterText=(uid)=>{
  let c = lastMess.filter((el,i)=>el.uid == uid).map(el=>el.text)
 return <p className={styles.lastMass}>{c}</p>
}
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
        <div className={styles.imgBox}>
          <img className={styles.iconImg} src={user.photoURL} alt="photos" />
          <p className={styles.headerName}>{user.displayName}</p>
          </div>
          <div className={styles.searceBox}>
            <img src={search}  alt="search"/>
            <input type='text' placeholder="Search" value={elSerch} onChange={(e)=>searchContact(e.target.value)}/>
          </div>
        </div>
        <div className={styles.listBox}>
          {filterList && filterList.map((el, i) => (
            <div key={i} className={styles.boxWithName} onClick={()=>SendName(el.name, el.img,el.uid)} >
              <div className={styles.imgBox}>
                <img className={styles.iconImg} src={el.img} alt={el.name} />
              </div>

              <div className={styles.name}>
                <p className={styles.pName}>{el.name}</p>
                {/* <p className={styles.lastMass}>{lastMess.uid == el.uid ? lastMess.text: 'no messages' }</p> */}
                {filterText(el.uid)}
              </div>
              <div className={styles.lastTime}>
              {timeFunk(el.uid)}
            
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;

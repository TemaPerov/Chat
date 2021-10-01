import { GET_NAME_COLECTION, GET_DATA_VALUE, LAST_MESS,REMOVE_LAST_MESS,FILTER_LIST } from "./constants";
import { getData } from "./../network/network";

export function sendCollectionName(state) {
  return { type: GET_NAME_COLECTION, state };
}
export function filterListAction(data) {
  return { type: FILTER_LIST, data };
}

export function getDataTextAction(data) {
  return { type: GET_DATA_VALUE, data };
}

export function getDataThunk() {
  return async (dispatch) => {
    try {
      const data = await getData();
      console.log(data.value);
      dispatch(getDataTextAction(data.value));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLastMessAction(data,time) {
  return { type: LAST_MESS, data,time };
}
export function removeLastMessAction(data,time) {
  return { type: REMOVE_LAST_MESS, data,time };
}

export function getLastMess(db, arr) {
  return async (dispatch) => {
 dispatch(removeLastMessAction([],[]))
    for (let i = 0; i < arr.length; i++) { 
      let lastMes
      let time
      db.collection(arr[i].name)
        .orderBy("createAt").limitToLast(1)
        .get()
        .then((snapshot) => {         
          snapshot.docs.forEach((doc) => {           
            lastMes = doc.data()           
            // time = doc.data().createAt;
          });   
          
          dispatch(getLastMessAction(lastMes))
        });
   
       
    }
  };
}

import { GET_NAME_COLECTION, GET_DATA_VALUE, LAST_MESS,REMOVE_LAST_MESS,FILTER_LIST } from "./constants";

const initialState = {
 
  nameOfColection: false,
  dataValue: false,
  lastMess: [],
  lastTimeMess: [],
  names: [
    { 
      uid: "1",
      name: "Jackie Chan",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Jackie_Chan_by_Gage_Skidmore.jpg/240px-Jackie_Chan_by_Gage_Skidmore.jpg",
    },
    {
      uid: "2",
      name: "Chack Noris",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chuck_Norris_May_2015.jpg/250px-Chuck_Norris_May_2015.jpg",
    },
    {
      uid: "3",
      name: "Bruce Lee",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bruce_Lee_1973.jpg/250px-Bruce_Lee_1973.jpg",
    },
    {
      uid: "5",
      name: "Sylvester Stallone",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Sylvester_Stallone_Cannes_2019.jpg/220px-Sylvester_Stallone_Cannes_2019.jpg",
    },
    {
      uid: "6",
      name: "Arnold Schwarzenegger",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Arnold_Schwarzenegger_by_Gage_Skidmore_3.jpg/250px-Arnold_Schwarzenegger_by_Gage_Skidmore_3.jpg",
    },
    {
      uid: "7",
      name: "Петро Бампер",
      img: "https://actual.today/wp-content/uploads/2019/07/E1FDCE56-D955-44A9-950D-970C7EA83AC8.jpeg",
    },
    {
      uid: "8Angelina",
      name: "Angelina Jolie",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Angelina_Jolie_2_June_2014_%28cropped%29.jpg/250px-Angelina_Jolie_2_June_2014_%28cropped%29.jpg",
    },
  ],
  filterList: null,
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case GET_NAME_COLECTION:
      return {
        ...state,
        nameOfColection: action.state,
      };
    case GET_DATA_VALUE:
      return {
        ...state,
        dataValue: action.data,
      };
    case LAST_MESS:
      return {
        ...state,
        lastMess: [...state.lastMess, action.data],
      };
    case REMOVE_LAST_MESS:
      return {
        ...state,
        lastMess: action.data,
        lastTimeMess: action.time,
      };
    case FILTER_LIST:
      return {
        ...state,
        filterList: action.data,
        
      };

    default:
      return state;
  }
}

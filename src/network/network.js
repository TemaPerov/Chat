import axios from "axios";

const url ='https://api.chucknorris.io/jokes/random'
 export const getData = async () => {
    const data = await axios.get(url)   
    return data.data;
  };
import axios from 'axios';
import { createContext, useState } from 'react';


export const AuthContext = createContext();
const url = "https://13134.fullstack.clarusway.com/"

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('username') || false)
  let keys = sessionStorage.getItem('token')
  const [myKey, setMyKey] = useState(keys&&window.atob(keys));

  const createUser = async (userInfo) => {
    try{
      const res = await axios.post(`${url}account/register`, userInfo);
      if(res.data.token){
        console.log(res)
        setMyKey(res.data.token);
        setCurrentUser(res.data.username);
        sessionStorage.setItem('username', res.data.username);
        const myToken = window.btoa(res.data.token);
        sessionStorage.setItem('token', myToken)
      }
    } catch(err){

    }
  }
}
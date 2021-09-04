import {createContext} from 'react';

export const AuthContext=createContext({
  isLoggedIn:false,
  userId:null,
  email:null,
  name:null,
  token:null,
  login:()=>{},
  logout:()=>{},
});
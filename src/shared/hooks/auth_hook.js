import {useState,useCallback,useEffect} from 'react';

let logoutTimer;
export const useAuth = () => {
  const [token,setToken]=useState(false);
  const [userId,setUserId]=useState(false);
  const [email,setEmail]=useState(false);
  const [name,setName]=useState(false);
  const [tokenExpirationDate,setTokenExpirationDate]=useState();

  const login=useCallback((token,email,name,uid,expirationDate)=>{
    console.log(token,email,name);
    setToken(token);
    setUserId(uid);
    setEmail(email);
    setName(name);
    const tokenExpireDate=expirationDate || new Date(new Date().getTime()+1000*60*60);
    setTokenExpirationDate(tokenExpireDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId:uid,
        token:token,
        email:email,
        name:name,
        expiration:tokenExpireDate.toISOString(),
      })
    );
  }, []);


  const logout=useCallback(()=>{
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setEmail(null);
    setName(null);
    localStorage.removeItem("userData");
  },[]);

  useEffect(() => {
    if((token,tokenExpirationDate)){
      const remainedTime=tokenExpirationDate.getTime()-new Date().getTime();
      console.log(remainedTime,tokenExpirationDate.getTime());
      logoutTimer=setTimeout(logout,remainedTime);
    }else{
      clearTimeout(logoutTimer);
    }
  }, [token,logout,tokenExpirationDate]);


  useEffect(() => {
    const storedData=JSON.parse(localStorage.getItem("userData"));
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(
        storedData.token,
        storedData.email,
        storedData.name,
        storedData.userId,
        new Date(storedData.expiration)
      );
    }
  },[login]);
  return {token,login,logout,email,name,userId};
};

import Navbar from "./Navbar"
import { Outlet, useNavigate } from 'react-router';
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";


const Body = () => {
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user)
console.log(userData)
  const fetchUser = async() => {
    try { 
    if(!userData){
      return
    };
    const res = await axios.get(BASE_URL+"/profile", {
      withCredentials: true,
    });
    console.log(res.data)
    dispatch(addUser(res.data))
  } catch(err) {
    navigate("/login");
    console.err(err);
  };
}; 

useEffect(() => {
  fetchUser();
}, []);

  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import BottomNav from "../BottomNav/BottomNav";
import Analyzis from "../Analyzis/Analyzis";
import AnalyzisSearch from "../AnalyzisSearch/AnalyzisSearch";
import './Main.css'
import AnalyzisCalendar from "../AnalyzisCalendar/AnalyzisCalendar";
import Transactions from "../Transactions/Transactions";
import Categories from "../Categories/Categories";
import Profile from "../Profile/Profile";
import EditProfile from "../EditProfile/EditProfile";
import Setting from "../Setting/Setting";
import Help from "../Help/Help";
import {  useAppSelector } from "../../hook";
import ShortPopUp from "../ShortPopUp/ShortPopUp";
import BigPopUp from "../BigPopUp/BigPopUp";
import db from '../../../db.json'
import { useEffect } from "react";
import Notification from "../Notification/Notification";
interface MainProps {
  onLogout: () => void;
}

export default function Main({ onLogout }: MainProps) {


  useEffect(()=>{
    db.users.forEach(i=>{
      if(localStorage.getItem('user')==i.name){
        localStorage.setItem('userId',i.id.toString())
      }
    })
  },[])
 
  const update=useAppSelector(state=>state.finance.boolUpdateProfile)
  const add=useAppSelector(state=>state.finance.boolAddExpense)
  const newPass=useAppSelector(state=>state.finance.boolPass)
  const deleter=useAppSelector(state=>state.finance.boolDelete)
  const logout=useAppSelector(state=>state.finance.boolLogOut)
  return (
      <>
      <div className="main">
        <div className="content">
        <button onClick={onLogout}>Выйти</button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyzis" element={<Analyzis />} />
          <Route path="/analyzis-search" element={<AnalyzisSearch />} />
          <Route path="/analyzis-calendar" element={<AnalyzisCalendar />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/help" element={<Help />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
        </div>
        {update==true ?<ShortPopUp text="Profile was updated!"></ShortPopUp>:""}
        {add==true ?<ShortPopUp text="Operation was added!"></ShortPopUp>:""}
        {newPass==true ?<ShortPopUp text="Password was updated!"></ShortPopUp>:""}

        {logout==true? <BigPopUp textButton="Yes, end session" textTitle="End Session" textMain="Are you sure you want to log out?" textOne=""></BigPopUp>:""}
        {deleter==true? <BigPopUp textButton="Yes, Delete Account" textTitle="Delete Account" textMain="By deleting your account, you agree that you understand the consequences of this action and that you agree to permanently delete your account and all associated data. " textOne="Are you sure you want to log out?"></BigPopUp>:""}
        <BottomNav></BottomNav>
      </div>
      
      
      
      </>
  );
}
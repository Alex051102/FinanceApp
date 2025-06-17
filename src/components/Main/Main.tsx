import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import BottomNav from "../BottomNav/BottomNav";
import Analyzis from "../Analyzis/Analyzis";
import AnalyzisSearch from "../AnalyzisSearch/AnalyzisSearch";
import './Main.css'
import AnalyzisCalendar from "../AnalyzisCalendar/AnalyzisCalendar";
import Transactions from "../Transactions/Transactions";
import Categories from "../Categories/Categories";
interface MainProps {
  onLogout: () => void;
}

export default function Main({ onLogout }: MainProps) {
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
        </Routes>
        </div>
        <BottomNav></BottomNav>
      </div>
      
      
      
      </>
  );
}
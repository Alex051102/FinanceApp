import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import BottomNav from "../BottomNav/BottomNav";
import Analyzis from "../Analyzis/Analyzis";
import AnalyzisSearch from "../AnalyzisSearch/AnalyzisSearch";

interface MainProps {
  onLogout: () => void;
}

export default function Main({ onLogout }: MainProps) {
  return (
      <>
      <button onClick={onLogout}>Выйти</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzis" element={<Analyzis />} />
        <Route path="/analyzis-search" element={<AnalyzisSearch />} />
      </Routes>
      <BottomNav></BottomNav>
      </>
  );
}
import { useEffect, useState } from 'react'


import './App.css'
import Auth from './components/Auth/Auth'
import Main from './components/Main/Main'
import { useAppSelector } from './hook';

function App() {
  
  const [isAuth, setIsAuth] = useState(localStorage.getItem('auth') === 'true');
  const deleter=useAppSelector(state=>state.finance.deleteAccountButt)
  const logout=useAppSelector(state=>state.finance.logOutButt)
  const handleLogout = () => {
    localStorage.setItem('auth', 'false');
    setIsAuth(false); // <- Важно: обновляем состояние
  };

  useEffect(()=>{
    if(deleter==true || logout==true){
      localStorage.setItem('auth', 'false');
      setIsAuth(false); 
    }
  },[deleter,logout])

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(localStorage.getItem('auth') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  return (
    <><div className="app">
      <div className="app__container">
        {isAuth==true?<Main onLogout={handleLogout}></Main>:<Auth></Auth>}
      </div>
          
    </div>
        
    </>
  )
}

/* {
  "users": [
    {
      "id": "1749553248756",
      "avatar": "src/assets/icons/prof.svg",
      "name": "rr1",
      "phone": "+7 (443) 434-34-34",
      "email": "ее@gmail.com",
      "password": "g",
      "birthDate": "05.11.2002",
      "operations": [
        {
          "year": 2025,
          "month": "June",
          "day": 28,
          "weekDay": "Sat",
          "time": "00:20",
          "type": "more",
          "name": "wd",
          "money": -12
        }
      ]
    }
  ]
} */

export default App

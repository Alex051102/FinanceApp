import { useEffect, useState } from 'react'


import './App.css'
import Auth from './components/Auth/Auth'
import Main from './components/Main/Main'

function App() {
  
  const [isAuth, setIsAuth] = useState(localStorage.getItem('auth') === 'true');
  const handleLogout = () => {
    localStorage.setItem('auth', 'false');
    setIsAuth(false); // <- Важно: обновляем состояние
  };

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

export default App

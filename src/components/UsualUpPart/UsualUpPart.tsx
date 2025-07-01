import React, { useEffect, useMemo, useState } from 'react'
import notif from '../../assets/icons/notif.svg'
import expense from '../../assets/icons/Expense.svg'
import income from '../../assets/icons/Income.svg'
import './UsualUpPart.css'
import back from '../../assets/icons/back.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook'
import { setBackArrow,setterBackHref } from '../../store/financeSlice'
import db from '../../../db.json'
interface MyComponentProps {
    
    customMoney:boolean,
    arrow:boolean,
    text:string 
  }
const UsualUpPart: React.FC<MyComponentProps> = ({ customMoney,arrow,text }) =>  {


  const hreff=useAppSelector(state=>state.finance.backHref)

  console.log(hreff)
    const dis=useAppDispatch()
    const navigate=useNavigate()
    const [userName,setUserName]=useState('')
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
          navigate('/login');
          return;
        }
        setUserName(user);
      }, [navigate]);
    
      // Получение операций текущего пользователя
      const userOperations = useMemo(() => {
        if (!userName) return [];
        const user = db.users.find(user => user.name === userName);
        return user ? [...user.operations].reverse() : [];
      }, [userName]);
    

    const totalBalance = useMemo(() => {
        return userOperations.reduce((sum, op) => sum + op.money, 0).toFixed(2);
      }, [userOperations]);
    
      // Расчет доходов и расходов
      const [incomes, expenses] = useMemo(() => {
        let inc = 0;
        let exp = 0;
        
        userOperations.forEach(op => {
          if (op.money > 0) inc += op.money;
          else exp += Math.abs(op.money);
        });
    
        return [inc.toFixed(2), exp.toFixed(2)];
      }, [userOperations]);

     

      function setterHref(){
        if(text=='Profile'){
         dis(setterBackHref('/profile'))
        }
        if(text=='Transactions'){
          dis(setterBackHref('/transactions'))
        }
        if(text=='Home'){
          dis(setterBackHref('/'))
        }
        if(text=='Analyzis'){
          dis(setterBackHref('/analyzis'))
        }
        if(text=='Categories'){
          dis(setterBackHref('/category'))
        }
      }
  return (
    <>
        <div className="home__up">
                    <div className="home__up-container">
                    <div className={`home__intro ${arrow==true?'home-intro--grid3':""}`}>
                        <div className={`${arrow==true?'back back-flex':'back back-none'}`}>
                            <Link to={hreff}><img onClick={()=>{dis(setBackArrow(true));dis(setterBackHref('/'))}} className='back-img' src={back} alt="" /></Link>
                        </div>
                        <div className="home__intro-text">
                            <h2 className="home__intro-text-title">{text}</h2>
                            <p>{arrow==true?"":'Good morning'}</p>
                        </div>
                        <div className="home__notifications">
                          <Link to='/notification'>
                            <img onClick={setterHref} className='home__notifications-image' src={notif} alt="" />
                            </Link>
                        </div>
                    </div>
                    {customMoney==true?'':<div className="home__total">
                        <div className="home__total-numbers">
                            <div className="home__total-number home__total-number--border-right">
                                <div className="home__total-number-container home__total-number-container--padding-right">
                                    <div className="home__total-text">
                                        <img src={income} alt="" />
                                        <p>Total Balance</p>
                                    </div>
                                    <p className='home__total-money home__total-money--white'>{totalBalance}$</p>
                                </div>
                                
                            </div>
                            <div className="home__total-number">
                                <div className="home__total-number-container home__total-number-container--padding-left">
                                    <div className="home__total-text">
                                        <img src={expense} alt="" />
                                        <p>Total Expense</p>
                                    </div>
                                    <p className='home__total-money home__total-money--blue'>{expenses}$</p>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>}
                    
                    </div>
                    
                </div>
    </>
  )
}

export default UsualUpPart

import React from 'react'
import notif from '../../assets/icons/notif.svg'
import expense from '../../assets/icons/Expense.svg'
import income from '../../assets/icons/Income.svg'
import './UsualUpPart.css'
import back from '../../assets/icons/back.svg'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hook'
import { setBackArrow } from '../../store/financeSlice'
interface MyComponentProps {
    customMoney:boolean,
    arrow:boolean,
    text:string 
  }
const UsualUpPart: React.FC<MyComponentProps> = ({ customMoney,arrow,text }) =>  {
    const dis=useAppDispatch()

  return (
    <>
        <div className="home__up">
                    <div className="home__up-container">
                    <div className={`home__intro ${arrow==true?'home-intro--grid3':""}`}>
                        <div className={`${arrow==true?'back back-flex':'back back-none'}`}>
                            <Link to='/'><img onClick={()=>{dis(setBackArrow(true))}} className='back-img' src={back} alt="" /></Link>
                        </div>
                        <div className="home__intro-text">
                            <h2 className="home__intro-text-title">{text}</h2>
                            <p>{arrow==true?"":'Good morning'}</p>
                        </div>
                        <div className="home__notifications">
                            <img className='home__notifications-image' src={notif} alt="" />
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
                                    <p className='home__total-money home__total-money--white'>$7,783.00</p>
                                </div>
                                
                            </div>
                            <div className="home__total-number">
                                <div className="home__total-number-container home__total-number-container--padding-left">
                                    <div className="home__total-text">
                                        <img src={expense} alt="" />
                                        <p>Total Expense</p>
                                    </div>
                                    <p className='home__total-money home__total-money--blue'>-$1.187.40</p>
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

import React, { useState } from 'react'
import './Home.css'

import salary from '../../assets/icons/Salary.svg'
import rent from '../../assets/icons/Rent.svg'
import transport from '../../assets/icons/transport.svg'
import food from '../../assets/icons/Food.svg'
import entertaiment from '../../assets/icons/Entertainment.svg'
import groceries from '../../assets/icons/Groceries.svg'
import gift from '../../assets/icons/Gift.svg'
import db from '../../../db.json'
import UsualUpPart from '../UsualUpPart/UsualUpPart'
export default function Home() {

    type Operation = {
          year: number,
          month: string,
          day: number,
          weekDay:string,
          time: string,
          type: string,
          name: string,
          money: number
    };
    function getWeekOfMonth(date:any) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const offset = (firstDay >= 0) ? firstDay : 6; // Воскресенье = 0 или 7
        return Math.ceil((date.getDate() + offset) / 7);
      }
      
     
    const now = new Date();
    const weekOfMonth = getWeekOfMonth(now);
    // День месяца (1-31)
    const day = now.getDate();

    // Название месяца (например "January")
    const monthName = now.toLocaleString('en-US', { month: 'long' });

    const [typeSort,setTypeSort]=useState('')
    function getMonthIndex(monthName: string): number {
        return new Date(`${monthName} 1, 2000`).getMonth();
    }
    function sortOperations(arr: Operation[]): Operation[] {
        if (!typeSort) {
            return arr;
        }
        if (typeSort === 'daily') {
            return arr.filter((o) => o.day === day && o.month==monthName);
        }
        if (typeSort === 'weekly') {
            return arr.filter(o => {
              const operationDate = new Date(o.year, getMonthIndex(o.month), o.day);
              return getWeekOfMonth(operationDate) === weekOfMonth;
            });
          }
        if (typeSort === 'monthly') {
            return arr.filter((o) => o.month === monthName);
        }
        return arr;
    }

   function imageSetter(type:string){
    if(type=='rent'){
        return rent
    }
    if(type=='transport'){
        return transport
    }
    if(type=='food'){
        return food
    }
    if(type=='salary'){
        return salary
    }
    if(type=='entertainment'){
        return entertaiment
    }
    if(type=='gift'){
        return gift
    }
    if(type=='groceries'){
        return groceries
    }
   }
    
  return (
   <>
        <div className="home">
           
            <UsualUpPart text='Hi, Welcome Back' arrow={false}></UsualUpPart>     
                <div className="home__main">
                    <div className="home__main-container">
                        <div className="home__panel">
                            <div className="home__panel-container">
                                <div onClick={()=>setTypeSort('daily')} className="home__panel-item">
                                    <p className='home__panel-item-text'>Daily</p>
                                </div>
                                <div onClick={()=>setTypeSort('weekly')} className="home__panel-item">
                                    <p className='home__panel-item-text'>Weekly</p>
                                </div>
                                <div onClick={()=>setTypeSort('monthly')} className="home__panel-item">
                                    <p className='home__panel-item-text'>Monthly</p>
                                </div>
                            </div>
                        </div>
                        <div className="home__operations-list">
                            {db.users.map(user=>(
                                user.name==localStorage.getItem('user')?
                                sortOperations(user.operations)?.map(oper=>(
                                    <div className="home__operations-item">
                                <img className='home__operations-item-icon' src={oper?.type ? imageSetter(oper.type):''} alt="" />
                                <div className="home__operations-item-info">
                                    <div className="home__operations-item-info-container">
                                        <p className='home__operations-item-text-type'>{oper.type}</p>
                                        <p className='home__operations-item-text-time'>{oper.time} - {oper.month} {oper.day}</p>
                                    </div>
                                    
                                </div>
                                <div className="home__operations-item-action home__operations-item-info--border">
                                    <p className='home__operations-item-action-text'>{oper.name}</p>
                                </div>
                                <div className="home__operations-item-money">
                                    <p className={`home__operations-item-money-text ${oper.money<0? 'home__operations-item-money-text--blue':''}`}>{oper.money}$</p>
                                </div>
                            </div>
                                )):""
                            ))}
                           
                            
                            
                        </div>
                    </div>
                </div>
                
            </div>
        
   </>
  )
}

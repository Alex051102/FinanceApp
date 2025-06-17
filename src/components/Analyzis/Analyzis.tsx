import  { useState } from 'react'
import UsualUpPart from '../UsualUpPart/UsualUpPart'
import './Analyzis.css'
import db from '../../../db.json'
import ExpensesChart from '../ExpensesChart/ExpensesChart';
export default function Analyzis() {
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
    let data:Operation[]=[]
    db.users.forEach(user=>{
        user.name==localStorage.getItem('user')?
        data=user.operations:""})

    const [cur,setCur]=useState(0)

    function setTypeGraph(){
        if(cur==0){
            return <ExpensesChart data={data} type={1} />
        }
        if(cur==1){
            return <ExpensesChart data={data} type={2} />
        }
        if(cur==2){
            return <ExpensesChart data={data} type={3} />
        }
        if(cur==3){
            return <ExpensesChart data={data} type={4} />
        }
    }
        
  return (
    <>
        
        <div className="analyzis">
            <UsualUpPart customMoney={false} arrow={true} text='Analyzis'></UsualUpPart>
            <div className="analyzis__main">
                <div className="analyzis__main-panel">
                    <div className="analyzis__main-panel-container">
                        <div onClick={()=>setCur(0)} className={`analyzis__main-panel-item ${cur==0?'analyzis__main-panel-item--current':""}`}>
                            <p className='analyzis__main-panel-item-text'>Daily</p>
                        </div>
                        <div onClick={()=>setCur(1)} className={`analyzis__main-panel-item ${cur==1?'analyzis__main-panel-item--current':""}`}>
                            <p className='analyzis__main-panel-item-text'>Weekly</p>
                        </div>
                        <div onClick={()=>setCur(2)} className={`analyzis__main-panel-item ${cur==2?'analyzis__main-panel-item--current':""}`}>
                            <p className='analyzis__main-panel-item-text'>Monthly</p>
                        </div>
                        <div onClick={()=>setCur(3)} className={`analyzis__main-panel-item ${cur==3?'analyzis__main-panel-item--current':""}`}>
                            <p className='analyzis__main-panel-item-text'>Year</p>
                        </div>
                    </div>
                </div>
                <div className="analyzis__graphics">
                    <div className="analyzis__graphics-container">
                        {setTypeGraph()}
                       
                    </div>
                   
                </div>
                
            </div>
           
            
        </div>
    </>
  )
}

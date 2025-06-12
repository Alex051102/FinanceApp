import React, { useState } from 'react'
import './AnalyzisSearch.css'
import back from '../../assets/icons/back.svg'
import notif from '../../assets/icons/notif.svg'
import downArrow from '../../assets/icons/downArrow.svg'
import Button from '../Button/Button'
import db from '../../../db.json'
import salary from '../../assets/icons/Salary.svg'
import rent from '../../assets/icons/Rent.svg'
import transport from '../../assets/icons/transport.svg'
import food from '../../assets/icons/Food.svg'
import entertaiment from '../../assets/icons/Entertainment.svg'
import groceries from '../../assets/icons/Groceries.svg'
import gift from '../../assets/icons/Gift.svg'
export default function AnalyzisSearch() {

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const [category,setCategory]=useState('All categories')
    const [letCategories,setLetCategories]=useState(false)
    const [kCategory,setKCategory]=useState(0);

    const [day,setDay]=useState('Day')
    const [letDay,setLetDay]=useState(false)
    const [kDay,setKDay]=useState(0);

    const [month,setMonth]=useState('Month')
    const [letMonth,setLetMonth]=useState(false)
    const [kMonth,setKMonth]=useState(0);

    const [year,setYear]=useState('Year')
    const [letYear,setLetYear]=useState(false)
    const [kYear,setKYear]=useState(0);

    const [money,setMoney]=useState('income')

    console.log(money)
    function openCategories(){
        if(kCategory%2==0){
            setLetCategories(true)
            setKCategory(k=>k+1)
        }
        else{
            setLetCategories(false)
            setKCategory(k=>k+1)
        }
    }
    function openDays(){
        if(kDay%2==0){
            setLetDay(true)
            setKDay(k=>k+1)
        }
        else{
            setLetDay(false)
            setKDay(k=>k+1)
        }
    }
    function openMonthes(){
        if(kMonth%2==0){
            setLetMonth(true)
            setKMonth(k=>k+1)
        }
        else{
            setLetMonth(false)
            setKMonth(k=>k+1)
        }
    }
    function openYears(){
        if(kYear%2==0){
            setLetYear(true)
            setKYear(k=>k+1)
        }
        else{
            setLetYear(false)
            setKYear(k=>k+1)
        }
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
   
  return (
    <>
        <div className="analyzis-search">
            <div className="analyzis-search__up">
                <div className="analyzis-search__up-container">
                    <div className="analyzis-search__up-nav">
                        <div className="analyzis-search__up-back"><img src={back} alt="" /></div>
                        <div className="analyzis-search__up-text-outer"><h2 className='analyzis-search__up-text'>Search</h2></div>
                        <div className="analyzis-search__up-notifications"><img src={notif} alt="" /></div>
                    </div>
                    <input placeholder='Search...' className='analyzis-search__up-input' type="text" name="" id="" />
                    
                </div>
                
            </div>
            <div className="analyzis-search__main">
                <div className="analyzis-search__main-container">
                    <div className="analyzis-search__main-item">
                        <h3 className='analyzis-search__main-item-title'>Categories</h3>
                        <div onClick={openCategories} className="analyzis-search__main-item-choosen-category">
                            <div className="analyzis-search__main-item-choosen-category-container">
                                <p className='analyzis-search__main-item-choosen-category-text'>{category}</p>
                                <div className="analyzis-search__main-item-choosen-category-image">
                                    <img src={downArrow} alt="" />
                                </div>
                                
                            </div>
                            
                        </div>
                        {letCategories==true?<div className="analyzis-search__main-item-categories">
                            <div className="analyzis-search__main-item-category">
                                <p className='analyzis-search__main-item-category-text'>All categories</p>
                                
                            </div>
                            <div className="analyzis-search__main-item-category">
                                <p onClick={()=>{setCategory('Food');openCategories()}} className='analyzis-search__main-item-category-text'>Food</p>
                            </div>
                            <div className="analyzis-search__main-item-category">
                                <p onClick={()=>{setCategory('Medicine');openCategories()}} className='analyzis-search__main-item-category-text'>Medicine</p>
                            </div>
                            <div className="analyzis-search__main-item-category">
                                <p onClick={()=>{setCategory('Groceries');openCategories()}} className='analyzis-search__main-item-category-text'>Groceries</p>
                            </div>
                            <div className="analyzis-search__main-item-category">
                                <p onClick={()=>{setCategory('Rent');openCategories()}} className='analyzis-search__main-item-category-text'>Rent</p>
                            </div>
                            <div className="analyzis-search__main-item-category">
                                <p onClick={()=>{setCategory('Gifts');openCategories()}} className='analyzis-search__main-item-category-text'>Gifts</p>
                            </div>
                            <div className="analyzis-search__main-item-category">
                                <p onClick={()=>{setCategory('Entertainment');openCategories()}} className='analyzis-search__main-item-category-text'>Entertainment</p>
                            </div>
                            <div className="analyzis-search__main-item-category">
                                <p onClick={()=>{setCategory('Salary');openCategories()}} className='analyzis-search__main-item-category-text'>Salary</p>
                            </div>
                        </div>:""}
                        

                    </div>
                    <div className="analyzis-search__main-item">
                        <h3 className='analyzis-search__main-item-title'>Date</h3>
                        <div className="analyzis-search__main-item-dates">
                            <div className="analyzis-search__main-item-date">
                                <div onClick={openDays}  className="analyzis-search__main-item-date-choosen">
                                <div className="analyzis-search__main-item-date-choosen-container">
                                    <p>{day}</p>
                                    <div className="analyzis-search__main-item-date-choosen-image">
                                        <img src={downArrow} alt="" />
                                    </div>
                                </div>  
                                </div>
                                {letDay==true?<div className="analyzis-search__main-item-date-items">
                                    
                                    {days.map((day) => (
                                        <>
                                        <div onClick={()=>{setDay(day.toString());openDays()}} className="analyzis-search__main-item-date-item">
                                        <p key={day} className="analyzis-search__main-item-date-item-text">{day}</p>
                                        </div>
                                        
                                        </>
            
                                    ))}
                                        
                                    </div>:""}
                                
                            </div>
                            <div className="analyzis-search__main-item-date">
                                <div onClick={openMonthes}  className="analyzis-search__main-item-date-choosen">
                                <div className="analyzis-search__main-item-date-choosen-container">
                                    <p>{month}</p>
                                    <div className="analyzis-search__main-item-date-choosen-image">
                                        <img src={downArrow} alt="" />
                                    </div>
                                </div>
                                </div>
                                {letMonth==true? <div className="analyzis-search__main-item-date-items">
                                    <div onClick={()=>{setMonth('January');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">January</p>
                                    </div>
                                  
                                    <div onClick={()=>{setMonth('February');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">February</p>
                                    </div>
                                    <div onClick={()=>{setMonth('March');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">March</p>
                                    </div>
                                    <div onClick={()=>{setMonth('April');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">April</p>
                                    </div>
                                    <div onClick={()=>{setMonth('May');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">May</p>
                                    </div>
                                    <div onClick={()=>{setMonth('June');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">June</p>
                                    </div>
                                    <div onClick={()=>{setMonth('July');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">July</p>
                                    </div>
                                    <div onClick={()=>{setMonth('August');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">August</p>
                                    </div>
                                    <div onClick={()=>{setMonth('September');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">September</p>
                                    </div>
                                    <div onClick={()=>{setMonth('October');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">October</p>
                                    </div>
                                    <div onClick={()=>{setMonth('November');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">November</p>
                                    </div>
                                    <div onClick={()=>{setMonth('December');openMonthes()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">December</p>
                                    </div>
                                </div>:""}
                               
                                
                            </div>
                            <div className="analyzis-search__main-item-date">
                                <div onClick={openYears} className="analyzis-search__main-item-date-choosen">
                                    <div className="analyzis-search__main-item-date-choosen-container">
                                        <p>{year}</p>
                                        <div className="analyzis-search__main-item-date-choosen-image">
                                            <img src={downArrow} alt="" />
                                        </div>
                                    </div>
                                   
                                </div>
                                {letYear==true? <div className="analyzis-search__main-item-date-items">
                                    <div onClick={()=>{setYear('2025');openYears()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">2025</p>
                                    </div>
                                  
                                    <div onClick={()=>{setYear('2024');openYears()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">2024</p>
                                    </div>
                                    <div onClick={()=>{setYear('2023');openYears()}} className="analyzis-search__main-item-date-item">
                                        <p className="analyzis-search__main-item-date-item-text">2023</p>
                                    </div>
                                    
                                </div>:""}
                               
                                
                            </div>
                        </div>
                    </div>
                    <div className="analyzis-search__main-item">
                        <h3 className='analyzis-search__main-item-title'>Report</h3>
                        <div className="analyzis-search__main-item-inputs">
                            <div className="analyzis-search__main-item-inputs-item">
                                <input onClick={()=>{setMoney('income')}} className='analyzis-search__main-item-input' type="radio" name="incExp" id="" />
                                <p className='analyzis-search__main-item-inputs-item-text'>Income</p>
                            </div>
                            <div className="analyzis-search__main-item-inputs-item">
                                <input onClick={()=>{setMoney('expense')}} className='analyzis-search__main-item-input' type="radio" name="incExp" id="" />
                                <p className='analyzis-search__main-item-inputs-item-text'>Expense</p>
                            </div>
                        </div>
                    </div>
                    <div className="analyzis-search__main-button">
                        <Button text='search' color='#00D09E'></Button>
                    </div>
                    {data.map(oper=>(
                        <div className="analyzis-search__card">
                            <div className="analyzis-search__card-container">
                                <img className='analyzis-search__card-img' src={oper?.type ? imageSetter(oper.type):''} alt="" />
                                <div className="analyzis-search__card-info">
                                    <p className='analyzis-search__card-info-type'>{oper.type}</p>
                                    <p className='analyzis-search__card-info-time'>{oper.time} - {oper.day} {oper.month}</p>
                                </div>
                                <p className={`analyzis-search__card-text ${oper.money<0?'analyzis-search__card-text--blue':""}`}>{oper.money}$</p>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

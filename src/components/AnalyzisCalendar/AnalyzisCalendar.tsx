import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import back from '../../assets/icons/back.svg'
import notif from '../../assets/icons/notif.svg'
import arrow from '../../assets/icons/calendarArrow.svg'
import './AnalyzisCalendar.css'
import db from '../../../db.json'
import salary from '../../assets/icons/Salary.svg'
import rent from '../../assets/icons/Rent.svg'
import transport from '../../assets/icons/transport.svg'
import food from '../../assets/icons/Food.svg'
import entertaiment from '../../assets/icons/Entertainment.svg'
import groceries from '../../assets/icons/Groceries.svg'
import gift from '../../assets/icons/Gift.svg'
import more from '../../assets/icons/More.svg'
import HalfDonutChart from '../HalfDonutChart/HalfDonutChart';

export default function AnalyzisCalendar() {
    const monthes2025: string[][] = [
        // Январь 2025 (начинается в среду)
        [
            '', '', '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
        ],
        // Февраль 2025 (начинается в субботу)
        [
            '', '', '', '', '', '1', '2', '3', '4', '5', '6', '7', '8', 
            '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', 
            '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '', ''
        ],
        // Март 2025 (начинается в субботу)
        [
            '', '', '', '', '', '1', '2', '3', '4', '5', '6', '7', '8', 
            '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', 
            '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', 
            '29', '30', '31'
        ],
        // Апрель 2025 (начинается во вторник)
        [
            '', '', '', '', '', '', '', '1', '2', '3', '4', '5', '6', '7', '8', 
            '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', 
            '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', 
            '29', '30', '', '', '', '', ''
        ],
        // Май 2025 (начинается в четверг)
        [
            '', '', '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '', ''
        ],
        // Июнь 2025 (начинается в воскресенье)
        [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', 
            '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', 
            '25', '26', '27', '28', '29', '30', '', '', '', '', ''
        ],
        // Июль 2025 (начинается во вторник)
        [
            '', '', '', '', '', '', '', '1', '2', '3', '4', '5', '6', '7', '8', 
            '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', 
            '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', 
            '29', '30', '31'
        ],
        // Август 2025 (начинается в пятницу)
        [
            '', '', '', '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
        ],
        // Сентябрь 2025 (начинается в понедельник)
        [
            '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', 
            '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', 
            '25', '26', '27', '28', '29', '30', '', '', '', '', ''
        ],
        // Октябрь 2025 (начинается в среду)
        [
            '', '', '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '', ''
        ],
        // Ноябрь 2025 (начинается в субботу)
        [
            '', '', '', '', '', '1', '2', '3', '4', '5', '6', '7', '8', 
            '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', 
            '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
        ],
        // Декабрь 2025 (начинается в понедельник)
        [
            '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', 
            '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', 
            '25', '26', '27', '28', '29', '30', '31', '', '', '', ''
        ]
    ];

   
    const [year,setYear]=useState('2025')
    const [letYear,setLetYear]=useState(false)
    const [kYear,setKYear]=useState(0);
   
    function openYear(){
        if(kYear%2==0){
            setLetYear(true)
            setKYear(k=>k+1)
        }
        else{
            setLetYear(false)
            setKYear(k=>k+1)
        }
    }

    const [month,setMonth]=useState('June')
    const [monthNum,setMonthNum]=useState(0)
    const [letMonth,setLetMonth]=useState(false)
    const [kMonth,setKMonth]=useState(0);
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

    const [choosenNum,setChoosenNum]=useState('0')

    const [rendering, setRendering] = useState(<></>);
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
    
  const cards: React.ReactNode[] = [];
  let toCalendar:Operation[]=[]
  console.log(toCalendar)
  console.log(data)
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
    if(type=='more'){
        return more
    }
   }

  
   function openNum(num:string){
    if(num==choosenNum){
        setChoosenNum('0')     
    }
    else{
        setChoosenNum(num)
   
        }
    }
    const [filteredData, setFilteredData] = useState<Operation[]>([]);


    /* useEffect(() => {
        const filtered = data.filter(oper => 
          oper.year.toString() === year &&
          oper.month === month &&
          (oper.day.toString() === choosenNum || choosenNum === '0')
        );
      
        setFilteredData(filtered);
      
        const cards = filtered.map(oper => (
          <div className="home__operations-item" key={`${oper.time}-${oper.name}`}>
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
          </div>
        ));
      
        setRendering(
          <div className="analyzis-calendar__cards">
            {cards.length > 0 ? cards : <p>No operations found</p>}
          </div>
        );
      }, [choosenNum, month, year, data]); */
      
    useEffect(()=>{
        const filtered = data.filter(oper => 
          oper.year.toString() === year &&
          oper.month === month &&
          (oper.day.toString() === choosenNum || choosenNum === '0')
        );
      
        setFilteredData(filtered);
        
        data.forEach(oper => {
            if ((oper.year.toString()==year) &&
            (oper.month==month)&&
            (oper.day.toString()==choosenNum || choosenNum=='0')) {
              toCalendar.push(oper)
              cards.push(
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
              )};
            
          });
          setRendering(
            <div className="analyzis-calendar__cards">
              {cards.length > 0 ? cards : <p>No operations found</p>}
            </div>
          );
    },[choosenNum,month,year])

    const [options,setOptions]=useState(true)


    useEffect(()=>{
        if(month=='January'){
            setMonthNum(0)
        }if(month=='February'){
            setMonthNum(1)
        }
        if(month=='March'){
            setMonthNum(2)
        }
        if(month=='April'){
            setMonthNum(3)
        }
        if(month=='May'){
            setMonthNum(4)
        }
        if(month=='Juny'){
            setMonthNum(5)
        }
        if(month=='July'){
            setMonthNum(6)
        }
        if(month=='August'){
            setMonthNum(7)
        }
        if(month=='September'){
            setMonthNum(8)
        }
        if(month=='October'){
            setMonthNum(9)
        }
        if(month=='November'){
            setMonthNum(10)
        }if(month=='December'){
            setMonthNum(11)
        }
    },[month])
  return (
    <>
        <div className="analyzis-calendar">
            
                <div className="analyzis-search__up">
                    <div className="analyzis-search__up-container">
                        <div className="analyzis-search__up-nav">
                            
                            <Link to='/analyzis'><div className="analyzis-search__up-back"><img src={back} alt="" /></div></Link>
                            <div className="analyzis-search__up-text-outer"><h2 className='analyzis-search__up-text'>Calendar</h2></div>
                            <div className="analyzis-search__up-notifications"><img src={notif} alt="" /></div>
                        </div>
                        
                        
                    </div>
                    
                </div>
                <div className="analyzis-calendar__main">
                    <div className="analyzis-calendar__main-container">
                        <div className="analyzis-calendar__main-filter">
                            <div className="analyzis-calendar__main-filter-dates">
                                <div className="analyzis-calendar__main-filter-dates-info">
                                    <div onClick={()=>{openMonthes()}} className="analyzis-calendar__main-filter-dates-info-visible">
                                        <p>{month}</p>
                                        <img src={arrow} alt="" />
                                    </div>
                                    {letMonth==true? <div className="analyzis-calendar__main-filter-dates-info-non-visible">
                                        <div onClick={()=>{setMonth('January');openMonthes()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>January</p>
                                        </div>
                                        <div onClick={()=>{setMonth('February');openMonthes()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>February</p>
                                        </div>
                                        <div onClick={()=>{setMonth('April');openMonthes()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>April</p>
                                        </div>
                                        <div onClick={()=>{setMonth('May');openMonthes()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>May</p>
                                        </div>
                                        <div onClick={()=>{setMonth('June');openMonthes()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>June</p>
                                        </div>
                                        <div onClick={()=>{setMonth('July');openMonthes()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>July</p>
                                        </div>
                                        <div onClick={()=>{setMonth('August');openMonthes()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>August</p>
                                        </div>
                                        <div onClick={()=>{setMonth('September');openMonthes()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>September</p>
                                        </div>
                                        <div onClick={()=>{setMonth('October');openMonthes()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>October</p>
                                        </div>
                                        <div onClick={()=>{setMonth('November');openMonthes()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>November</p>
                                        </div>
                                        <div onClick={()=>{setMonth('December');openMonthes()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>December</p>
                                        </div>
                                       
                                            
                                       
                                    </div>:""}
                                   
                                </div>
                            </div>
                            <div className="analyzis-calendar__main-filter-dates">
                                <div className="analyzis-calendar__main-filter-dates-info">
                                    <div onClick={()=>{openYear()}} className="analyzis-calendar__main-filter-dates-info-visible analyzis-calendar__main-filter-dates-info-visible--justify-end">
                                        <p>{year}</p>
                                        <img src={arrow} alt="" />
                                    </div>
                                    {letYear==true?<div className="analyzis-calendar__main-filter-dates-info-non-visible analyzis-calendar__main-filter-dates-info-non-visible--right">
                                        <div onClick={()=>{setYear('2025');openYear()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>2025</p>
                                        </div>
                                        <div onClick={()=>{setYear('2024');openYear()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>2024</p>
                                        </div>
                                        <div onClick={()=>{setYear('2023');openYear()}} className="analyzis-calendar__main-filter-dates-info-non-visible-item">
                                            <p className='analyzis-calendar__main-filter-dates-info-non-visible-item-text'>2023</p>
                                        </div>
                                    </div>:""}
                                    
                                </div>
                            </div>
                        </div>
                        <div className="analyzis-calendar__main-table">
                            <div className="analyzis-calendar__main-table-week-days">
                                <div className="analyzis-calendar__main-table-week-day">
                                    <p className='analyzis-calendar__main-table-week-day-text'>Mon</p>
                                </div>
                                <div className="analyzis-calendar__main-table-week-day">
                                    <p className='analyzis-calendar__main-table-week-day-text'>Tue</p>
                                </div>
                                <div className="analyzis-calendar__main-table-week-day">
                                    <p className='analyzis-calendar__main-table-week-day-text'>Wed</p>
                                </div>
                                <div className="analyzis-calendar__main-table-week-day">
                                    <p className='analyzis-calendar__main-table-week-day-text'>Thu</p>
                                </div>
                                <div className="analyzis-calendar__main-table-week-day">
                                    <p className='analyzis-calendar__main-table-week-day-text'>Fri</p>
                                </div>
                                <div className="analyzis-calendar__main-table-week-day">
                                    <p className='analyzis-calendar__main-table-week-day-text'>Sat</p>
                                </div>
                                <div className="analyzis-calendar__main-table-week-day">
                                    <p className='analyzis-calendar__main-table-week-day-text'>Sun</p>
                                </div>
                                    
                            </div>
                            <div className="analyzis-calendar__main-table-days">
                                {monthes2025[monthNum].map((num)=>(
                                    <div className={`analyzis-calendar__main-table-day ${num==choosenNum?'analyzis-calendar__main-table-day--current':""}`}>
                                        <p onClick={()=>openNum(num)} className='analyzis-calendar__main-table-day-text'>{num}</p>
                                    </div>
                                ))}
                            </div>
                           
                        </div>
                        <div className="analyzis-calendar__main-options">
                            <div onClick={()=>setOptions(true)} className={`analyzis-calendar__main-option ${options==true?'analyzis-calendar__main-option--current':""}`}>
                               <p className='analyzis-calendar__main-option-text'>Spends</p>
                            </div>
                            <div onClick={()=>setOptions(false)} className={`analyzis-calendar__main-option ${options==false?'analyzis-calendar__main-option--current':""}`}>
                                <p className='analyzis-calendar__main-option-text'>Categories</p>
                            </div>
                        </div>
                        <div className="analyzis-calendar__main-options-content">
                            {options==true? rendering : <HalfDonutChart purchases={filteredData}></HalfDonutChart>}
                        </div>
                      
                        
                        
                    </div>
                </div>
            
        </div>
    </>
  )
}

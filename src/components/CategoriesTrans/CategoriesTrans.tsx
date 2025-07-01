
import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UsualUpPart from '../UsualUpPart/UsualUpPart';
import './CategoriesTrans.css';
import db from '../../../db.json';
import salary from '../../assets/icons/Salary.svg';
import rent from '../../assets/icons/Rent.svg';
import transport from '../../assets/icons/transport.svg';
import food from '../../assets/icons/Food.svg';
import entertaiment from '../../assets/icons/Entertainment.svg';
import groceries from '../../assets/icons/Groceries.svg';
import gift from '../../assets/icons/Gift.svg';
import back from '../../assets/icons/back.svg'
import notif from '../../assets/icons/notif.svg'
import arrow from '../../assets/icons/calendarArrow.svg'
import downArr from '../../assets/icons/downArrow.svg'
import Button from '../Button/Button';
import { useAppDispatch } from '../../hook';
import { setUpdateProfile,setAddExpense ,setterBackHref} from '../../store/financeSlice';
interface MyComponentProps {
  setterContent: (content: boolean) => void;
  type:string[]
}
const CategoriesTrans: React.FC<MyComponentProps> = ({setterContent, type }) =>  { 
 
  const dis=useAppDispatch()
  const navigate = useNavigate();
  const [current, setCurrent] = useState(false);
  const [months, setMonths] = useState<string[]>([]);
  const [userName, setUserName] = useState('');
  const now = useMemo(() => new Date(), []);

  // Проверка авторизации пользователя
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

  // Получение месяцев с операциями (начиная с текущего)
  useEffect(() => {
    const matchedMonths = new Set<string>();
    const currentMonthIndex = now.getMonth();

    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(now.getFullYear(), currentMonthIndex + i, 1);
      const monthName = monthDate.toLocaleString('en-US', { month: 'long' });

      const hasOperations = userOperations.some(operation => 
        operation.month === monthName && 
        (operation.type==type[0])
      );

      if (hasOperations) {
        matchedMonths.add(monthName);
      }
    }

    setMonths(Array.from(matchedMonths));
  }, [current, userOperations, now]);

  // Фильтрация операций для отображения
  const filteredOperations = useMemo(() => {
    return userOperations.filter(operation => 
      (operation.type==type[0]) &&
      months.includes(operation.month)
    );
  }, [current, userOperations, months]);

  // Функция для получения иконки по типу операции
  const imageSetter = (type: string) => {
    const icons: Record<string, string> = {
      rent,
      transport,
      food,
      salary,
      entertainment: entertaiment,
      gift,
      groceries
    };
    return icons[type] || '';
  };

  // Расчет общего баланса
/*   const totalBalance = useMemo(() => {
    return userOperations.reduce((sum, op) => sum + op.money, 0).toFixed(2);
  }, [userOperations]); */

  // Расчет доходов и расходов
 /*  const [income, expense] = useMemo(() => {
    let inc = 0;
    let exp = 0;
    
    userOperations.forEach(op => {
      if (op.money > 0) inc += op.money;
      else exp += Math.abs(op.money);
    });

    return [inc.toFixed(2), exp.toFixed(2)];
  }, [userOperations]); */

  const [add,setAdd]=useState(false)
  const categories=['salary','gift','transport','groceries','rent','entertainment','medecine','food','more']

 
  const [category,setCategory]=useState('more')
    const [letCategories,setLetCategories]=useState(false)
    const [kCategory,setKCategory]=useState(0);
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

    const [amount,setAmount]=useState('')
    const [name,setName]=useState('')

    const handleChange = (e:any) => {
      let newValue = e.target.value.replace(/[^0-9.]/g, ''); 
      const dotCount = (newValue.match(/\./g) || []).length;
      if (dotCount > 1) {
        newValue = newValue.slice(0, newValue.lastIndexOf('.')) + 
                 newValue.slice(newValue.lastIndexOf('.') + 1);
    }

   
    if (newValue.startsWith('.')) {
      newValue = '0' + newValue;
    }
      setAmount(newValue);
    };

    const currentDate = new Date();

const newOperation = {
  year: currentDate.getFullYear(),        
  month: currentDate.toLocaleString('en-US', { month: 'long' }), 
  day: currentDate.getDate(),               
  weekDay: currentDate.toLocaleString('en-US', { weekday: 'short' }), 
  time: currentDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }), 
  type: category,                             
  name: name,                            
  money: category=='salary'?Number(amount):-(Number(amount))                       
};


const newNotif ={
 
    time: currentDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    day: `${currentDate.getDate()}`,
    month: currentDate.toLocaleString('en-US', { month: 'long' }),
    title: "Transactions",
    body: "A new transaction has been registered",
    dop:[
      category,
      name,
      category=='salary'?`${Number(amount)} $`:`${-(Number(amount))} $`    
    ]
  
}



    async function saveOperations() {

      if(name.length!=0 && Number(amount)>0){
        try {
          dis(setAddExpense(true))
          const response = await fetch(`http://localhost:3000/users/${localStorage.getItem('userId')}`);
          const user = await response.json();
      
          
          user.operations.push(newOperation);
          user.notifiactions.push(newNotif)
      
          
          await fetch(`http://localhost:3000/users/${localStorage.getItem('userId')}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
          });
      
          console.log("Операция добавлена!");
          setTimeout(() => {
            dis(setAddExpense(false));
            setterContent(false);
            
          }, 3000);
        } catch (error) {
          console.error("Ошибка:", error);
        }
      }

    


      if(name.length==0){
        setErrorName('Write name of operation')
      }




      if(Number(amount)<=0){
        setErrorAmount('Amount must be more than 0')
      }
     

    
    }

    const [errorName,setErrorName]=useState('')
    const [errorAmount,setErrorAmount]=useState('')

    
 
  return (
    <>
    {add==false?<div className="categories__operations">
    <div className="analyzis-search__up">
                <div className="analyzis-search__up-container">
                    <div className="analyzis-search__up-nav">
                        <div onClick={()=>{setterContent(false)}} className="analyzis-search__up-back"><img src={back} alt="" /></div>
                        <div className="analyzis-search__up-text-outer"><h2 className='analyzis-search__up-text'>{type[1]}</h2></div>
                        <Link to='/notification'><div onClick={()=>dis(setterBackHref('/transactions'))} className="analyzis-search__up-notifications"><img src={notif} alt="" /></div></Link>
                    </div>
                    
                    
                </div>
                
            </div>
         <div className="transactions__main">
        <div className="transactions__main-container">
          {months.length!=0?months.map(month => (
            <React.Fragment key={month}>
              <h3 className="transactions__main-title">{month}</h3>
              {filteredOperations
                .filter(operation => operation.month === month)
                .map((operation, index) => (
                  <div key={`${month}-${operation.time}-${index}`} className="transactions__main-item">
                    <div className="home__operations-item">
                      <img 
                        className='home__operations-item-icon' 
                        src={operation.type ? imageSetter(operation.type) : ''} 
                        alt={operation.type} 
                      />
                      <div className="home__operations-item-info">
                        <div className="home__operations-item-info-container">
                          <p className='home__operations-item-text-type'>{operation.type}</p>
                          <p className='home__operations-item-text-time'>
                            {operation.time} - {operation.month} {operation.day}
                          </p>
                        </div>
                      </div>
                      <div className="home__operations-item-action home__operations-item-info--border">
                        <p className='home__operations-item-action-text'>{operation.name}</p>
                      </div>
                      <div className="home__operations-item-money">
                        <p className={`home__operations-item-money-text ${operation.money < 0 ? 'home__operations-item-money-text--blue' : ''}`}>
                          {operation.money.toFixed(2)}$
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </React.Fragment>
          )):<p className='categories__no-operation'>No transactions</p>}
          <div onClick={()=>setAdd(true)} className="categories__main-button">
            <Button text='Add Expenses' color='#00D09E'></Button>
          </div>
        </div>
      </div>
    </div>
    :
    <>
      <div className="categories__add-outer">
            <div className="analyzis-search__up">
                <div className="analyzis-search__up-container">
                    <div className="analyzis-search__up-nav">
                        <div onClick={()=>{setAdd(false)}} className="analyzis-search__up-back"><img src={back} alt="" /></div>
                        <div className="analyzis-search__up-text-outer"><h2 className='analyzis-search__up-text'>Add Expense</h2></div>
                        <Link to='/notification'><div onClick={()=>dis(setterBackHref('/transactions'))} className="analyzis-search__up-notifications"><img src={notif} alt="" /></div></Link>
                    </div>
                    
                    
                </div>
                
            </div>
            <div className="categories__add">
              <div className="categories__add-container">
                  <div className="categories__add-main">
                    <div className="categories__add-main-container">
                   
                    <div className="categories__add-main-item">
                      <h3>Category</h3>
                      <div className="categories__add-main-item-input">
                          <div className="categories__add-main-item-input-choosen" onClick={()=>{openCategories()}}>
                            <div className="categories__add-main-item-input-choosen-container">
                              <p className='categories__add-main-item-input-choosen-text'>{category}</p>
                              <div className="categories__add-main-item-input-choosen-img">
                                <img src={downArr} alt="" />
                              </div>
                              
                            </div>
                           
                          </div>

                          {letCategories==true? <div className="categories__add-main-item-input-choices">
                            {categories.map(c=>(
                               <div onClick={()=>{setCategory(`${c}`);openCategories()}} className="categories__add-main-item-input-choices-element">
                                  <p className='categories__add-main-item-input-choices-element-text'>{c}</p>
                               </div>
                            ))}
                           
                          </div>:""}
                         
                        </div>
                    </div>
                    <div className="categories__add-main-item">
                      <h3>Amount</h3>
                      <div className="categories__add-main-item-input-outer">
                        <input onChange={handleChange} value={`${amount}`} className='categories__add-main-item-input' type="text" />
                      </div>
                      <p className='error-red'>{errorAmount}</p>
                    </div>
                    <div className="categories__add-main-item">
                      <h3>Expense Title</h3>
                      <div className="categories__add-main-item-input-outer">
                        <input onChange={(e)=>setName(e.target.value)} value={`${name}`} className='categories__add-main-item-input' type="text" />
                      </div>
                      <p className='error-red'>{errorName}</p>
                     
                    </div>

                    <div className="categories__add-main-button">
                      <div onClick={saveOperations} className="categories__add-main-button-container">
                        <Button text='Save' color='#00D09E'></Button>
                      </div>
                     
                    </div>
                    </div>
                    
                  </div>
                 
              </div>
            </div>


      </div>
    </>}
    
           
    </>
  )
}
export default CategoriesTrans

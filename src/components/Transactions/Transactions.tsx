import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import UsualUpPart from '../UsualUpPart/UsualUpPart';
import './Transactions.css';
import db from '../../../db.json';
import salary from '../../assets/icons/Salary.svg';
import rent from '../../assets/icons/Rent.svg';
import transport from '../../assets/icons/transport.svg';
import food from '../../assets/icons/Food.svg';
import entertaiment from '../../assets/icons/Entertainment.svg';
import groceries from '../../assets/icons/Groceries.svg';
import gift from '../../assets/icons/Gift.svg';

/* type Operation = {
  year: number;
  month: string;
  day: number;
  weekDay: string;
  time: string;
  type: string;
  name: string;
  money: number;
}; */

export default function Transactions() {
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
        (current ? operation.money > 0 : operation.money < 0)
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
      (current ? operation.money > 0 : operation.money < 0) &&
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
  const totalBalance = useMemo(() => {
    return userOperations.reduce((sum, op) => sum + op.money, 0).toFixed(2);
  }, [userOperations]);

  // Расчет доходов и расходов
  const [income, expense] = useMemo(() => {
    let inc = 0;
    let exp = 0;
    
    userOperations.forEach(op => {
      if (op.money > 0) inc += op.money;
      else exp += Math.abs(op.money);
    });

    return [inc.toFixed(2), exp.toFixed(2)];
  }, [userOperations]);

  return (
    <div className="transactions">
      <UsualUpPart customMoney={true} arrow={true} text='Transactions' />
      
      <div className="transactions__up">
        <div className="transactions__up-container">
          <div className="transactions__up-total">
            <div className="transactions__up-total-text">
              <p className="transactions__up-total-title">Total Balance</p>
              <p className='transactions__up-total-money transactions__up-total-money--big'>
                ${totalBalance}
              </p>
            </div>
          </div>
          
          <div className="transactions__up-types">
            <div 
              onClick={() => setCurrent(true)} 
              className={`transactions__up-total ${current ? 'transactions__up-total--current' : ''}`}
            >
              <div className="transactions__up-total-text">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.04167" y="23.9583" width="22.9167" height="22.9167" rx="5.20833" transform="rotate(-90 1.04167 23.9583)" stroke={current ? 'white' : '#0000FF'} strokeWidth="2.08333"/>
                  <path d="M19.7917 6.25C19.7917 5.6747 19.3253 5.20833 18.75 5.20833L9.375 5.20833C8.7997 5.20833 8.33333 5.6747 8.33333 6.25C8.33333 6.8253 8.7997 7.29167 9.375 7.29167L17.7083 7.29167L17.7083 15.625C17.7083 16.2003 18.1747 16.6667 18.75 16.6667C19.3253 16.6667 19.7917 16.2003 19.7917 15.625L19.7917 6.25ZM6.98657 19.4866L19.4866 6.98657L18.0134 5.51343L5.51343 18.0134L6.98657 19.4866Z" fill={current ? 'white' : '#0000FF'}/>
                </svg>
                <p className={`transactions__up-total-title ${current ? 'transactions__up-total-title--current' : ""}`}>
                  Income
                </p>
                <p className={`transactions__up-total-money ${current ? 'transactions__up-total-money--current' : ""}`}>
                  ${income}
                </p>
              </div>
            </div>

            <div 
              onClick={() => setCurrent(false)} 
              className={`transactions__up-total ${!current ? 'transactions__up-total--current' : ''}`}
            >
              <div className="transactions__up-total-text">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.04167" y="1.04167" width="22.9167" height="22.9167" rx="5.20833" stroke={!current ? 'white' : '#0000FF'} strokeWidth="2.08333"/>
                  <path d="M18.75 19.7917C19.3253 19.7917 19.7917 19.3253 19.7917 18.75L19.7917 9.375C19.7917 8.7997 19.3253 8.33333 18.75 8.33333C18.1747 8.33333 17.7083 8.7997 17.7083 9.375V17.7083H9.375C8.7997 17.7083 8.33333 18.1747 8.33333 18.75C8.33333 19.3253 8.7997 19.7917 9.375 19.7917L18.75 19.7917ZM5.51343 6.98657L18.0134 19.4866L19.4866 18.0134L6.98657 5.51343L5.51343 6.98657Z" fill={!current ? 'white' : '#0000FF'}/>
                </svg>
                <p className={`transactions__up-total-title ${!current ? 'transactions__up-total-title--current' : ""}`}>
                  Expense
                </p>
                <p className={`transactions__up-total-money ${!current ? 'transactions__up-total-money--current' : ""}`}>
                  ${expense}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="transactions__main">
        <div className="transactions__main-container">
          {months.map(month => (
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
                          <p className='home__operations-item-text-time home__operations-item-text-time--blue'>
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
          ))}
        </div>
      </div>
    </div>
  );
}
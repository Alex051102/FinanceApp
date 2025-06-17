import React, { useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import calender from '../../assets/icons/Calender.svg';
import search from '../../assets/icons/Search.svg';
import './ExpensesChart.css';
import incomes from '../../assets/icons/Income2222.svg'
import expences from '../../assets/icons/Expenses.svg'
import { Link } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ExpenseEntry {
  year: number;
  month: string;
  day: number;
  weekDay: string;
  time: string;
  type: string;
  name: string;
  money: number;
}

interface ExpensesChartProps {
  data: ExpenseEntry[];
  type: 1 | 2 | 3 | 4; // 1-дни недели, 2-недели месяца, 3-месяцы, 4-годы
}

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Функция для получения номера недели в месяце
const getWeekOfMonth = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return Math.ceil((date.getDate() + firstDay) / 7);
};

// Форматирование чисел в виде 5k, 0.8k и т.д.
const formatMoney = (value: number): string => {
  if (value >= 1000) return (value / 1000).toFixed(1) + 'k';
  return value.toFixed(1);
};

// Формат недели
const getWeekSuffix = (weekNumber: number): string => {
  if (weekNumber === 1) return '1st Week';
  if (weekNumber === 2) return '2nd Week';
  if (weekNumber === 3) return '3rd Week';
  return `${weekNumber}th Week`;
};

const ExpensesChart: React.FC<ExpensesChartProps> = ({ data, type }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = MONTHS[currentDate.getMonth()];

  const { chartData, title, totalIncome, totalExpenses } = useMemo(() => {
    let labels: string[] = [];
    let expenses: number[] = [];
    let incomes: number[] = [];
    let chartTitle = '';

    switch (type) {
        case 1: { // Дни недели
            const currentDayOfWeek = currentDate.getDay();
            const mondayDate = new Date(currentDate);
            mondayDate.setDate(currentDate.getDate() - (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1));
          
            // Создаем массив дней текущей недели
            const weekDays = Array.from({ length: 7 }, (_, i) => {
              const date = new Date(mondayDate);
              date.setDate(mondayDate.getDate() + i);
              return WEEK_DAYS[date.getDay()].slice(0, 3);
            });
          
            // Фильтруем данные за текущую неделю
            const weekData = data.filter(entry => {
              const entryDate = new Date(entry.year, MONTHS.indexOf(entry.month), entry.day);
              return (
                entryDate >= new Date(mondayDate.getFullYear(), mondayDate.getMonth(), mondayDate.getDate()) &&
                entryDate <= new Date(
                  mondayDate.getFullYear(), 
                  mondayDate.getMonth(), 
                  mondayDate.getDate() + 6
                )
              );
            });
          
            const expensesByDay: Record<string, number> = {};
            const incomesByDay: Record<string, number> = {};
          
            // Инициализируем дни недели
            weekDays.forEach(day => {
              expensesByDay[day] = 0;
              incomesByDay[day] = 0;
            });
          
            // Суммируем данные - ОСНОВНОЕ ИСПРАВЛЕНИЕ ЗДЕСЬ
            weekData.forEach(entry => {
              const entryWeekDay = WEEK_DAYS[new Date(entry.year, MONTHS.indexOf(entry.month), entry.day).getDay()].slice(0, 3);
              if (entry.money < 0) {
                // Расходы (отрицательные значения) - преобразуем в положительные для отображения
                expensesByDay[entryWeekDay] += Math.abs(entry.money);
              } else {
                // Доходы (положительные значения)
                incomesByDay[entryWeekDay] += entry.money;
              }
            });
          
            labels = weekDays;
            // ВАЖНО: порядок datasets должен соответствовать легенде
            expenses = weekDays.map(day => expensesByDay[day]);
            incomes = weekDays.map(day => incomesByDay[day]);
            chartTitle = 'Income & Expenses';
            break;
          }

      case 2: { // Недели месяца
        const weeksInMonth = 5;
        const expensesByWeek: number[] = new Array(weeksInMonth).fill(0);
        const incomesByWeek: number[] = new Array(weeksInMonth).fill(0);

        data.filter(entry =>
          entry.year === currentYear &&
          entry.month === currentMonth
        ).forEach(entry => {
          const entryDate = new Date(currentYear, MONTHS.indexOf(entry.month), entry.day);
          const week = getWeekOfMonth(entryDate) - 1;
          if (entry.money < 0) expensesByWeek[week] += Math.abs(entry.money);
          else incomesByWeek[week] += entry.money;
        });

        labels = Array.from({ length: weeksInMonth }, (_, i) => getWeekSuffix(i + 1));
        expenses = expensesByWeek;
        incomes = incomesByWeek;
        chartTitle = 'income & Expenses';
        break;
      }

      case 3: { // Месяцы
        const expensesByMonth: number[] = new Array(12).fill(0);
        const incomesByMonth: number[] = new Array(12).fill(0);

        data.filter(entry => entry.year === currentYear).forEach(entry => {
          const monthIndex = MONTHS.indexOf(entry.month);
          if (entry.money < 0) expensesByMonth[monthIndex] += Math.abs(entry.money);
          else incomesByMonth[monthIndex] += entry.money;
        });

        labels = MONTHS.map(m => m.slice(0, 3));
        expenses = expensesByMonth;
        incomes = incomesByMonth;
        chartTitle = 'income & Expenses';
        break;
      }

      case 4: { // Годы
        const years = Array.from(new Set(data.map(entry => entry.year))).sort();
        const expensesByYear: Record<number, number> = {};
        const incomesByYear: Record<number, number> = {};

        years.forEach(year => {
          expensesByYear[year] = 0;
          incomesByYear[year] = 0;
        });

        data.forEach(entry => {
          if (entry.money < 0) expensesByYear[entry.year] += Math.abs(entry.money);
          else incomesByYear[entry.year] += entry.money;
        });

        labels = years.map(y => y.toString());
        expenses = years.map(y => expensesByYear[y]);
        incomes = years.map(y => incomesByYear[y]);
        chartTitle = 'income & Expenses';
        break;
      }
    }

    const totalIncome = incomes.reduce((sum, val) => sum + (val || 0), 0);
    const totalExpenses = expenses.reduce((sum, val) => sum + (val || 0), 0);

    return {
      chartData: {
        labels,
        datasets: [
          {
            label: 'Расходы',
            data: expenses,
            backgroundColor: '#0068FF',
          },
          {
            label: 'Доходы',
            data: incomes,
            backgroundColor: '#00D09E',
          },
        ],
      },
      title: chartTitle,
      totalIncome,
      totalExpenses,
    };
  }, [data, type, currentYear, currentMonth]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0
        },
        title: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatMoney(value);
          }
        },
        title: {
          display: false
        }
      }
    }
  };

  return (
    <div className="chart">
      <div className='chart__graph'>
        <div className="chart__graph-container">
        <div className="chart__graph-up">
        <h3 className='chart__title'>{title}</h3>
        <div className="chart__icons">
          <Link to='/analyzis-search'><img src={search} alt="Search" style={{ width: '30px', height: '30px' }} /></Link>
          <Link to='/analyzis-calendar'><img src={calender} alt="Calendar" style={{ width: '30px', height: '30px' }} /></Link>
        </div>
        </div>
        <Bar options={options} data={chartData} />
        </div>
       
        
      </div>
      <div className="chart__summary">
        <div className="chart__summary-item">
            <img className='chart__summary-item-img' src={incomes} alt="" />
            <p>Incomes</p>
            <strong className='chart__summary-item-price'>{formatMoney(totalIncome)}$</strong>
        </div>

        <div className="chart__summary-item">
            <img className='chart__summary-item-img' src={expences} alt="" />
            <p>Expences</p>
            <strong className='chart__summary-item-price'>{formatMoney(totalExpenses)}$</strong>
        </div>
        
        
      </div>
    </div>
  );
};

export default ExpensesChart;
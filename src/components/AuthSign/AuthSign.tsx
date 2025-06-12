import React, { useEffect, useState } from 'react'
import './AuthSign.css'
import Button from '../Button/Button'
import { useAppDispatch } from '../../hook'
import axios from 'axios';
import { setLogOrSign } from '../../store/financeSlice'
export default function AuthSign() {
    const dis=useAppDispatch()

    const [name,setName]=useState('')
    const [phone,setPhone]=useState('')
    const [email,setEmail]=useState('')
    const [date,setDate]=useState('')
    const [pass,setPass]=useState('')
    const [passConf,setPassConf]=useState('')

    const [errorName,setErrorName]=useState('')
    const [errorPhone,setErrorPhone]=useState('')
    const [errorEmail,setErrorEmail]=useState('')
    const [errorDate,setErrorDate]=useState('')
    const [errorPass,setErrorPass]=useState('')
    const [errorPassConf,setErrorPassConf]=useState('')


    const validateName = (name: string): boolean => {
        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]{2,}$/;
        if (!name.trim()) {
          setErrorName('Имя обязательно');
          return false;
        }
        if (!nameRegex.test(name)) {
          setErrorName('Только буквы (мин. 2 символа)');
          return false;
        }
        setErrorName('');
        return true;
      };

      const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^\+7\d{10}$/; // +7 и 10 цифр
        if (!phone.trim()) {
          setErrorPhone('Телефон обязателен');
          return false;
        }
        if (!phoneRegex.test(phone)) {
          setErrorPhone('Формат: +79123456789 (11 цифр)');
          return false;
        }
        setErrorPhone('');
        return true;
      };
      const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
          setErrorEmail('Email обязателен');
          return false;
        }
        if (!emailRegex.test(email)) {
          setErrorEmail('Некорректный email');
          return false;
        }
        setErrorEmail('');
        return true;
      };
      const validatePassword = (password: string): boolean => {
        if (!password.trim()) {
          setErrorPass('Пароль обязателен');
          return false;
        }
        if (password.length < 8) {
          setErrorPass('Минимум 8 символов');
          return false;
        }
        if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
          setErrorPass('Буквы + цифры');
          return false;
        }
        setErrorPass('');
        return true;
      };
      const validatePasswordConfirm = (password: string, confirmPassword: string): boolean => {
        if (password !== confirmPassword) {
          setErrorPassConf('Пароли не совпадают');
          return false;
        }
        setErrorPassConf('');
        return true;
      };
      const validateBirthDate = (date: string): boolean => {
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!date.trim()) {
          setErrorDate('Дата обязательна');
          return false;
        }
        if (!dateRegex.test(date)) {
          setErrorDate('Формат: DD.MM.YYYY');
          return false;
        }
      
        const [day, month, year] = date.split('.').map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (
          today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
      
        if (age < 18) {
          setErrorDate('Возраст должен быть 18+');
          return false;
        }
        setErrorDate('');
        return true;
      };




interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
  birthDate: string;
}



// Пример использования:
const newUser = {
  name: name,
  phone: phone,
  email: email,
  password: pass,
  birthDate: date
};
    const registerUser = async (userData: User) => {

   
    // 3. Отправка на сервер
    const response = await axios.post('http://localhost:3000/users', {
      ...userData,
      id: Date.now(),
    });

    return response.data;
  } 
  


    function validAll(){
        const isNameValid = validateName(name);
        const isPhoneValid = validatePhone(phone);
        const isEmailValid = validateEmail(email);
        const isPassValid = validatePassword(pass);
        const isPassConfValid = validatePasswordConfirm(pass, passConf);
        const isDateValid = validateBirthDate(date);

        if (isNameValid && isPhoneValid && isEmailValid && isPassValid && isPassConfValid && isDateValid) {
            registerUser(newUser)
            .then(() => console.log('Пользователь зарегистрирован'))
            .catch(() => console.log('Ошибка регистрации'));
            localStorage.setItem('auth','true')
            window.location.reload()
          }
        else  localStorage.setItem('auth','false')
    }
    
    
  return (
    <>
         <div className="auth">
            <div className="auth__container">
                <div className="auth__up">
                    <h1 className='auth__up-title'>Create Account</h1>
                </div>
                <div className="auth__main">
                    <div className="auth__main-container">
                        <div className="auth__main-sign">
                            <div className="auth__main-inputs-item">
                                <h5>Full name</h5>
                                <input onChange={(e)=>setName(e.target.value)} className='auth__main-input' placeholder='John' type="text" name="" id="" />
                                <p className='error-mess'>{errorName}</p>
                            </div>
                            <div className="auth__main-inputs-item">
                                <h5>Email</h5>
                                <input onChange={(e)=>setEmail(e.target.value)} className='auth__main-input' placeholder='expmple@gmail.com' type="text" name="" id="" />
                                <p className='error-mess'>{errorEmail}</p>
                            </div>
                            <div className="auth__main-inputs-item">
                                <h5>Mobile Number</h5>
                                <input onChange={(e)=>setPhone(e.target.value)} className='auth__main-input' placeholder='+79117221586' type="text" name="" id="" />
                                <p className='error-mess'>{errorPhone}</p>
                            </div>
                            <div className="auth__main-inputs-item">
                                <h5>Date Of Birth</h5>
                                <input onChange={(e)=>setDate(e.target.value)} className='auth__main-input' placeholder='DD / MM /YYY' type="text" name="" id="" />
                                <p className='error-mess'>{errorDate}</p>
                            </div>
                            <div className="auth__main-inputs-item">
                                <h5>Password</h5>
                                <input onChange={(e)=>setPass(e.target.value)} className='auth__main-input' placeholder='' type="text" name="" id="" />
                                <p className='error-mess'>{errorPass}</p>
                            </div>
                           
                            <div className="auth__main-inputs-item">
                                <h5>Confirm Password</h5>
                                <input onChange={(e)=>setPassConf(e.target.value)} className='auth__main-input' placeholder='' type="text" name="" id="" />
                                <p className='error-mess'>{errorPassConf}</p>
                            </div>
                            <div className="auth__main-dop">
                            <p className='auth-text'>By continuing, you agree to Terms of Use and Privacy Policy.</p>
                            <div onClick={validAll} className="auth-button">
                                <Button text='Sign Up' color='#00D09E'></Button>
                            </div>
                            <p onClick={()=>dis(setLogOrSign(false))}>Already have an account? <span className='text-blue'>Log In</span></p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

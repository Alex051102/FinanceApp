import React, { useEffect, useState } from 'react'
import './AuthWelcome.css'
import Button from '../Button/Button'
import google from '../../assets/icons/Google.svg'
import facebook from '../../assets/icons/Facebook.svg'
import { useAppDispatch } from '../../hook'
import { setLogOrSign } from '../../store/financeSlice'
import db from '../../../db.json'
export default function AuthWelcome() {
    const dis=useAppDispatch();

    const [errorMessName,setErrorMessName]=useState('')
    const [errorMessPass,setErrorMessPass]=useState('')
    const [name,setName]=useState('')
    const [pass,setPass]=useState('')
    function validatePassword(password: string): { isValid: boolean; error?: string } {
        if (!password || password.trim() === '') {
            setErrorMessPass('поле не должно быть пустым')
            return { isValid: true };
        }
        // Можно добавить дополнительные проверки (длина, символы и т. д.)
        if (password.length > 16) {
            setErrorMessPass('слишком длинный пароль')
            return { isValid: true };
        }
        else{
            setErrorMessPass('')
        }
        return { isValid: true };
    }
    function validateName(name: string): { isValid: boolean; error?: string } {
        if (!name || name.trim() === '') {
            setErrorMessName('поле не должно быть пустым')
            return { isValid: true };
        }
        // Дополнительные проверки (только буквы, минимальная длина и т. д.)
        if (name.length < 2 && name.length >0) {
            setErrorMessName('поле должно быть более 2 символов')
            return { isValid: true };
        }
        else{
            setErrorMessName('')
        }
        return { isValid: true };
    }

   function mainValidate(){
        validateName(name)
        validatePassword(pass)
            const boolname=db.users.some(user=>user.name==name)
            
            const boolpass=db.users.some(user=>user.password==pass)

            console.log(boolname,boolpass)
            
                if(boolname && boolpass){
                    localStorage.setItem('user',name)
                    localStorage.setItem('auth','true')
                    window.location.reload()
                }
                else if(boolname){
                    
                    setErrorMessPass('пароль не подходит')
                }
                else if(boolpass){
                    setErrorMessName('такого пользователя не существует')
                }
                else if(!boolpass && !boolname){
                    setErrorMessName('неверно введенные данные')
                    setErrorMessPass('неверно введенные данные')
                }
                
                
      
        
    }
     
  return (
    <>
        <div className="auth">
            <div className="auth__container">
                <div className="auth__up">
                    <h1 className='auth__up-title'>Welcome!</h1>
                </div>
                <div className="auth__main">
                    <div className="auth__main-container">
                        <div className="auth__main-inputs">
                            <div className="auth__main-inputs-item">
                                <h5>Username Or email</h5>
                                <input onChange={(e)=>setName(e.target.value)} className='auth__main-input' placeholder='example@example.com' type="text" name="" id="" />
                                <p className='error-mess'>{errorMessName}</p>
                            </div>
                            <div className="auth__main-inputs-item">
                                <h5>Password</h5>
                                <input onChange={(e)=>setPass(e.target.value)} className='auth__main-input' type="text" name="" id="" />
                                <p className='error-mess'>{errorMessPass}</p>
                                
                            </div>
                        </div>
                        <div className="auth__main-buttons">
                            <div onClick={()=>{mainValidate()}} className="auth-button"><Button text='Log In' color='#00D09E'></Button></div>
                            <p className='auth__main-buttons-text'>Forgot Password?</p>
                            <div onClick={()=>dis(setLogOrSign(true))} className="auth-button"> <Button text='Sign Up' color="#DFF7E2"></Button></div>
                            <p>Use <span className='text-blue'>Fingerprint</span> to Access</p>
                        </div>
                        <div className="auth__main-sign-up-social">
                            <p>or sign up with</p>
                            <div className="auth__main-sign-up-social-images">
                                <img src={facebook} alt="" />
                                <img src={google} alt="" />
                            </div>
                        </div>
                        <p onClick={()=>dis(setLogOrSign(true))}>Don’t have an account? <span className='text-blue'>Sign Up</span></p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

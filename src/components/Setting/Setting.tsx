import  { useEffect, useState } from 'react'
import back from '../../assets/icons/back.svg'
import notif from '../../assets/icons/notif.svg'

import passs from '../../assets/icons/passwordSett.svg'
import account from '../../assets/icons/accounSett.svg'
import arrow from '../../assets/icons/arrowSett.svg'
import { Link } from 'react-router-dom'
import './Setting.css'
import Button from '../Button/Button'
import db from '../../../db.json'
import { useAppDispatch } from '../../hook'
import { setDeleteProfile,setNewPassword } from '../../store/financeSlice'
export default function Setting() {
    let pass:string= "" ;
    let id:string=' ';

    
    db.users.forEach(user=>{
        user.name==localStorage.getItem('user')?
        (pass=user.password,id=user.id.toString()):""})
    console.log(id)
    const [render,setRender]=useState('main');
    const [oldPass,setOldPass]=useState('')
    const [newPass,setNewPass]=useState('')
    const [newConfPass,setNewConfPass]=useState('')

    const [oldPassError,setOldPassError]=useState('')
    const [newConfPassError,setNewConfPassError]=useState('')

    const [deletePass,setDeletePass]=useState('')
    const [deleteError,setDeleteError]=useState('')


    const dis=useAppDispatch()

    useEffect(()=>{
        oldPass!=pass && oldPass.length>0?
        setOldPassError('Password is wrong'):setOldPassError('')

        newConfPass!=newPass?setNewConfPassError('passwords are no similiar'):setNewConfPassError("")
        
        
    },[oldPass,newConfPass,newPass])

    function tryDelete(){
        if (deletePass !== pass) {
            setDeleteError('Wrong Password');
            return; // Прерываем выполнение, если пароль неверный
        }
    
        if (!id || id.trim() === '') {
            console.error('User ID is empty');
            return;
        }
        dis(setDeleteProfile(true))
        
    }
    async function saveOperations() {

        
           try {
            
             const response = await fetch(`http://localhost:3000/users/${localStorage.getItem('userId')}`);
             const user = await response.json();
         
             if(oldPassError.length==0 && newConfPassError.length==0){
                 user.password=newPass;
             }
            
             
         
             
             await fetch(`http://localhost:3000/users/${localStorage.getItem('userId')}`, {
               method: "PUT",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(user)
             });
             dis(setNewPassword(true))
             console.log("Операция добавлена!");
             setTimeout(() => {
               dis(setNewPassword(false))
             }, 3000);
           } catch (error) {
             console.error("Ошибка:", error);
           }
         }
   
  return (
    <>
    {render=='main'?  <div className="setting">
        <div className="analyzis-search__up">
                        <div className="analyzis-search__up-container">
                            <div className="analyzis-search__up-nav">
                                
                                <Link to='/profile'><div className="analyzis-search__up-back"><img src={back} alt="" /></div></Link>
                                <div className="analyzis-search__up-text-outer"><h2 className='analyzis-search__up-text'>Setting</h2></div>
                                <div className="analyzis-search__up-notifications"><img src={notif} alt="" /></div>
                            </div>
                            
                            
                            
                        </div>
                        
        </div>
        <div className="setting__main">
                <div className="setting__main-container">
                    
                    <div className="setting__main-options">
                        <div className="setting__main-option">
                            <img src={passs} alt="" />
                            <p>Password Settings</p>
                            <img onClick={()=>setRender('pass')} src={arrow} alt="" />
                        </div>
                        <div className="setting__main-option">
                            <img src={account} alt="" />
                            <p>Delete Account</p>
                            <img onClick={()=>setRender('account')} src={arrow} alt="" />
                        </div>
                    </div>
                </div>
        </div>
    </div>:render=='pass'?<div className="setting">
        <div className="analyzis-search__up">
                        <div className="analyzis-search__up-container">
                            <div className="analyzis-search__up-nav">
                                
                                <img onClick={()=>setRender('main')} src={back} alt="" />
                                <div className="analyzis-search__up-text-outer"><h2 className='analyzis-search__up-text'>Setting</h2></div>
                                <div className="analyzis-search__up-notifications"><img src={notif} alt="" /></div>
                            </div>
                            
                            
                            
                        </div>
                        
        </div>
        <div className="setting__main">
                <div className="setting__main-container">
                    
                    <div className="setting__main-passwords">
                       <div className="setting__main-password">
                        <p>Current Password</p>
                        <input className='setting__main-password-input' onChange={(e)=>setOldPass(e.target.value)} value={oldPass} type="text" />
                        <p className='error-red'>{oldPassError}</p>
                       </div>
                       <div className="setting__main-password">
                        <p>New Password</p>
                        <input className='setting__main-password-input' onChange={(e)=>setNewPass(e.target.value)} value={newPass} type="text" />
                       </div>
                       <div className="setting__main-password">
                        <p>Confirm New Password</p>
                        <input className='setting__main-password-input' onChange={(e)=>setNewConfPass(e.target.value)} value={newConfPass} type="text" />
                        <p className='error-red'>{newConfPassError}</p>
                       </div>
                       <div onClick={saveOperations} className="setting__main-passwords-button">
                        <Button text='Change Password' color='#00D09E'></Button>
                       </div>
                    </div>
                </div>
        </div>
    </div>:<div className="setting">
        <div className="analyzis-search__up">
                        <div className="analyzis-search__up-container">
                            <div className="analyzis-search__up-nav">
                                
                                <img onClick={()=>setRender('main')} src={back} alt="" />
                                <div className="analyzis-search__up-text-outer"><h2 className='analyzis-search__up-text'>Setting</h2></div>
                                <div className="analyzis-search__up-notifications"><img src={notif} alt="" /></div>
                            </div>
                            
                            
                            
                        </div>
                        
        </div>
        <div className="setting__main">
                <div className="setting__main-container">
                    
                    <div className="setting__main-delete-account">
                       <h3>Are you sure you want to delete your account?</h3>
                       <div className="setting__main-delete-account-descr">
                        <div className="setting__main-delete-account-descr-container">
                            <p>This action will permanently delete all of your data, and you will not be able to recover it. Please keep the following in mind before proceeding:</p>
                            <ul className='setting__main-delete-account-descr-list'>
                                <li className='setting__main-delete-account-descr-lis-item'>All your expenses, income and associated transactions will be eliminated.</li>
                                <li className='setting__main-delete-account-descr-lis-item'>You will not be able to access your account or any related information.</li>
                                <li className='setting__main-delete-account-descr-lis-item'>This action cannot be undone.</li>
                            </ul>
                        </div>
                       </div>
                       <h3>Please enter your password to confirm deletion of your account.</h3>
                       <div className="setting__main-delete-account-input-outer">
                        <input onChange={(e)=>setDeletePass(e.target.value)} value={deletePass} className='setting__main-delete-account-input' type="text" />
                        <p className='error-delete-red'>{deleteError}</p>
                       </div>
                       
                       <div onClick={tryDelete} className="setting__main-delete-account-button">
                        <Button text='Yes, Delete Account' color='#00D09E'></Button>
                       </div>
                    </div>
                </div>
        </div>
    </div>}
  
       
       
    </>
  )
}

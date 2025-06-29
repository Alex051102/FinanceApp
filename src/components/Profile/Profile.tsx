import React from 'react'
import UsualUpPart from '../UsualUpPart/UsualUpPart'
import './Profile.css'
import profile from '../../assets/icons/Profile22.svg'
import setting from '../../assets/icons/Setting.svg'
import help from '../../assets/icons/Help.svg'
import logout from '../../assets/icons/Logout.svg'
import prof from '../../assets/icons/prof.svg'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hook'
import db from '../../../db.json'
import { setDeleteProfile,setLogOut } from '../../store/financeSlice'
export default function Profile() {
    let profileLogo:string=''
    db.users.forEach(user=>{
        user.name==localStorage.getItem('user')?
        profileLogo=user.avatar:""})
    const dis=useAppDispatch()
  return (
    <>
        <div className="profile">
            <UsualUpPart customMoney={true} arrow={true} text='Profile'></UsualUpPart>
            <div className="profile__main">
                <div className="profile__main-container">
                    <div className="profile__main-icon">
                        <img className='profile__main-icon-img' src={profileLogo} alt="" />
                    </div>
                        
                    <div className="profile__main-name">
                        <h2 className='profile__main-name-text'>{localStorage.getItem('user')}</h2>
                    </div>
                   
                    <div className="profile__main-options">
                        <Link to='/edit-profile'>
                        <div className="profile__main-option">
                            <img className='profile__main-option-img' src={profile} alt="" />
                            <p className='profile__main-option-text'>Edit Profile</p>
                        </div>
                        </Link>
                        <Link to='/setting'>
                        <div className="profile__main-option">
                            <img className='profile__main-option-img' src={setting} alt="" />
                            <p className='profile__main-option-text'>Setting</p>
                        </div>
                        </Link>
                        <Link to='/help'>
                        <div className="profile__main-option">
                            <img className='profile__main-option-img' src={help} alt="" />
                            <p className='profile__main-option-text'>Help</p>
                        </div>
                        </Link>
                        <div onClick={()=>dis(setLogOut(true))} className="profile__main-option">
                            <img className='profile__main-option-img' src={logout} alt="" />
                            <p className='profile__main-option-text'>LogOut</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </>
  )
}

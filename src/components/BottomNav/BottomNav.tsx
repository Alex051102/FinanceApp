import { useEffect, useState } from 'react'
import './BottomNav.css'
import home from '../../assets/icons/Home22.svg'
import analyz from '../../assets/icons/Analysis.svg'
import transactions from '../../assets/icons/Transactions.svg'
import category from '../../assets/icons/Category.svg'
import profile from '../../assets/icons/Profile.svg'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook'
import { setBackArrow } from '../../store/financeSlice'
export default function BottomNav() {
    const [curr,setCurr]=useState(0)
    const dis=useAppDispatch()
    const backer=useAppSelector(state=>state.finance.backArrow)

    useEffect(()=>{
        if(backer==true){
            setCurr(0)
        }
        dis(setBackArrow(false))
    },[backer])

  return (
    <>
        <div className="bottom-nav">
            <div className='bottom-nav__container'>
                <Link to='/'>
                <div onClick={()=>setCurr(0)} className={`bottom-nav__item ${curr==0?'current':""}`}>
                        <img className='bottom-nav__item-img' src={home} alt="" />
                    </div>
                </Link>
                <Link to='/analyzis'>
                <div onClick={()=>setCurr(1)} className={`bottom-nav__item ${curr==1?'current':""}`}>
                        <img className='bottom-nav__item-img' src={analyz} alt="" />
                    </div>
                </Link>
                <Link to='/transactions'>
                <div onClick={()=>setCurr(2)} className={`bottom-nav__item ${curr==2?'current':""}`}>
                        <img className='bottom-nav__item-img' src={transactions} alt="" />
                    </div>
                </Link>
                <Link to='/category'>
                <div onClick={()=>setCurr(3)} className={`bottom-nav__item ${curr==3?'current':""}`}>
                        <img className='bottom-nav__item-img' src={category} alt="" />
                    </div>
                </Link>
                <Link to='/profile'>
                <div onClick={()=>setCurr(4)} className={`bottom-nav__item ${curr==4?'current':""}`}>
                        <img className='bottom-nav__item-img' src={profile} alt="" />
                    </div>
                </Link>
            </div>
        </div>
    </>
  )
}

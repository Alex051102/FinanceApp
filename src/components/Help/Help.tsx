import { useState } from 'react'

import back from '../../assets/icons/back.svg'
import notif from '../../assets/icons/notif.svg'
import { Link } from 'react-router-dom'
import arr from '../..//assets/icons/faqArrow.svg'
import arrRight from '../../assets/icons/arrowSett.svg'
import './Help.css'
import facebook from '../../assets/icons/Bot-Facebook.svg'
import insta from '../../assets/icons/Bot-Instagram.svg'
import site from '../../assets/icons/Bot-Website.svg'
import whatssapp from '../../assets/icons/Bot-Whatssapp.svg'
export default function Help() {

    const [choice,setChoice]=useState('faq')
    const [q1,setQ1]=useState('')
    const [q2,setQ2]=useState('')
    const [q3,setQ3]=useState('')
    const [q4,setQ4]=useState('')
    const [q5,setQ5]=useState('')
    const [q6,setQ6]=useState('')
    const [k1,setK1]=useState(0)
    const [k2,setK2]=useState(0)
    const [k3,setK3]=useState(0)
    const [k4,setK4]=useState(0)
    const [k5,setK5]=useState(0)
    const [k6,setK6]=useState(0)
    function openQ(q:number){
        if(q==1){
            if(k1%2==0){
                setQ1('uhbkjn')
                setK1(k=>k+1)
            }
            else{setQ1('')
            setK1(k=>k+1)}
        }
        if(q==2){
            if(k2%2==0){
                setQ2('uhbkjn')
                setK2(k=>k+1)
            }
            else{setQ2('')
            setK2(k=>k+1)}
        }
        if(q==3){
            if(k3%2==0){
                setQ3('uhbkjn')
                setK3(k=>k+1)
            }
            else{setQ3('')
            setK3(k=>k+1)}
        }
        if(q==4){
            if(k4%2==0){
                setQ4('uhbkjn')
                setK4(k=>k+1)
            }
            else{setQ4('')
            setK4(k=>k+1)}
        }
        if(q==5){
            if(k5%2==0){
                setQ5('uhbkjn')
                setK5(k=>k+1)
            }
            else{setQ5('')
            setK5(k=>k+1)}
        }
        if(q==6){
            if(k6%2==0){
                setQ6('uhbkjn')
                setK6(k=>k+1)
            }
            else{setQ6('')
            setK6(k=>k+1)}
        }
    }

    
  return (
    <>
        <div className="help">
        <div className="analyzis-search__up">
                        <div className="analyzis-search__up-container">
                            <div className="analyzis-search__up-nav">
                                
                                <Link to='/profile'><img src={back} alt="" /></Link>
                                <div className="analyzis-search__up-text-outer"><h2 className='analyzis-search__up-text'>Setting</h2></div>
                                <div className="analyzis-search__up-notifications"><img src={notif} alt="" /></div>
                            </div>
                            
                            
                            
                        </div>
                        
        </div>
        <div className="help__main">
            <div className="help__main-container">
                <div className="help__main-title">
                    <h3>How Can We Help You?</h3>
                </div>
                
                <div className="help__main-panel">
                    <div className="help__main-panel-container">
                        <div onClick={()=>setChoice('faq')} className="help__main-panel-item">
                            <p className='help__main-panel-item-text'>FAQ</p>
                        </div>
                        <div onClick={()=>setChoice('contact')} className="help__main-panel-item">
                            <p className='help__main-panel-item-text'>Contact Us</p>
                        </div>
                    </div>
                   
                </div>

                {choice=='faq'?
                <>
                 <div className="help__main-faq">
                    <div className="help__main-faq-item">
                        <div onClick={()=>openQ(1)} className="help__main-question">
                            <p>How to use FinWise?</p>
                            <img src={arr} alt="" />
                        </div>
                      
                        <p>{q1}</p>
                        
                    </div>
                    <div className="help__main-faq-item">
                        <div onClick={()=>openQ(2)} className="help__main-question">
                            <p>How much does it cost to use FinWise?</p>
                            <img src={arr} alt="" />
                        </div>
                      
                        <p>{q2}</p>
                        
                    </div>
                    <div className="help__main-faq-item">
                        <div onClick={()=>openQ(3)} className="help__main-question">
                            <p>How can I reset my password if I forget it?</p>
                            <img src={arr} alt="" />
                        </div>
                      
                        <p>{q3}</p>
                        
                    </div>
                    <div className="help__main-faq-item">
                        <div onClick={()=>openQ(4)} className="help__main-question">
                            <p>Are there any privacy or data security measures in place?</p>
                            <img src={arr} alt="" />
                        </div>
                      
                        <p>{q4}</p>
                        
                    </div>
                    <div className="help__main-faq-item">
                        <div onClick={()=>openQ(5)} className="help__main-question">
                            <p>Can I customize settings within the application?</p>
                            <img src={arr} alt="" />
                        </div>
                      
                        <p>{q5}</p>
                        
                    </div>
                    <div className="help__main-faq-item">
                        <div onClick={()=>openQ(6)} className="help__main-question">
                            <p>How can I delete my account?</p>
                            <img src={arr} alt="" />
                        </div>
                      
                        <p>{q6}</p>
                        
                    </div>
                 </div>
                </>:<>
                <div className="help__main-contact">
                    <div className="help__main-contact-item">
                        <img src={site} alt="" />
                        <p>Website</p>
                        <a href="https://google.com"><img src={arrRight} alt="" /></a>
                    </div>
                    <div className="help__main-contact-item">
                        <img src={facebook} alt="" />
                        <p>Facebook</p>
                        <img src={arrRight} alt="" />
                    </div>
                    <div className="help__main-contact-item">
                        <img src={whatssapp} alt="" />
                        <p>Whatssapp</p>
                        <img src={arrRight} alt="" />
                    </div>
                    <div className="help__main-contact-item">
                        <img src={insta} alt="" />
                        <p>Instagram</p>
                        <img src={arrRight} alt="" />
                    </div>
                    
                </div>
                </>}
            </div>
        </div>
        </div>
    </>
  )
}

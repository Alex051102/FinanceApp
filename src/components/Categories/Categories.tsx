import { useState } from 'react'
import UsualUpPart from '../UsualUpPart/UsualUpPart'
import './Categories.css'
import salary from '../../assets/icons/Salary.svg'
import rent from '../../assets/icons/Rent2.svg'
import transport from '../../assets/icons/Transport2.svg'
import food from '../../assets/icons/Food2.svg'
import entertaiment from '../../assets/icons/Entertainment.svg'
import groceries from '../../assets/icons/Groceries.svg'
import gift from '../../assets/icons/Gift.svg'
import medecine from '../../assets/icons/Medicine.svg'
import more from '../../assets/icons/More.svg'
import CategoriesTrans from '../CategoriesTrans/CategoriesTrans'
export default function Categories() {
    const [content,setContent]=useState(false)
    const [type,setType]=useState(['',''])


    function setterContent(b:boolean){
        setContent(false)
    }
    
  return (
   <>
       
            
{content==false?  <div className="categories">
                        <UsualUpPart text='Categories' arrow={true} customMoney={false}></UsualUpPart>
                        <div className="categories__main">
                            <div className="categories__main-container">
                                <div className="categories__main-types">
                                    <div className="categories__main-item">
                                        <img onClick={()=>{setContent(true);setType(['food','Food'])}} className='categories__main-item-img' src={food} alt="" />
                                        <p>Food</p>
                                    </div>
                                    <div className="categories__main-item">
                                        <img onClick={()=>{setContent(true);setType(['transport','Transport'])}} className='categories__main-item-img'  src={transport} alt="" />
                                        <p>Transport</p>
                                    </div>
                
                                    <div className="categories__main-item">
                                        <img onClick={()=>{setContent(true);setType(['medecine','Medecine'])}} className='categories__main-item-img'  src={medecine} alt="" />
                                        <p>Medecine</p>
                                    </div>
                                    <div className="categories__main-item">
                                        <img onClick={()=>{setContent(true);setType(['groceries','Groceries'])}} className='categories__main-item-img'  src={groceries} alt="" />
                                        <p>Groceries</p>
                                    </div>
                                    <div className="categories__main-item">
                                        <img onClick={()=>{setContent(true);setType(['rent','Rent'])}} className='categories__main-item-img'  src={rent} alt="" />
                                        <p>Rent</p>
                                    </div>
                                    <div className="categories__main-item">
                                        <img onClick={()=>{setContent(true);setType(['gift','Gifts'])}} className='categories__main-item-img'  src={gift} alt="" />
                                        <p>Gifts</p>
                                    </div>
                                    <div className="categories__main-item">
                                        <img  onClick={()=>{setContent(true);setType(['enterteiment','Enterteiment'])}} className='categories__main-item-img'  src={entertaiment} alt="" />
                                        <p>Enterteiment</p>
                                    </div>
                                    <div className="categories__main-item">
                                        <img onClick={()=>{setContent(true);setType(['salary','Salary'])}} className='categories__main-item-img'  src={salary} alt="" />
                                        <p>Salary</p>
                                    </div>
                                    <div className="categories__main-item">
                                        <img onClick={()=>{setContent(true);setType(['more','More'])}} className='categories__main-item-img'  src={more} alt="" />
                                        <p>More</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
            :<CategoriesTrans setterContent={setterContent} type={type}></CategoriesTrans>}
                  
                    
             
        
   </>
  )
}

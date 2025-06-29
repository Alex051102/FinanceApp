import React from 'react'
import './ShortPopUp.css'
interface MyComponentProps {
    text: string;
   
  }
const ShortPopUp: React.FC<MyComponentProps> = ({text}) =>  {
  return (
    <>
    <div className="modal">
        <div className="pop-up-short">
            
                <p className='pop-up-short__text'>{text}</p>
           
        </div>
    </div>
    </>
  )
}

export default ShortPopUp

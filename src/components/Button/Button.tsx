import React from 'react'
import './Button.css'

interface MyComponentProps {
    text: string;
    color: string; 
  }
const Button: React.FC<MyComponentProps> = ({ text,color }) =>  {
  return (
    <>
        <div className="button-outer">
            <button style={{backgroundColor:`${color}`}} className='button'>{text}</button>
        </div>
    </>
  )
}

export default Button

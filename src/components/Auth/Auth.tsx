import React from 'react'
import AuthWelcome from '../AuthWelcome/AuthWelcome'
import { useAppDispatch, useAppSelector } from '../../hook'
import AuthSign from '../AuthSign/AuthSign';

export default function Auth() {
    const dis=useAppDispatch()
    const boolA = useAppSelector((state) => state.finance.logOrSign);
   
  return (
    <>

      {boolA==false? <AuthWelcome></AuthWelcome>:<AuthSign></AuthSign>}
       
    </>
  )
}


import AuthWelcome from '../AuthWelcome/AuthWelcome'
import { useAppSelector } from '../../hook'
import AuthSign from '../AuthSign/AuthSign';

export default function Auth() {
    
    const boolA = useAppSelector((state) => state.finance.logOrSign);
   
  return (
    <>

      {boolA==false? <AuthWelcome></AuthWelcome>:<AuthSign></AuthSign>}
       
    </>
  )
}

import React from 'react'
import Button from '../Button/Button';
import { useAppDispatch } from '../../hook';
import { setDeleteProfileButt,setLogOutButt,setDeleteProfile,setLogOut } from '../../store/financeSlice';
import './BigPopUp.css'
interface MyComponentProps {
    textTitle: string;
    textMain:string;
    textButton:string;
    textOne:string;
   
  }
const BigPopUp: React.FC<MyComponentProps> = ({textTitle, textMain,textButton,textOne}) =>  {
    async function deleteAccount() {
            
        
        try {
            const response = await fetch(`http://localhost:3000/users/${localStorage.getItem('userId')}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            console.log("Account deleted successfully!");
            // Дополнительные действия после удаления (например, редирект)
        } catch (error) {
            console.error("Delete error:", error);
            
        }
    }
    const dis=useAppDispatch()

    function cancel(){
        if(textOne.length>0){
            
            dis(setDeleteProfile(false))
        }
        else{
            dis(setLogOut(false))
        }
    }

    function ending(){
        if(textOne.length>0){
            deleteAccount()
            dis(setDeleteProfileButt(true))
        }
        else{
           
            dis(setLogOutButt(true))
        }
    }
  return (
    <>
        <div className="modal">
        <div className="pop-up-big">
            <div className="pop-up-big__container">
            <div className="pop-up-big__text">
                <h2>{textTitle}</h2>
                <p>{textOne}</p>
                <p>{textMain}</p>
            </div>
            <div className="pop-up-big__button">
                <div onClick={ending} className="pop-up-big__button-item">
                    <Button color='#00D09E' text={textButton}></Button>
                </div>
                <div onClick={cancel} className="pop-up-big__button-item">
                    <Button color='#DFF7E2' text="Cancel"></Button>
                </div>
                    
                   
                
            </div>
            </div>
            
                
           
        </div>
    </div>
    </>
  )
}

export default BigPopUp

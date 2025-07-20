
import UsualUpPart from '../UsualUpPart/UsualUpPart'
import db from '../../../db.json'
import notifUsual from '../../assets/icons/notifUsual.svg'
import './Notification.css'
export default function Notification() {
    type Notif ={
          time:string,
          day:string,
          month:string,
          title:string,
          body:string,
          dop:string [],
    }

    let notifs:Notif[]=[]
    db.users.forEach(user=>{
        user.name==localStorage.getItem('user')?
        user.notifiactions.forEach(n=>{
            notifs.push(n)
        }):""})
  return (
    <>

        
        <div className="notification">
            <UsualUpPart text='Notification' customMoney={true} arrow={true}></UsualUpPart>
            <div className="notification__main">
                <div className="notification__main-container">
                    {notifs.map(n=>(
                        <div className="notification__main-item">
                            <div className="notification__main-item-container">
                            <div className="notification__main-item-info">
                                <div className="notification__main-item-part">
                                    <img src={notifUsual} alt="" />
                                </div>
                                <div className="notification__main-item-part">
                                    <div className="notification__main-item-text">
                                        <h3>{n.title}</h3>
                                        <p>{n.body}</p>
                                        <div className="notification__main-item-text-dop">
                                        {n.dop.map((n,i)=>(
                                            i!=2?
                                            <p className='notification__main-item-text-dop-part'>{n} |</p>
                                            :<p className='notification__main-item-text-dop-part'>{n}</p>
                                        ))}
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                            <div className="notification__main-item-date">
                                <p className='notification__main-item-date-text'>{n.time} - {n.month} {n.day}</p>
                            </div>
                            </div>
                            
                            
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

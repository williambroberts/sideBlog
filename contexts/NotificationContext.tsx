"use client"
import React,{createContext,useContext,useEffect,useState} from 'react'
type NotificationContextValues = {
notification:any;
notificationTime:number;
openNotification:boolean;
setOpenNotification:Function;
setNotification:Function;
reAuthState:any;
setReAuthState:Function;
notificationHandler:Function;
}
type ChildrenProp = {
children:React.ReactNode;

}
const NotificationContext = createContext<NotificationContextValues| undefined>(undefined)
const NotificationProvider = ({children}:ChildrenProp) => {
   
  const [reAuthState,setReAuthState]=useState<any>({type:"",message:"",open:false})
  const [notification,setNotification]=useState<any>({type:"",message:""})
    const [notificationTime,setNotificationTime]=useState<number>(3000)
    const [openNotification,setOpenNotification]=useState<boolean>(false)

    function notificationHandler(type,message){
      setNotification((prev)=>({type:type,message:message}))
      setOpenNotification((prev)=>true)
    }

    const NotificationValue = {
      notificationHandler:notificationHandler,
      reAuthState:reAuthState,setReAuthState:setReAuthState,
notification:notification,
setNotification:setNotification,
setOpenNotification:setOpenNotification,
openNotification:openNotification,
notificationTime:notificationTime,
    }
  return (
    <NotificationContext.Provider value={NotificationValue}>
    {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
export function useNotifications(): NotificationContextValues {
    const notificationContext = useContext(NotificationContext);
    if (!notificationContext) {
      throw new Error('useNoifications must be used within NotificationProvider');
    }
    return notificationContext;
  }
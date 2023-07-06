"use client"
import React,{createContext,useContext,useEffect,useState} from 'react'
type NotificationContextValues = {
notification:string;
notificationTime:number;
openNotification:boolean;
setOpenNotification:Function;
setNotification:Function;
}
type ChildrenProp = {
children:React.ReactNode;

}
const NotificationContext = createContext<NotificationContextValues| undefined>(undefined)
const NotificationProvider = ({children}:ChildrenProp) => {
    const [notification,setNotification]=useState<string>("")
    const [notificationTime,setNotificationTime]=useState<number>(1000)
    const [openNotification,setOpenNotification]=useState<boolean>(false)
    const NotificationValue = {
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
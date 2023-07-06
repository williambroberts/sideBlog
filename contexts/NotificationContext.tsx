import React,{createContext,useContext,useEffect,useState} from 'react'
type NotificationContextValues = {

}
type ChildrenProp = {
notification:string;
}
const NotificationContext = createContext({})
const NotificationProvider = ({children}) => {
    const [notification,setNotification]=useState<string>("")
    const [notificationTime,setNotificationTime]=useState<number>(1000)
    const [openNotification,setOpenNotification]=useState<boolean>(false)
    const NotificationValue = {

    }
  return (
    <NotificationContext.Provider value={NotificationValue}>
    {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
export function useNotifications(): NotificationContextValues {
    const authContext = useContext(NotificationContext);
    if (!authContext) {
      throw new Error('useNoifications must be used within NotificationProvider');
    }
    return authContext;
  }
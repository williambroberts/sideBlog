"use client"
import React,{createContext,useState,useEffect,useContext} from 'react'
import { firebase_app,storage,auth,firestore } from '../firebase/firebaseConfig'
import { createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,sendPasswordResetEmail,
    signInWithEmailAndPassword, 
    GoogleAuthProvider,
    signInWithPopup} from 'firebase/auth'
import { setDoc,doc,getDoc } from 'firebase/firestore'
import profile from '../app/write/components/profile/profile'
type AuthContextValues = {
    user?:any;
    signIn:Function;
    signUp:Function;
    signOut:Function;
    googleSignIn:Function;
    resetPassword:Function;
    userDocData?:any;
    setUserDocData?:Function;
    setIsAdmin:Function;
    isAdmin:boolean;
    setProfileUserUid:Function;
    profileUserUid:string;
    AdminEditing:any;
    setAdminEditing:Function
    RemoteUserData:any;
    setRemoteUserData:Function;
    newProfilePhotoSetter:any;
    setNewProfilePhotoSetter:Function;
    newCoverPhotoSetter:any;
    setNewCoverPhotoSetter:Function;
    localUserData:any;
    setLocalUserData:Function;
    newPassword:any;
    setNewPassword:Function;
}
type ChildrenProp = {
    children:React.ReactNode
}
const AuthContext = createContext<AuthContextValues | undefined>(undefined)
const AuthProvider = ({children}:ChildrenProp) => {
  const [newPassword,setNewPassword]=useState({first:"",second:""})

  const [profileUserUid,setProfileUserUid]=useState<string|null>(null)
  const [RemoteUserData,setRemoteUserData]=useState(null)
  const [localUserData,setLocalUserData]=useState(null)
    const [user,setUser]=useState<any|null|undefined>({})
    const [isAdmin,setIsAdmin]=useState<boolean>(false)
    const [AdminEditing,setAdminEditing] = React.useState<boolean>(false)
    const [newCoverPhotoSetter,setNewCoverPhotoSetter]=useState<any>({seeBtn:false,oldUrl:""})

    const [newProfilePhotoSetter,setNewProfilePhotoSetter]=useState<any>({seeBtn:false,oldUrl:""})
    const [userDocData,setUserDocData]=useState<object|null|undefined>(null)
    const AuthValue= {
      newPassword:newPassword,setNewPassword:setNewPassword,
      setLocalUserData:setLocalUserData,localUserData:localUserData,
      newCoverPhotoSetter:newCoverPhotoSetter,
      setNewCoverPhotoSetter:setNewCoverPhotoSetter,
      setNewProfilePhotoSetter:setNewProfilePhotoSetter,
      newProfilePhotoSetter:newProfilePhotoSetter,
      RemoteUserData:RemoteUserData,setRemoteUserData:setRemoteUserData,
      AdminEditing:AdminEditing,setAdminEditing:setAdminEditing,
      setProfileUserUid:setProfileUserUid,profileUserUid:profileUserUid,
        user:user,setIsAdmin:setIsAdmin,isAdmin:isAdmin,
        signIn:signIn,
        signOut:logOut,
        signUp:signUp,
        resetPassword:resetPassword,
        googleSignIn:googleSignIn,
        userDocData:userDocData,setUserDocData:setUserDocData,
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          //console.log("currentuser",currentUser)
            setUser(currentUser);
          });
          return () => {
            unsubscribe();
          };
    },[])

    const getUserDocForProfileUserUid =async (userUid)=> {
      //🧧get userDOc FB for whoRef for thier profile
      try {
        let docRef = doc(firestore,"users",userUid)
      const snapShot:any = await getDoc(docRef)
      if (snapShot.exists()){
        //console.log(snapShot.data())
        setRemoteUserData(({...snapShot.data()}))
      }
      }catch(err){
        console.log(err)
      }
    }
     useEffect(()=>{

        profileUserUid && getUserDocForProfileUserUid(profileUserUid)
      
        if (RemoteUserData===null && profileUserUid!==undefined){
          getUserDocForProfileUserUid(profileUserUid)
          
        }else if (RemoteUserData===null && profileUserUid===undefined){
          if (user?.uid!==undefined && user?.uid!==null){
            getUserDocForProfileUserUid(user?.uid)
            setProfileUserUid(user.uid)
          }
          
        }
      

     },[profileUserUid])
    const getUserDoc =async ()=>{
        if (user===null)return;

        
         
        
        
        console.log("user",user.uid)
        try {
          let docRef = doc(firestore,"users",user.uid)
        const snapShot = await getDoc(docRef)
        if (snapShot.exists()){
          //console.log(snapShot.data())
          setUserDocData({...snapShot.data()})
          if (snapShot.data().admin===true){
            setIsAdmin((prev)=>true)
          }
        }
        }catch(err){
          console.log(err)
        }
        
      }
      useEffect(()=>{

        user && getUserDoc()
        
      },[user])
    async function resetPassword(email:string):Promise<{ result: any, error: any }>{
        let result=null, error=null
       try{
        result = await sendPasswordResetEmail(auth, email)
       } catch(err){
        error=err
       }
       return {result,error}
    }
    async function googleSignIn():Promise<{ result: any, error: any }>{
        let result=null,error=null
        const provider = new GoogleAuthProvider()
        try {
            result = await signInWithPopup(auth,provider)
        }catch(err){
            console.log(err)
        }
        return {result,error}
    }
    async function signUp (email,password) {
        let result = null, error=null
        try {
            result = await createUserWithEmailAndPassword(auth,email,password)
        }catch (err){
             error=err
        }
       if (error){
        console.log(error)
        return
       }else {
       
       }
       return {result,error}
    }

    async function logOut() {
        let result = null, error = null
         try {
            result = await signOut(auth);
         }catch (err){
            error=err
         }
         return {result,error}
      }
    
      async function signIn(email, password) {
        let result = null, error = null
         try {
            result = await signInWithEmailAndPassword(auth, email,password);
         }catch (err){
            error=err
         }
         return {result,error}
      }

  return (
   <AuthContext.Provider value={AuthValue}>
    {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider

export function useAuth(): AuthContextValues {
    const authContext = useContext(AuthContext);
    if (!authContext) {
      throw new Error('useAuth must be used within AuthProvider');
    }
    return authContext;
  }
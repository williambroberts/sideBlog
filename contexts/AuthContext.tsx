"use client"
import React,{createContext,useState,useEffect,useContext} from 'react'
import { firebase_app,storage,auth,firestore } from '../firebase/firebaseConfig'
import { createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,sendPasswordResetEmail,
    signInWithEmailAndPassword, 
    GoogleAuthProvider,
    signInWithPopup} from 'firebase/auth'
import { setDoc,doc } from 'firebase/firestore'
type AuthContextValues = {
    user?:any;
    signIn:Function;
    signUp:Function;
    signOut:Function;
    googleSignIn:Function;
    resetPassword:Function;
}
type ChildrenProp = {
    children:React.ReactNode
}
const AuthContext = createContext<AuthContextValues | undefined>(undefined)
const AuthProvider = ({children}:ChildrenProp) => {
    const [user,setUser]=useState<object|null|undefined>({})

    const AuthValue= {
        user:user,
        signIn:signIn,
        signOut:logOut,
        signUp:signUp,
        resetPassword:resetPassword,
        googleSignIn:googleSignIn,
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          });
          return () => {
            unsubscribe();
          };
    },[])
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
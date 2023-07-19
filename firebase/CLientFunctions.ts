import { doc, getDoc, runTransaction } from "firebase/firestore"
import { auth, firestore } from "./firebaseConfig"
import { useCallback, useState } from "react"
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"

export async function getBlogReadTime (content){
 //return time in mins to read the blog
 const rate = 200
 let numOfWords = content.split(" ").length
return Math.round(numOfWords/rate)+1
}


export function TagFilter(tags) {
    //.👍🏻return unique tags
    let setOfTags = new Set(tags)
    return Array.from(setOfTags)

}

export function debounceContent(){
    
}

export async function getUserDoc(userUid) {
    if (userUid===null||userUid===undefined){return};
    const docRef = doc(firestore,"users",userUid)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()){
        return {...docSnapshot.data()}   
    }
}

export function handleBlur(initial,unwanted,event,setState){
    if (event.target.value===unwanted){
        setState(initial)
        
    }
}

export async function getABlogFromFirebase(blogId){
    if (blogId===null||blogId===undefined){return};
 const docRef = doc(firestore,"Blogs",blogId)
 const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()){
        //console.log(docSnapshot.data())
        return {...docSnapshot.data()}   
    }
}
export function useBoolean(initial=false){
    const [value,setValue]=useState<boolean>(initial)
    const handleChange:Function= useCallback(()=>{
        setValue((prev)=>!prev)
    },[])
    return [value,handleChange,initial]
}

export async function updateBlogViews(id){
    console.log(id,"👍🏻","blog")
    const docRef = doc(firestore,"Blogs",id)
    try {
        await runTransaction(firestore, async (transaction) => {
          const sfDoc = await transaction.get(docRef);
          if (!sfDoc.exists()) {
            throw "Document does not exist!";
          }
          let docData = sfDoc.data()
          let newViews = docData.views+1  
          transaction.update(docRef,{views:newViews} );
        });
        //console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }
}


export async function updateUserDoc(id,data,errorHandler){
    try {
        let docRef = doc(firestore,"users",id)
        await runTransaction(firestore, async (t)=>{
          const docSnapShot = await t.get(docRef)
          if (!docSnapShot.exists()){
            //❤️check erros
            console.log("error,no snapshot")
            return
          }
          t.update(docRef,{...data})
        })
      }catch (error){
        console.log(error)
        errorHandler(error)
      }
}


export async function reAuthenticatetheCurrentUser(userProvidedPasswordFromInputField,next){
    let result = null, error=null
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        userProvidedPasswordFromInputField
    )
    reauthenticateWithCredential(
        auth.currentUser, 
        credential
    ).then(()=>{
        //run update email function 👍🏻
        next()
    }).catch((error)=>console.log(error))
}


export function applyImgDisplayStyles (){
    // let display = document.querySelector(".display")
    // let children = display.children
    // for (let i=0;i<){
    //     if (child.tagName.toLowerCase()==="img"){
    //         console.log(child)
    //     }
    // }
}
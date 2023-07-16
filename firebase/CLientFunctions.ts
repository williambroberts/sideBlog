import { doc, getDoc, runTransaction } from "firebase/firestore"
import { firestore } from "./firebaseConfig"
import { useCallback, useState } from "react"

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
    const handleChange= useCallback(()=>{
        setValue((prev)=>!prev)
    },[])
    return [value,handleChange,initial]
}

export async function updateBlogViews(blog){
    console.log(blog.views,blog.id,"👍🏻")
    const docRef = doc(firestore,"Blogs",blog.id)
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
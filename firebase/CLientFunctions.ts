import { doc, getDoc } from "firebase/firestore"
import { firestore } from "./firebaseConfig"

export function getBlogReadTime (content){
 //return time in mins to read the blog
 const rate = 200
 let numOfWords = content.split(" ").length
return Math.round(numOfWords/rate)
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
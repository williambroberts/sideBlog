export function getBlogReadTime (content){
 //return time in mins to read the blog
 const rate = 200
 let numOfWords = content.split(" ").length
return Math.round(numOfWords/rate)
}


export function TagFilter() {
    //.👍🏻return unique tags
}
export interface BlogItem {
    content:string;
    uploadedImages:string[];
    deletedImages:string[];
    title:string;
    coverImage:string;
    views:number;
    author:string;
    authorId:string;
    tags:string[];
    category:string;
    dateCreation:string;
    id:string;
    latestUpdateTime:string;
    userPhoto:string;
    userSocials:object;
}
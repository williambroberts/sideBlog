"use client"
import React, { useState } from 'react'
import InputReusable from '../../app/signUp/components/inputReusable'
import Button from '../../app/write/components/addTags/button'
import IconSearch from './searchIcon'
import { useBlogs } from '../../contexts/BlogContext'
import styles from "./searchbar.module.css"
type theProps= {
  filterByAuthor?:boolean;
  userArg?:string;
}
const SearchBar = ({filterByAuthor,userArg}:theProps) => {
    const {handleSearch}=useBlogs()
    const {blogs,setBlogs}=useBlogs()
    const [text,setText]=useState<string>("")
    const handleSubmit = (e)=>{
        e.preventDefault()
        //❤️search quesry firebase
        console.log("search",text,filterByAuthor,userArg)
        //💭quiery, filter, userArg
        handleSearch(text,filterByAuthor,userArg)

    }
  return (
    <form onSubmit={handleSubmit}
    className={styles.search__form}
    >
        <label htmlFor='search-input'>

        </label>
        <InputReusable
        className=''
        name='search-input'
        placeholder='Search'
        required={false}
        type='text'
        value={text}
        handleChange={(e)=>setText(e.target.value)}
        />
        <button className='text-[var(--t-1)]'
        type='submit'><IconSearch/></button>
        </form>
  )
}

export default SearchBar
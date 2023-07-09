"use client"
import React, { useState } from 'react'
import InputReusable from '../../app/signUp/components/inputReusable'
import Button from '../../app/write/components/addTags/button'
import IconSearch from './searchIcon'
import { useBlogs } from '../../contexts/BlogContext'

const SearchBar = () => {
    const {handleSearch}=useBlogs()
    const {blogs,setBlogs}=useBlogs()
    const [text,setText]=useState<string>("")
    const handleSubmit = (e)=>{
        e.preventDefault()
        //❤️search quesry firebase
        console.log("search",text)
        handleSearch(text)

    }
  return (
    <form onSubmit={handleSubmit}
    className='search__form'
    >
        <label htmlFor='search-input'>

        </label>
        <InputReusable
        className=''
        name='search-input'
        placeholder='Search'
        required
        type='text'
        value={text}
        handleChange={(e)=>setText(e.target.value)}
        />
        <button
        type='submit'><IconSearch/></button>
        </form>
  )
}

export default SearchBar
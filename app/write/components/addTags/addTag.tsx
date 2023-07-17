"use client"
import React,{useState,memo} from 'react'
import InputReusable from '../../../signUp/components/inputReusable'
import IconSave from '../../../../icons/save'
import { useWrite } from '../../../../contexts/writeContext'
import { TagFilter } from '../../../../firebase/CLientFunctions'
import IconTags from '../../../../icons/tags'

const AddTag = () => {
  const {localBlog,setLocalBlog,setHasChanged,hasChanged}=useWrite()
  const [tag,setTag]=React.useState<string>("")
  const [save,setSave]=useState<boolean>(false)
  const handleChange = (e)=>{
    if (save){
      setSave(false)
    }
    setTag((prev)=>e.target.value)
    

  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    setSave(true)
    let newLocalBlog={...localBlog}
    newLocalBlog.tags.push(tag)
    let newTagArr = TagFilter(newLocalBlog.tags)
    //console.log(newLocalBlog.tags)

    setLocalBlog((prev)=>({...prev,tags:newTagArr}))
    setTag("")
    if(!hasChanged){
      setHasChanged((prev)=>true)
    }
  }
  return (
    <form className='add__tag'
    onSubmit={handleSubmit}
    >
      <InputReusable
      name='tag-input'
      value={tag}
      handleChange={(e)=>handleChange(e)}
      className="add__tag__input"
      placeholder='Add tag'
      required={true}
      type='text'
      />
      <button 
      disabled={save}
      type='submit'
      className='add__tag__btn'>
        <IconSave/> <IconTags/>
      </button>

    </form>
  )
}

export default memo(AddTag)
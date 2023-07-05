import React,{} from 'react'
type inputReusableProps = {
    type:string;
    value:string;
    handleChange:React.ChangeEventHandler<HTMLInputElement>;
    name:string;
    required:boolean;
    placeholder:string;

}
const InputReusable = ({type,value,name,handleChange,required,placeholder}:inputReusableProps) => {
  return (
   <input type={type} value={value} 
   placeholder={placeholder}
   required={required}
   onChange={handleChange}/>
  )
}

export default InputReusable
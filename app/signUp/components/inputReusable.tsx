import React,{} from 'react'
type inputReusableProps = {
    type:string;
    value:string;
    handleChange:React.ChangeEventHandler<HTMLInputElement>;
    name?:string;
    required?:boolean;
    placeholder:string;
    className?:string;

}
const InputReusable = ({type,
  className
  ,value,name,handleChange,
  required,placeholder}:inputReusableProps) => {
  return (
   <input
   name={name}
   className={className? className :"input__reusable"}
   type={type} value={value} 
   placeholder={placeholder}
   required={required}
   onChange={handleChange}/>
  )
}

export default InputReusable
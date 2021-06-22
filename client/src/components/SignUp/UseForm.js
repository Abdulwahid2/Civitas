import {useState,useEffect} from 'react'

const UseForm = () => {
    const [values,setValues]= useState({
        FirstName:"",
        LastName:"",
        Email:"",
        PhoneNumber:"",
        Address:"",
        Password:"",
        ConfirmPassword:"",
    });
    // this will handle the errors 
    const[error,setError]=useState({});
    const[isSubmitting,setIsSubmitting]=useState(false);
    const[error,setError]=useState(false);
    //handle change = when you chang somthing will update the value 
    //e =events
    const handleChange = e => {
        const {name,value}= e.target;
        setValues ({
            ...values,// spreading the values  , targets in the name singup 
            [name]: value 
        })
    } 
    useEffect(
        () => {
            if(Object.keys(errors).length===0 && isSubmitting){
                callback();

            }
        },
        [errors]
    )
    return {handleChange, values, handleSubmit , errors}
}

export default UseForm

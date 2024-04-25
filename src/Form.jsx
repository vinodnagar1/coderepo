import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Form() {
    let {id}= useParams()
    let navigate=useNavigate()
    let[obj,setobj] =useState({
        name:"",
    contact:"",
    email:"",
    address:"",
    img:""

    })
    function change(e){
        let{name,value}= e.target
        setobj((pre)=>{
            return {...pre,[name]:value}
        })





    }
    function next(){
        axios.patch(`http://localhost:8000/data/${id}`,obj).then((data)=>{
            window.location.reload()
            console.log("data updated successfully")
            console.log(data.data)

        }).catch((err)=>console.log("patch api failed",err))
        setobj({
            name:"",
    contact:"",
    email:"",
    address:"",
    img:""
     } )
     navigate("/")


    }
    function back(){
        navigate("/")
       }
  return (
     
    <div id="one">
        <h2 id="one1">Physical details</h2>
        
        <p id="one2">Name</p> <input type="text" id="to14" name='name' onChange={change}/>
        
        <p id="one3">Contact</p> <input type="text" id="to15" name='contact' onChange={change}/>
        
        <p id="one4">Email</p> <input type="email" id="to16" name='email' onChange={change}/>
        
        <p id="one5">Address</p> <input type="text" id="to17" name='address' onChange={change}/>
        
        <p id="one6">Profile pic</p> <input type="file" id="to18" name='img' onChange={change}/>
        
        <button onClick={back} id="to19">back</button>

        <button onClick={next} id="to20">save</button>
        
        </div>
      
  )
}

export default Form

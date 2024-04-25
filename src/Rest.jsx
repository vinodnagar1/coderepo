import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Rest() {
    let navigate=useNavigate()
    const[restarray,setrestarray]=useState([])
    function click(e,id,type){
        if(type==="delete"){
            window.confirm("Are you sure you want to delete this data")
            axios.delete(`http://localhost:8000/data/${id}`).then((data)=>{
                console.log("data deleted succeessfully")
                
              }).catch(((error)=>{
                console.log("delete api failed")
                console.log(error)
              }))
              //window.location.reload()
        }
        else{
            navigate(`/form/${id}`)

        }


    }
    
  useEffect(()=>{
    (()=>{
      axios.get(`http://localhost:8000/data`).then((data)=>{
        console.log("data fetched succeessfully")
        setrestarray(data.data)
        
      }).catch(((error)=>{
        console.log("fetch api failed")
        console.log(error)
      }))
    })()



  },[restarray])
  function add(){
    navigate("/forma")
  }
  return (
    
    <center>
    <h1>Api records</h1>
    <table>
    <tr>
<th>sr. no. </th>
<th>Name</th>
<th>Contact</th>
<th>Email</th>
<th>Address</th>
<th>Profile picture</th>
<th>Edit</th>
<th>Delete</th>
</tr>
{ restarray.length>0 ? restarray.map((ele,index)=>{
          return(
            <>
            <tr>
            <td>{index+1}</td>
            <td>{ele.name}</td>
            <td>{ele.contact}</td>
            <td>{ele.email}</td>
            <td>{ele.address}</td>
            <td><img style={{width:"100%",height:"100%"}} src={ele.img} alt='img not found'/></td>
            <td><button onClick={(e)=>{
             click(e,ele.id,"update")
            }} >update</button></td>
            <td><button  onClick={(e)=>{
              click(e,ele.id,"delete")
            }}>Delete</button></td>
        </tr>

            </>
          )
        })
        
         : <h1>Loading...</h1>

        }




</table>
<button onClick={add} className='add'>Add data</button>
</center>
  )
}

export default Rest

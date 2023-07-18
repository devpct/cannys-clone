import React, { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'

function Home() {
  
  const FormPage = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('username') === null){
      FormPage('/signup')
    }
  },[])

    return (
    <>
    <h1>Home</h1>
    </>
  )
}

export default Home
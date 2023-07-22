import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Data from '../../hooks/users/Data'
import Add from '../../hooks/feedback/Add'
import './home.scss'

function Home() {

  const [userData, setUserData] = useState(null)
  const [addFeddbackClick, setAddFeedbackClick] = useState(false)
  const [userFeedback, setUserFeedback] = useState()

  const FormPage = useNavigate()

  useEffect(()=>{
    document.title = 'Cannys Clone'
    if(localStorage.getItem('username') === null){
      FormPage('/signup')
    }
    document.documentElement.style.background = 'linear-gradient(90deg, #c9cadf, #5f66f7)';
    document.body.style.background = 'linear-gradient(90deg, #c9cadf, #5f66f7)';
    },[])

  const addFeddback = ()=>{
    setAddFeedbackClick(true)
  }

  return (
    <>
    {userData === null ? (
      <span></span>
    ) : userData.length !== 0 && (
      <div className="container">
        <div className="box-add-comment">
          <div className="data-user">
            <img src={userData.image} alt="" />
            <p>{userData.name}</p>
          </div>
          <div className="feedback">
            <textarea maxLength={500} placeholder='Write your feedback...'></textarea>
            <button onClick={addFeddback}>Add FeedBack</button>
          </div>
        </div>
      </div>
    )}
    <Data
      userData={userData}
      setUserData={setUserData}
    />
    </>
  )
}

export default Home

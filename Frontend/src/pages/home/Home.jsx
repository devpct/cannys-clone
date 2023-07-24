import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ToastContainer } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import DataUser from '../../hooks/users/Data'
import AddFeedback from '../../hooks/feedback/Add'
import AddLike from '../../hooks/likes/Add'
import Data from '../../hooks/feedback/Data'
import DeleteFeedback from '../../hooks/feedback/Delete'
import DeleteLikeId from '../../hooks/likes/Delete'
import Update from '../../hooks/feedback/Update'
import './home.scss'

function Home() {

  const [feedbacks, setFeedbacks] = useState()
  const [userData, setUserData] = useState(null)
  const [addFeddbackClick, setAddFeedbackClick] = useState(false)
  const [userFeedback, setUserFeedback] = useState('')
  const [deleteIdFeedback, setDeleteIdFeedback] = useState('')
  const [deleteIdLike, setDeleteIdLike] = useState('')
  const [numberLike, setNumberLike] = useState('')
  const [addLike, setAddLike] = useState('')


  const FormPage = useNavigate()

  useEffect(() => {
    document.title = 'Cannys Clone'
    if (localStorage.getItem('username') === null) {
      FormPage('/signup')
    }
    document.documentElement.style.background = 'linear-gradient(90deg, #c9cadf, #5f66f7)'
    document.body.style.background = 'linear-gradient(90deg, #c9cadf, #5f66f7)'
  }, [])

  const addFeddback = () => {
    if (userFeedback !== '') {
      const now = new Date()
      const DateTime = format(now, 'yyyy/M/d - HH:mm:ss')
      setUserFeedback((description) => ({
        ...description,
        image: userData.image,
        name: userData.name,
        username: userData.username,
        timeData: DateTime,
        like: '0'
      }))
      setAddFeedbackClick(true)
      setFeedbacks((data) => [
        {
          image: userData.image,
          nameLastname: userData.name,
          username: userData.username,
          descriptions: userFeedback.description,
          time_date: DateTime,
          like: '0'
        },
        ...data
      ])
    }
  }

  const handlerFeedbackUser = (event) => {
    setUserFeedback({ description: event.target.value })
  }

  const handlerHeart = (feedbackId, likeId, statusLike) => {
    const now = new Date()
    const DateTime = format(now, 'yyyy/M/d - HH:mm:ss')
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((feedback) => {
        if (feedback._id === feedbackId) {
          const newLike = feedback.isLiked ? +feedback.like - 1 : +feedback.like + 1
          setNumberLike({ like: newLike, feedbackId })
          return { ...feedback, isLiked: !feedback.isLiked, like: newLike }
        } else {
          return feedback
        }
      })
    )

    if (statusLike === true) {
      setDeleteIdLike(likeId)
    }else{
      setAddLike({ userId: userData.id, feedbackId, timeData: DateTime })
    }
  }
  
  
  

  const deleteFeedback = (idFeedback) => {
    const updatedFeedbacks = feedbacks.filter((feedback) => feedback._id !== idFeedback)
    setFeedbacks(updatedFeedbacks)
    setDeleteIdFeedback(idFeedback)
  }

  return (
    <>
      {userData !== null && userData.length !== 0 && feedbacks !== undefined && (
        <div className="container">

          <div className="box-add-feedback">
            <div className="data-user">
              <img src={userData.image} alt="" />
              <div className='name-username'>
                <p>{userData.name}</p>
                <p className='username'>@ {userData.username}</p>
              </div>
            </div>
            <div className="feedback">
              <textarea onKeyUp={() => handlerFeedbackUser(event)} maxLength={500} placeholder='Write your feedback...'></textarea>
              <button onClick={addFeddback}>Add FeedBack</button>
            </div>
          </div>

          <div className="feedbacks">
            <nav className='title'>
              <h2>Feedbacks</h2>
            </nav>
            <div className="box-feedbacks">

              {feedbacks.map(user => (
                <div key={user._id} className="user-feedback">
                  <div className="data-user">
                    <div className='data-left'>
                      <img src={user.image} alt="" loading='lazy' />
                      <div className="name-username">
                        <p>{user.nameLastname}</p>
                        <p className='username'>@ {user.username}</p>
                      </div>
                    </div>
                    <h5>{user.time_date}</h5>
                  </div>
                  <div className="feedback">
                    <p>{user.descriptions}</p>
                    <div className="more">
                    <button onClick={() => handlerHeart(user._id , user.likeId , user.isLiked)}>
                      <span>{user.like}</span>
                      <FontAwesomeIcon
                        style={{ color: user.isLiked ? 'red' : '#48484883' }}
                        className="icon-heart"
                        icon={faHeart}
                      />
                    </button>
                      <i className="bi bi-three-dots-vertical">
                        {
                          user.username === userData.username &&
                          <div className="container-boxs">

                            <div onClick={() => deleteFeedback(user._id)} className='feedback-delete'>
                              <svg style={{ color: 'red' }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              <p>Delete Feedback</p>
                            </div>

                          </div>
                        }
                      </i>
                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      )}
      <Data
        setFeedbacks={setFeedbacks}
        feedbacks={feedbacks}
        userData={userData}
      />
      <DataUser
        userData={userData}
        setUserData={setUserData}
      />
      <AddFeedback
        userFeedback={userFeedback}
        addFeddbackClick={addFeddbackClick}
        setAddFeedbackClick={setAddFeedbackClick}
        setFeedbacks={setFeedbacks}
      />
      <AddLike
      addLike={addLike}
      setAddLike={setAddLike}
      />
      <DeleteLikeId
        deleteIdLike={deleteIdLike}
        setDeleteIdLike={setDeleteIdLike}
      />
      <Update
        numberLike={numberLike}
        setNumberLike={setNumberLike}
      />
      <DeleteFeedback
        deleteIdFeedback={deleteIdFeedback}
        setDeleteIdFeedbac={setDeleteIdFeedback}
      />
      <ToastContainer />
    </>
  )
}

export default Home

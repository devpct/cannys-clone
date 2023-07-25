import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Data({ setFeedbacks, userData }) {
  const [likes, setLikes] = useState([])

  useEffect(() => {
    if (userData !== null && userData.id !== null) {
      axios
        .get('http://localhost:3000/data/likes')
        .then((response) => {
          const userLikes = response.data.filter((like) => like.userId === userData.id)
          setLikes(userLikes.reverse())
        })
        .catch((error) => {
          console.error(error)
        })

      axios
        .get('http://localhost:3000/data/feedbacks')
        .then((response) => {
          const feedbacksWithIsLiked = response.data.map((feedback) => ({
            ...feedback,
            isLiked: false,
          }))

          setFeedbacks(feedbacksWithIsLiked.reverse())

          if (likes.length > 0) {
            likes.forEach((like) => {
              const feedbackIndex = feedbacksWithIsLiked.findIndex((feedback) => feedback._id === like.feedbackId)
              if (feedbackIndex !== -1) {
                feedbacksWithIsLiked[feedbackIndex].isLiked = true
                feedbacksWithIsLiked[feedbackIndex].likeId = like._id
              }
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [userData, likes, setFeedbacks])

}

export default Data

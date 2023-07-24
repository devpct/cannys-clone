import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Data({ setFeedbacks, feedbacks, userData }) {

    const [likes, setLikes] = useState()
    const [betLike, setBetLike] = useState(false)

    useEffect(()=>{
        if (betLike === false) {
        axios.get('http://localhost:3000/data/feedbacks')
        .then(response => {
                
                const feedbacksWithIsLiked = response.data.map((feedback) => ({
                    ...feedback,
                    isLiked: false,
                }))
                
                setFeedbacks(feedbacksWithIsLiked.reverse())
                
                if (likes !== undefined) {
                    likes.forEach((like) => {
                      const feedbackIndex = feedbacksWithIsLiked.findIndex((feedback) => feedback._id === like.feedback_id)
                      if (feedbackIndex !== -1) {
                        feedbacksWithIsLiked[feedbackIndex].isLiked = true
                        feedbacksWithIsLiked[feedbackIndex].likeId = like._id 
                      }
                    })
                  }                  
            })
            .catch(error => {
                console.error(error)
            })
            
            axios.get('http://localhost:3000/data/likes')
            .then(response => {
                
                if (userData !== undefined) {
                    if (response.data.map(item => item.user_id === userData.id)) {
                        setLikes(response.data.reverse())
                    }
                }
                
            })
        .catch(error => {
          console.error(error)
        })
        setTimeout(() => {
            setBetLike(true)
        }, 300)
    }
    },[feedbacks])

}

export default Data
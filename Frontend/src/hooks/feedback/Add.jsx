import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Add({ userFeedback, addFeddbackClick, setAddFeedbackClick, setFeedbacks }) {

    useEffect(()=>{
        if (addFeddbackClick === true) {             
              console.log(userFeedback)
            axios.post('http://localhost:3000/add/feedback', {
                image: userFeedback.image,
                nameLastname: userFeedback.name,
                username: userFeedback.username,
                timeDate: userFeedback.TD,
                descriptions: userFeedback.description,
                like: userFeedback.like,  
            })
            .then(response => {
                console.log(response);
                toast.success('Feedback completed successfully', {
                    position: "bottom-left",
                    autoClose: 2400,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            })
            .catch(error => {
                console.log(error)
            })
            setAddFeedbackClick(false)
        }
    },[addFeddbackClick])

}

export default Add
import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Delete({ deleteIdFeedback, setDeleteIdFeedback }) {
    useEffect(()=>{
        if (deleteIdFeedback !== '') {
            axios.delete(`http://localhost:3000/delete/like/${deleteIdFeedback.likeId}`)
            axios.delete(`http://localhost:3000/delete/feedback/${deleteIdFeedback.feedbackId}`)
            .then(response => {
                toast.success('Feedback removed', {
                position: "bottom-left",
                autoClose: 2200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
                setDeleteIdFeedback('')
            })
            .catch(error => {
                console.error(error)
            })
        }
    },[deleteIdFeedback])
}

export default Delete
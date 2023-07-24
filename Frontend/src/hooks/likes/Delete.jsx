import React, { useEffect } from 'react'
import axios from 'axios'

function Delete({ deleteIdLike, setDeleteIdLike }) {

    useEffect(()=>{
        if (deleteIdLike !== '') {
            axios
            .delete(`http://localhost:3000/delete/like/${deleteIdLike}`)
            .then(response => {
                console.log(response)
                setDeleteIdFeedback('')
            })
            .catch(error => {
              console.error(error)
            })
            setDeleteIdLike('')
        }
    },[deleteIdLike, setDeleteIdLike])
}

export default Delete
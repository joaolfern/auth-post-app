import React, { useRef, useState } from 'react'

function useUploadImage() {
    const [photoUrl, setPhotoUrl] = useState('')
    const [photoFile, setPhotoFile] = useState(null)
    const [hasItBeenUsed, sethasItBeenUsed] = useState(false)

    const ref = useRef(null)

    async function updatePhoto(e) {
        const file = e.target.files[0]
        const reader = new FileReader()

        setPhotoFile(file)
        sethasItBeenUsed(true)
        reader.addEventListener('load', function () {
            setPhotoUrl(reader.result)
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    return { photoUrl, photoFile, ref, updatePhoto, hasItBeenUsed, setPhotoUrl }
}

export default useUploadImage
import { useEffect, useRef, useState } from "react"

const useHideOnOutsideClick = (initialState = false) => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(initialState)

    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setVisible(false)

            document.removeEventListener("mousedown", handleClickOutside)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.addEventListener('click', handleClickOutside, true)
            setVisible(false)
        }
    }, [ref])// eslint-disable-line 


    return { ref, visible, setVisible }
}

export default useHideOnOutsideClick
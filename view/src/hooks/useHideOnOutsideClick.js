import { useEffect, useRef, useState } from "react"

const useHideOnOutsideClick = () => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

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
            console.log(visible)
        }
    }, [ref])


    return { ref, visible, setVisible }
}

export default useHideOnOutsideClick
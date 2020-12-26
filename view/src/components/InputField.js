import React from 'react'

import '../styles/inputField.css'

function InputField({ name, input, setInput, select }) {

    function handleInput(e) {
        const { value, name } = e.target

        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className={`txtField`}>
            <label className={`txtField__label`}>{name}</label>
            <input
                className={`txtField__input`}
                type={name === 'password' ? 'password' : 'text'}
                name={`${name}`}
                value={input[name]}
                onChange={handleInput}
            />
        </div>
    )
}

export default InputField
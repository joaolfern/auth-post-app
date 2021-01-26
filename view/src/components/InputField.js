import React from 'react'

import TextareaAutosize from 'react-textarea-autosize'
import '../styles/inputField.css'

function InputField({ name, label = name, input, setInput, textarea = false }) {


    function handleInput(e) {
        const { value, name } = e.target
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className={`txtField`}>
            <label className={`txtField__label`}>{label}</label>
            {
                textarea ?
                    <TextareaAutosize
                        value={input[name]}
                        onChange={handleInput}
                        className='txtField__input txtField__input--txtarea'
                        name={name}
                    /> :
                    <input
                        className={`txtField__input`}
                        type={name === 'password' ? 'password' : 'text'}
                        name={`${name}`}
                        value={input[name]}
                        onChange={handleInput}
                    />
            }

        </div>
    )
}

export default InputField
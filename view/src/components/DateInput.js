import React from 'react'

import '../styles/inputField.css'
import { getYearList, getMonthList, getDayList } from '../functions/useDates'

function DateInput({ name, input, setInput, obj }) {

    function handleChange(e) {
        const { value } = e.target
        setInput(prev => ({
            ...prev,
            [obj]: {
                ...prev[obj],
                [name]: value
            }
        }))
    }

    const options = name === 'year' ?
        getYearList().map(year => (
            <option key={year} value={year}>{year}</option>
        ))
        :
        name === 'month' ?
            getMonthList().map((month, i) => (
                <option key={i} value={i}>{month}</option>
            ))
            :
            getDayList(input[obj].year, input[obj].month).map(day => (
                <option key={day} value={day}>{day}</option>
            ))

    return (
        <div className={`txtField`}>
            <label className={`txtField__label`}>{name}</label>
            <select
                className={`txtField__input`}
                value={input[obj][name]}
                onChange={handleChange}
            >
                {
                    options
                }
            </select>
        </div>
    )
}
export default DateInput
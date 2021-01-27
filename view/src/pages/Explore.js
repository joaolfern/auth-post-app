import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Explore() {
    return (
        <div className='explore'>
            <div className='searchBar'>
                <input
                    type='text'
                    placeholder='Buscar no Twitter'
                    className='searchBar__input'
                />
                <FontAwesomeIcon className='searchBar__icon' icon={faSearch} />
            </div>
        </div>
    )
}

export default Explore
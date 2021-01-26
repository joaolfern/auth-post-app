import React from 'react'

function ShadedBox({ condition, customClass, children }) {
    return (
        <div className={`shadedBox ${customClass ? customClass : ''}`} style={{
            transform: `scale(${condition ? '1' : '0'})`,
            opacity: condition ? '1' : '0',
            transition: 'opacity .3s'
        }}>
            {children}
        </div>
    )
}

export default ShadedBox
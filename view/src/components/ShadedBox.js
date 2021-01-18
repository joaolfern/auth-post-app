import React from 'react'

function ShadedBox({ condition, customClass, children }) {
    return (
        <div className={`${customClass ? customClass : ''} shadedBox`} style={{
            transform: `scale(${condition ? '1' : '0'})`,
            opacity: condition ? '1' : '0',
            transition: 'opacity .3s'
        }}>
            {children}
        </div>
    )
}

export default ShadedBox
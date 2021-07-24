import React from 'react'

function LoadingSpinner() {

  return (
    <svg className='loading-spinner' viewBox="0 0 32 32">
      <circle cx="16" cy="16" fill="none" r="14" stroke-width="4" style={{ opacity: 0.2 }}>
      </circle>
      <circle cx="16" cy="16" fill="none" r="14" stroke-width="4" style={{ strokeDasharray: 80, strokeDashoffset: 60, }}>
      </circle>
    </svg>
  )
}

export default LoadingSpinner

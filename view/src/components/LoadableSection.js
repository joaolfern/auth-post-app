import React from 'react'
import LoadingSpinner from './LoadingSpinner'

function LoadableSection({ children, isLoading }) {
  return (
    isLoading ?
      <LoadingSpinner /> :
      <>{children}</>
  )
}

export default LoadableSection

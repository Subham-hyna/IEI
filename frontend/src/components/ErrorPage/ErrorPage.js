import React from 'react'
import './ErrorPage.css'
import MetaData from '../Layout/MetaData'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div class="error-page">
    <MetaData title={"404 - PAGE NOT FOUND"} />
    <div class="error-container">
        <h1>404</h1>
        <p>Oops! Page not found.</p>
        <p>Sorry, the page you are looking for might be in another castle.</p>
        <Link to="/" >Click Here to go Back</Link>
      </div>
  </div>
  )
}

export default ErrorPage
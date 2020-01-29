import React, { useState, useEffect } from 'react'
import Wrapper from './Wrapper'
import Modal from '../components/UI/Modal'

const withErrorHandler = (WrappedComponent, axios) => { 
  return props => {

    const [error, setError ] = useState(null)

    // componentWillMount - because happening before componentDidMount useEffect isn't required
    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null)
      return req
    })
    const resInterceptor = axios.interceptors.response.use(
      res => res, 
      err => setError(err)
    )
    
    // componentWillUnmount
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor)
        axios.interceptors.response.eject(resInterceptor)
      }
    }, [reqInterceptor, resInterceptor ]) // when re-run

    // Method
    const errorConfirmedHandler = () => setError(null)
    
    return (
      <Wrapper>
        <Modal 
          show = {error}
          modalClosed = {errorConfirmedHandler}>
        >
        { error ? error.message : null}
      </Modal>
        <WrappedComponent {...props} />
      </Wrapper>
    )

  }
}

export default withErrorHandler 
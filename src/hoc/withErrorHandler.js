import React from 'react'

import Wrapper from './Wrapper'
import Modal from '../components/UI/Modal'
import useHttpErrorHandler from '../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => { 
  return props => {
    // It's not the same as arr destructuring in useState hook, could have more params...
    const [error, clearError] = useHttpErrorHandler(axios)

    return (
      <Wrapper>
        <Modal 
          show={error}
          modalClosed={clearError}>
        >
        { error ? error.message : null}
      </Modal>
        <WrappedComponent {...props} />
      </Wrapper>
    )

  }
}

export default withErrorHandler 
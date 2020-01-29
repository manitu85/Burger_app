import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'

const Logout = ({ onLogout }) => {

  useEffect(() => {
    onLogout()
  // eslint-disable-next-line
  }, []) // watching on logout

  return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
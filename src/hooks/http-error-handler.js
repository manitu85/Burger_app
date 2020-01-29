import { useState, useEffect } from 'react'

// Custom hook
export default httpClient => {
  const [error, setError] = useState(null)

  // componentWillMount - because happening before componentDidMount useEffect isn't required
  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null)
    return req
  })
  const resInterceptor = httpClient.interceptors.response.use(
    res => res,
    err => setError(err)
  )

  // componentWillUnmount effect
  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor)
      httpClient.interceptors.response.eject(resInterceptor)
    }
  // eslint-disable-next-line
  }, [reqInterceptor, resInterceptor]) // when comp. re-run

  // Method
  const errorConfirmedHandler = () => setError(null)

  return [error, errorConfirmedHandler]
}
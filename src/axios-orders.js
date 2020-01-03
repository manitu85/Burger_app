import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burger-001ffa.firebaseio.com/'
})

export default instance
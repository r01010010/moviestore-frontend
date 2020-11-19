import memoizee from 'memoizee'
import { HOST, REQUEST_CONFIG } from './constants'

const REQUEST_CONFIG_URL = REQUEST_CONFIG.map((param) => param.join('=')).join('&')

const request = memoizee((target) => {
  return fetch(`${HOST}/${target}?${REQUEST_CONFIG_URL}`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  }).then((response) => response.json())
})

export const requestList = (target) => {
  return request(`v3/lists/${target}`)
}

export default request

import memoizee from 'memoizee'
import { HOST, REQUEST_CONFIG } from './constants'

const REQUEST_CONFIG_URL = REQUEST_CONFIG.map((param) => param.join('=')).join(
  '&'
)

const request = memoizee((target) => {
  return fetch(
    `https://cors-anywhere.herokuapp.com/${HOST}/${target}?${REQUEST_CONFIG_URL}`,
    // `${HOST}/${target}?${REQUEST_CONFIG_URL}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      redirect: 'follow',
      mode: 'cors',
    }
  ).then((response) => response.json())
})

export const requestList = (target) => {
  return request(`v3/lists/${target}`)
}

export const requestDetail = (id) => {
  return request(`/v3/movies/${id}`)
}

export default request

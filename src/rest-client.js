const URL = 'https://gizmo.rakuten.tv'

const REQUEST_CONFIG = [
  ['classification_id', 5],
  ['device_identifier', 'web'],
  ['locale', 'es'],
  ['market_code', 'es']
]

const REQUEST_CONFIG_URL = REQUEST_CONFIG.map((param) => param.join('=')).join('&')

const request = (target) => {
  return fetch(`${URL}/${target}?${REQUEST_CONFIG_URL}`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  }).then((response) => response.json())
}

export const requestList = (target) => {
  return request(`v3/lists/${target}`)
}

export const lists = new Map([
  ['populares-en-taquilla'],
  ['estrenos-para-toda-la-familia'],
  ['estrenos-imprescindibles-en-taquilla'],
  ['estrenos-espanoles'],
  ['si-te-perdiste'],
  ['especial-x-men'],
  ['nuestras-preferidas-de-la-semana']
])

export default request

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { lists, requestList } from './rest-client'

const App = () => {
  const [list, setList] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (firstLoad) {
      const id = lists.entries().next().value[0]
      requestList(id).then((data) => setList(data))
      setInterval(() => requestList(id).then((data) => setList(data)), 5000)
    }
    setFirstLoad(false)
  }, [firstLoad])

  return (
    <Container>
      <h1>{list.data && list.data.id}</h1>
    </Container>
  )
}

const colors = {
  black000: '#000000',
  black00: '#171717',
  black01: '#1C1C1C',
  black03: '#232326',
  grey00: '#2F2F2F',
  white00: '#F9F9F9',
  purple00: '#402C47',
  purple01: '#D578EA',
  pink00: '#4C252D',
  pink01: '#F8317E',
  green00: '#2D5035',
  green01: '#4CD964',
  blue00: '#16467E',
  blue01: '#FFFFFF',
  orange01: '#FA9500'
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding:0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${colors.white00};
  background-color: ${colors.black00};
`
ReactDOM.render(<App />, document.getElementById('app'))

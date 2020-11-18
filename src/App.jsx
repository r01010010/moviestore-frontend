import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { lists, requestList } from './rest-client'

const App = () => {
  const [list, setList] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (firstLoad) {
      requestList(lists.entries().next().value[0]).then((data) => setList(data))
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
  black00: '#171717',
  black01: '#1C1C1C',
  black03: '#292929',
  grey00: '#2F2F2F',
  white00: '#F9F9F9'
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

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Carrousel from './Carrousel.jsx'
import { requestList } from './rest-client'
import { LIST_IDS } from './constants'
import colors from './colors'

const App = () => {
  return (
    <Container>
      {[...LIST_IDS.keys()].map((id) => 
        <Carrousel key={id} listId={id} />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${colors.white00};
  background-color: ${colors.black00};
`

ReactDOM.render(<App />, document.getElementById('app'))

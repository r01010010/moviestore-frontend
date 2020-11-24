import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PosterList from './component.PosterList.jsx'
import { LIST_IDS } from './constants.apis'
import colors from './constants.colors'
import Detail from './component.Detail.jsx'

export const Context = React.createContext()

const App = () => {
  const [detail, setDetail] = useState(null)

  const closeDetail = () => {
    setDetail(null)
    window.document.documentElement.style.overflowY = 'scroll'
  }

  const openDetail = (id) => {
    setDetail({ id })
  }

  return (
    <Context.Provider
      value={{
        detail,
        setDetail,
        openDetail,
        closeDetail,
      }}
    >
      <>
        <Container>
          {[...LIST_IDS.keys()].map((id) => (
            <PosterList key={id} listId={id} />
          ))}
        </Container>
        {detail && <Detail />}
      </>
    </Context.Provider>
  )
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${colors.white00};
  background-color: ${colors.black00};
  z-index: 0;
`

ReactDOM.render(<App />, document.getElementById('app'))

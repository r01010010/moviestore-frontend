import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PosterList from './PosterList.jsx'
import { requestList, requestDetail } from './rest-client'
import { LIST_IDS } from './constants'
import colors from './colors'
import Detail from './Detail.jsx'

export const Context = React.createContext()

const App = () => {
  const [detail, setDetail] = useState(null)
  const [scrollTop, setScrollTop] = useState(0)

  const closeDetail = () => {
    setDetail(null)
    window.document.documentElement.style.overflowY = 'scroll'
  }

  const openDetail = (id) => {
    setScrollTop(window.document.documentElement.scrollTop)

    setDetail('loading')

    requestDetail(id).then((res) => {
      if (!res || !res.data) return
      setDetail(res.data)
    })

    window.document.documentElement.style.overflowY = 'hidden'
  }

  return (
    <Context.Provider
      value={{
        detail,
        openDetail,
        closeDetail,
        scrollTop,
        setScrollTop,
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

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Film from './Film.jsx'
import {requestList} from './rest-client'

const Carrousel = ({ listId }) => {
  const [films, setFilms] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false)
      requestList(listId)
        .then(res => setFilms(res.data.contents.data)) 
    }
  }, [firstLoad])

  return (
    <Container>
      <Content>
        { films.map(film =>
          <Film key={film.id} film={film} />
        )}
      </Content>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow-x: scroll;
`

const Content = styled.div`
  width: auto;
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: visible;
  height: auto;
  left: -15em;
  padding: 2em 10em;
`

const Title = styled.div`

`

export default Carrousel

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Film from './Film.jsx'
import { requestList } from './rest-client'
import colors from './colors'

const Carrousel = ({ listId }) => {
  const [films, setFilms] = useState([])
  const [data, setData] = useState({})
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false)
      requestList(listId).then((res) => {
        if (!res || !res.data) return

        setData(res.data)
        setFilms(res.data.contents.data)
      })
    }
  }, [firstLoad])

  return (
    <Container>
      <Title>{data.name}</Title>
      <Films>
        {films.map((film) => (
          <Film key={film.id} film={film} />
        ))}
      </Films>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow-x: scroll;
  overflow: hidden;
`

const Title = styled.div`
  font-size: 1.6em;
  font-weight: 600;
  text-shadow: rgba(0, 0, 0, 0.8) 0px 1px 1px;
  padding-left: 1em;
  padding-bottom: 0.8em;
  color: ${colors.white00};
`

const Films = styled.div`
  width: auto;
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: visible;
  height: auto;
  padding: 2em 10em;
`
export default Carrousel

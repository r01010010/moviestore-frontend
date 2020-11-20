import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PosterItem from './PosterItem.jsx'
import { requestList } from './rest-client'
import colors from './colors'

const PosterList = ({ listId }) => {
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

  return films.length ? (
    <Container>
      <Title>{data.name}</Title>
      <PosterItems>
        {films.map((film) => (
          <PosterItem key={film.id} film={film} />
        ))}
      </PosterItems>
    </Container>
  ) : (
    <></>
  )
}

const dimensions = `
  min-height: 38em;
`

const Container = styled.div`
  ${dimensions}

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

const PosterItems = styled.div`
  width: auto;
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: visible;
  height: auto;
  padding: 2em 10em;
`
export default PosterList

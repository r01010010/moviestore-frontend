import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PosterItem from './component.PosterItem.jsx'
import ScrollButtons from './component.ScrollButtons.jsx'
import { requestList } from './api.rest-client'
import colors from './constants.colors'

const PosterList = ({ listId }) => {
  const [films, setFilms] = useState([])
  const [data, setData] = useState({})
  const [firstLoad, setFirstLoad] = useState(true)
  const [left, setLeft] = useState(0)

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
      <PosterItems left={left}>
        {films.map((film) => (
          <PosterItem key={film.id} film={film} />
        ))}
      </PosterItems>
      <ScrollButtons left={left} setLeft={setLeft} itemsLength={films.length} />
    </Container>
  ) : (
    <></>
  )
}

const Container = styled.div`
  min-height: 38em;
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
  transition: left 0.4s;
  left: -${({ left }) => left}px;
`

export default PosterList

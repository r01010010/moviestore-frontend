import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PosterItem, { dimensions } from './PosterItem.jsx'
import { requestList } from './rest-client'
import colors from './colors'

const calcDimensions = (itemsLength) => {
  const base = document.body.style.fontSize || 16
  const paddingWidth = dimensions.horizontalPadding * 2 * base
  const posterWidth = dimensions.width * base
  const viewWidth = document.documentElement.clientWidth
  const increment = posterWidth + paddingWidth

  const postersPerViewPort = viewWidth / (paddingWidth + posterWidth)
  const limit =
    (paddingWidth + posterWidth) * itemsLength - viewWidth + posterWidth

  return {
    base,
    paddingWidth,
    posterWidth,
    viewWidth,
    increment,
    postersPerViewPort,
    limit,
  }
}

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

  const moveList = ({ direction, increment, limit }) => {
    let newLeft = direction === 'right' ? increment + left : left - increment
    setLeft(_.clamp(newLeft, 0, limit))
  }

  const { direction, limit, increment } = calcDimensions(films.length)

  return films.length ? (
    <Container>
      <Title>{data.name}</Title>
      <PosterItems left={left}>
        {films.map((film) => (
          <PosterItem key={film.id} film={film} />
        ))}
      </PosterItems>
      <LeftButton
        onClick={() => moveList({ direction: 'left', limit, increment })}
        visible={!!(left > 0)}
      >
        <RightLeftIcon className="icon-left-open-big" />
      </LeftButton>
      <RightButton
        onClick={() => moveList({ direction: 'right', limit, increment })}
        visible={left < limit}
      >
        <RightLeftIcon className="icon-right-open-big" />
      </RightButton>
    </Container>
  ) : (
    <></>
  )
}
const RightLeftButton = `
  position: absolute;
  height: 6em;
  width: 6em;
  border-radius: 50%;
  top: calc(50% - 5em);
  background: rgba(20, 20, 20, 0.6);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.2;
  transition: opacity 0.5s;

  &:hover {
    opacity: 1;
  }

  &:active {
    background: rgba(20, 20, 20, 0.7);
  }
`

const RightButton = styled.a`
  ${RightLeftButton}
  right: 2em;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
`

const LeftButton = styled.a`
  ${RightLeftButton}
  left: 2em;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
`

const RightLeftIcon = styled.i`
  color: ${colors.white00};
  font-size: 4em;
  opacity: 0.6;
`

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
  /* padding: 2em 10em; */
`
export default PosterList

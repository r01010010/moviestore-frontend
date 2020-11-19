import React from 'react'
import styled from 'styled-components'
import colors from './colors'

const Film = ({ film }) => {
  const { title, year, images: { artwork }, rating: { average, scale } } = film

  return (
    <Container>
      <Poster src={artwork} />
      <Title>{title}</Title>
      <Year>{average}/{scale} {year}</Year>
    </Container>
  )
}

const Container = styled.div`
  min-width: 20em;
  min-height: 30em;
  padding: 2em;
  opacity: .7;
  overflow: hidden;
  border-radius: 10px;

  transition: all .3s;
    &:hover{
    opacity: 1;
    transform: scale(1.2);
  }
`

const Poster = styled.img`
  width: 18em;
  border-radius: 10px;
`

const Title = styled.div`
  padding-top: .4em;
  color:white;
  font-size: .85em;
`

const Year = styled.div`
  padding-top: .4em;
  color: ${colors.grey01};
  font-size: .75em;
  font-weight: 400;
`

export default Film

import React from 'react'
import styled from 'styled-components'
import colors from './colors'

const Film = ({ film }) => {
  const { title, year, images: { artwork }, highlighted_score: { score } } = film

  return (
    <Container>
      <Poster src={artwork} />
      <Data><Rating score={score}>{score}</Rating> <Year>{year}</Year></Data>
      <Title>{title}</Title>
    </Container>
  )
}

const Container = styled.div`
  min-width: 20em;
  min-height: 30em;
  padding: 1.6em;
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

  box-shadow: 6px 9px 5px -3px black;
  -webkit-box-shadow: 6px 9px 5px -3px black;
  -moz-box-shadow: 6px 9px 5px -3px black;
`

const Title = styled.div`
  padding-top: .5em;
  color:white;
  font-size: .85em;
`

const Data = styled.div`
  padding-top: .2em;
  display: flex;
  flex-direction: row;
  font-size: .75em;
`

const Year = styled.div`
  padding-top: .4em;
  color: ${colors.grey01};
  font-weight: 400;
`

const Rating = styled.div`
  background-color: ${({ score }) => score < 7 ? colors.green00 : colors.purple00};
  color: ${({ score }) => score < 7 ? colors.green01 : colors.purple01};
  padding: .3em;
  border-radius: 5px;
  margin-right: .5em;
  min-width: 1.7em;
  display: flex;
  justify-content: center;
`
export default Film

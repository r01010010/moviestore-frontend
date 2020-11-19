import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { MediaPlayer } from 'dashjs';
import colors from './colors'
import {requestFilm} from './rest-client'
import { LICENCE_KEY, LICENCE_SERVER_URL, VIDEO_URL } from './constants'

const Film = ({ film }) => {
  const [detail, setDetail] = useState(null)
  const { id, title, year, images: { artwork }, highlighted_score: { score } } = film
  const videoRef = useRef()
  const player = MediaPlayer().create()

  const loadDetail = () => {
    setDetail({})

    requestFilm(id)
      .then(res => {
        if (!res || !res.data) return
        setDetail(res)
        player.initialize(videoRef.current, VIDEO_URL, true)
        player.setProtectionData({[LICENCE_KEY]: {
          serverURL: LICENCE_SERVER_URL
        }})
      })
  }

  return (
    <Container>
      <Left onClick={() => loadDetail()}>
        <Poster src={artwork} />
        <Data><Rating score={score}>{score}</Rating> <Year>{year}</Year></Data>
        <Title>{title}</Title>
      </Left>
      <Right visible={detail}>
        { !!detail &&
          <video ref={videoRef} controls data-dashjs-player autoPlay width={500} /> 
        }
      </Right>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Left = styled.div`
  min-width: 20em;
  min-height: 30em;
  padding: 0 1.6em;
  opacity: .7;
  overflow: hidden;
  border-radius: 10px;
  position: relative;

  transition: all .3s;
    &:hover{
    opacity: 1;
    transform: scale(1.2);
  }
`

const Right = styled.div`
  min-width: 45em;
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

import React, { useRef, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Context } from './App.jsx'
import { MediaPlayer } from 'dashjs'
import { LICENCE_KEY, LICENCE_SERVER_URL, VIDEO_URL } from './constants'

let player = null

const Video = () => {
  const { detail } = useContext(Context)
  const videoRef = useRef()

  const { id } = detail || {}

  useEffect(() => {
    player = MediaPlayer().create()
    player.initialize(videoRef.current, VIDEO_URL, true)
    player.setProtectionData({
      [LICENCE_KEY]: {
        serverURL: LICENCE_SERVER_URL,
      },
    })
  }, [id])

  return (
    <Container>
      <video
        ref={videoRef}
        controls={false}
        data-dashjs-player
        autoPlay
      ></video>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  & video {
    width: 100%;
    height: 100%;
    transform: scale(1.2);
  }
`

export default Video

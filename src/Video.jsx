import React from 'react'
import styled from 'styled-components'
import { MediaPlayer } from 'dashjs'
import { LICENCE_KEY, LICENCE_SERVER_URL, VIDEO_URL } from './constants'

const Video = () => {
  const videoRef = useRef()

  const playTrailer = () => {
    const player = MediaPlayer().create()
    player.initialize(videoRef.current, VIDEO_URL, true)
    player.setProtectionData({
      [LICENCE_KEY]: {
        serverURL: LICENCE_SERVER_URL,
      },
    })
  }

  return (
    <Container>
      <video ref={videoRef} controls={false} data-dashjs-player autoPlay />
    </Container>
  )
}

const Container = styled.div``

export default Video

import React, { useEffect, useContext, useState, useRef } from 'react'
import styled from 'styled-components'

import colors from './colors'

import { Context } from './App.jsx'
import Video from './Video.jsx'

const Detail = ({}) => {
  const { detail, scrollTop, closeDetail } = useContext(Context)
  const [isImgLoaded, setIsImgLoaded] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const detailRef = useRef()

  const {
    id,
    duration,
    title,
    year,
    plot,
    short_plot,
    original_title,
    images = {},
    countries,
    classification = {},
    directors = [{}],
  } = detail || {}

  const { snapshot } = images
  const { age } = classification

  return (
    <Container ref={detailRef} isVisible={!isClosing && !!id} top={scrollTop}>
      <Loader>
        <div>
          <i className="icon-spin5 animate-spin"></i>
        </div>
      </Loader>
      <ViewContainer isVisible={!!id}>
        <VideoContainer background={snapshot} isImgLoaded={isImgLoaded}>
          <Img
            key={snapshot}
            src={snapshot}
            onLoad={() => setIsImgLoaded(true)}
          />

          {isVideoPlaying && <Video isVideoPlaying={isVideoPlaying} />}
        </VideoContainer>

        <DataContainer isVisible={!!isImgLoaded}>
          <TopRow>
            <CloseButton onClick={closeDetail}>
              <i className="icon-cancel-3"></i>
            </CloseButton>
          </TopRow>
          <Title>
            {title}
            <div style={{ fontSize: '38px', opacity: 0.7 }}>
              {directors[0].name}
            </div>
          </Title>

          <BottomRow>
            <ButtonsRow></ButtonsRow>
            <MetaDataRow>
              <Data>
                <Icon>
                  <i className="icon-users"></i>
                </Icon>
                <Label>{classification.name}</Label>
              </Data>
              <Data>
                <Icon>
                  <i className="icon-calendar-empty"></i>
                </Icon>
                <Label>{year}</Label>
              </Data>
              <Data>
                <Icon>
                  <i className="icon-clock"></i>
                </Icon>
                <Label>{duration} minutes</Label>
              </Data>
              <Data>
                <Icon>
                  <i className="icon-info-circled"></i>
                </Icon>
                <Label>{original_title}</Label>
              </Data>
              <ButtonContainer>
                <Button
                  background={colors.black00}
                  color={colors.white00}
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <ButtonIcon>
                    <i className="icon-play" />
                  </ButtonIcon>
                  <div>VER TRAILER</div>
                </Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button background={colors.yellow00} color={colors.black04}>
                  <ButtonIcon>
                    <i className="icon-play" />
                  </ButtonIcon>
                  <div>VER AHORA</div>
                </Button>
              </ButtonContainer>
            </MetaDataRow>

            <DescriptionRow>{plot}</DescriptionRow>
          </BottomRow>
        </DataContainer>
      </ViewContainer>
    </Container>
  )
}

const Container = styled.div`
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease-out;
  background: rgba(20, 20, 20, 0.8);
  ${({ isVisible, top }) => (isVisible ? `top: ${top}px;` : '')}
`

const Title = styled.div`
  font-size: 4.5em;
  color: ${colors.white00};
  align-self: flex-start;
  font-weight: 800;
  text-shadow: rgba(0, 0, 0, 0.8) 0px 1px 1px;
  padding: 1em;
`

const Img = styled.img`
  visibility: hidden;
  display: none;
`

const ViewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
`

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-image: url(${({ isImgLoaded, background }) =>
    isImgLoaded ? background : 'none'});
  background-size: cover;
  opacity: ${({ isImgLoaded }) => (isImgLoaded ? 1 : 0)};
  transition: all 1s ease-out;
`

const DataContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  background: transparent;
  color: ${colors.white00};

  transition: all 1s ease-out;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`

const TopRow = styled.div`
  position: absolute;
  top: 0;
  padding: 2em;
  background: transparent;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid transparent;
`

const CloseButton = styled.a`
  font-size: 2em;
  opacity: 0.8;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  & i {
    color: ${colors.yellow00};
  }
`

const BottomRow = styled.div`
  position: absolute;
  bottom: 0;
  padding: 2em 5em 4em 5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
  border: 0px solid transparent;

  background: linear-gradient(
    180deg,
    rgba(153, 218, 255, 0) 0%,
    rgba(0, 0, 0, 0.7) 80%
  ); /* w3c */
`

const DescriptionRow = styled.div`
  font-size: 1.3em;
  font-weight: 700;
  color: ${colors.white00};
  padding: 1em 0em;
  text-shadow: rgba(0, 0, 0, 0.8) 0px 1px 1px;
`

const MetaDataRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.6em;
`

const Data = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
  text-shadow: rgba(0, 0, 0, 0.8) 0px 1px 1px;
  font-size: 1.2em;
`
const Icon = styled.div``
const Label = styled.div`
  padding-left: 0.2em;
  font-weight: 800;
`

const ButtonsRow = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1em;
`

const ButtonIcon = styled.div`
  marginright: 4;
`
const Button = styled.a`
  font-size: 1em;
  padding: 1em;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  font-weight: 800;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.2s;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: scale(0.98);
  }
`

const Loader = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4em;
  color: ${colors.black000};
  opacity: 0.7;
`

export default Detail

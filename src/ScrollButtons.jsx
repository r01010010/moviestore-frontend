import React from 'react'
import PosterItem, { dimensions } from './PosterItem.jsx'
import styled from 'styled-components'
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

const ScrollButtons = ({ left, setLeft, itemsLength }) => {
  const moveList = ({ direction, increment, limit }) => {
    let newLeft = direction === 'right' ? increment + left : left - increment
    setLeft(_.clamp(newLeft, 0, limit))
  }

  const { direction, limit, increment } = calcDimensions(itemsLength)

  return (
    <>
      <LeftButton
        onClick={() => moveList({ direction: 'left', limit, increment })}
        visible={!!(left > 0)}
      >
        <RightLeftIcon className="icon-left-open-big" />
      </LeftButton>
      <RightButton
        onClick={() => moveList({ direction: 'right', limit, increment })}
        visible={left < limit - increment}
      >
        <RightLeftIcon className="icon-right-open-big" />
      </RightButton>
    </>
  )
}

const RightLeftButton = `
  position: absolute;
  height: 5em;
  width: 5em;
  border-radius: 50%;
  top: calc(50% - 5em);
  background: rgba(20, 20, 20, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.3;
  transition: opacity 0.5s;

  &:hover {
    opacity: 1;

    & i {
      color: ${colors.yellow00};
    }
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
  font-size: 2.5em;
  opacity: 0.6;
`

export default ScrollButtons

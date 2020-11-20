import React from 'react'
import styled from 'styled-components'

const Button = ({
  iconClass,
  handleClick = () => {},
  background,
  color,
  label,
}) => (
  <Container1>
    <Container2 background={background} color={color} onClick={handleClick}>
      <ButtonIcon>
        <i className={iconClass} />
      </ButtonIcon>
      <div>{label}</div>
    </Container2>
  </Container1>
)

const Container1 = styled.div`
  display: flex;
  flex-direction: row;
`

const Container2 = styled.a`
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

const ButtonIcon = styled.div`
  marginright: 4;
`

export default Button

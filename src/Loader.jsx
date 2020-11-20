import React from 'react'
import styled from 'styled-components'
import colors from './colors'

const Loader = () => (
  <Container>
    <div>
      <i className="icon-spin5 animate-spin"></i>
    </div>
  </Container>
)

const Container = styled.div`
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

export default Loader

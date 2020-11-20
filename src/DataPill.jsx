import React from 'react'
import styled from 'styled-components'

const DataPill = ({ className, label }) => (
  <Container>
    <Icon>
      <i className={className}></i>
    </Icon>
    <Label>{label}</Label>
  </Container>
)

const Container = styled.div`
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

export default DataPill

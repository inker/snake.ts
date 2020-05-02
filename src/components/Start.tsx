import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 30px;

  & > * {
    margin: 10px;
    text-align: center;
  }
`

const SmallText = styled.div`
  font-size: 20px;
`

const Start = () => (
  <Root>
    <SmallText>
      To start the game, press any key or click &apos;Start&apos;
    </SmallText>
  </Root>
)

export default Start

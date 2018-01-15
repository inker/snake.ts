import React, { PureComponent } from 'react'
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
  }
`

const SmallText = styled.div`
  font-size: 20px;
`

interface Props {
  score: number
}

class GameOver extends PureComponent<Props> {
  render() {
    const { score } = this.props
    return (
      <Root>
        <div>GAME OVER</div>
        <div>Your score: {score}</div>
        <SmallText>To restart the game press Space or click 'Restart'</SmallText>
      </Root>
    )
  }
}

export default GameOver

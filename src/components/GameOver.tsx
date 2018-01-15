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

interface Props {
  score: number
}

class GameOver extends PureComponent<Props> {
  render() {
    const { score } = this.props
    return (
      <Root>
        <div>Game over</div>
        <div>Your score: {score}</div>
        <div>Click Restart to restart the game</div>
      </Root>
    )
  }
}

export default GameOver

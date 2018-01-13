import React, { PureComponent } from 'react'
import fastclick from 'fastclick'

interface Props {
  width: number,
  height: number,
}

class Game extends PureComponent<Props> {
  render() {
    return (
      <svg>
      </svg>
    )
  }
}

fastclick.attach(document.body)

export default Game

import React, { PureComponent } from 'react'
import { range, random } from 'lodash'

import Rect from 'components/Rect'

import Point from 'utils/Point'
import Direction from 'utils/Direction'
import directionByKeyCode from './utils/directionByKeyCode'
import offsetByDirection from './utils/offsetByDirection'

import gameLoop from './gameLoop'

const START_X = 2

interface Props {
  width: number,
  height: number,
  speed: number,
  initialLength: number,
}

interface State {
  snake: Point[],
  direction: Direction,
  food: Point | null,
  interval: number,
}

class Game extends PureComponent<Props, State> {
  constructor(props) {
    super(props)

    const interval = 1000 / props.speed
    const snake = range(START_X, START_X + props.initialLength).map(x => new Point(
      x,
      props.height >> 1,
    ))
    this.setState({
      snake,
      direction: Direction.RIGHT,
      food: null,
      interval,
    }, () => {
      this.setState({
        food: this.makeFood(),
      })
    })

    this.runGameLoop(interval)

    window.addEventListener('keydown', e => {
      this.setState({
        direction: directionByKeyCode(e.keyCode),
      })
    })
  }

  private runGameLoop(interval: number) {
    gameLoop(interval, () => {
      const {
        snake,
        direction,
        food,
      } = this.state
      snake.pop()
      const oldHead = snake[0]
      const offset = offsetByDirection(direction)
      const newHead = oldHead.add(offset)
      const newSnake = [newHead, ...snake]

      this.setState({
        snake: newSnake,
        food: food && newHead.equals(food) ? null : food,
      }, () => {
        if (this.state.food) {
          return
        }
        this.setState({
          food: this.makeFood(),
        })
      })
    })
  }

  private makeFood(): Point {
    const { width, height } = this.props
    const { snake } = this.state
    const food = new Point(random(0, width - 1), random(0, height - 1))
    return snake.some(p => p.equals(food))
      ? this.makeFood()
      : food
  }

  render() {
    const {
      snake,
      food,
    } = this.state
    return (
      <svg
        width={500}
        height={500}
      >
        {snake && snake.map(p => (
          <Rect
            key={`${p.x},${p.y}`}
            color="red"
            width={1}
            height={1}
          />
        ))}
        {food &&
          <Rect
            color="blue"
            width={1}
            height={1}
          />
        }
      </svg>
    )
  }
}

export default Game

import React, { PureComponent } from 'react'
import styled from 'styled-components'
import isShallowEqual from 'shallowequal'
import { range, random } from 'lodash'

import Square from 'components/Square'

import Point from 'utils/Point'
import Direction from 'utils/Direction'
import directionByKeyCode from 'utils/directionByKeyCode'
import directionsAreOpposite from 'utils/directionsAreOpposite'
import offsetByDirection from 'utils/offsetByDirection'

import GameLoop from './GameLoop'

const START_X = 2
const MAX_SVG_WIDTH = 700
const MAX_SVG_HEIGHT = 400

const Board = styled.svg`
  border: 1px solid #999;
`

interface Props {
  width: number,
  height: number,
  speed: number,
  initialLength: number,
  onScoreChange: (score: number) => void,
}

interface State {
  svgDimensions: {
    width: number,
    height: number,
  },
  interval: number,
  running: boolean,
  snake: Point[],
  direction: Direction,
  lastDirection: Direction,
  food: Point | null,
  score: number,
  gameOver: boolean,
}

class Game extends PureComponent<Props, State> {
  gameLoop: GameLoop | null = null

  constructor(props) {
    super(props)

    const interval = 1000 / props.speed
    const snake = range(START_X + props.initialLength, START_X).map(x => new Point(
      x,
      props.height >> 1,
    ))

    const rX = MAX_SVG_WIDTH / props.width
    const rY = MAX_SVG_HEIGHT / props.height
    const min = Math.min(rX, rY)
    const [newWidth, newHeight] = [props.width, props.height].map(i => i * min)

    this.state = {
      svgDimensions: {
        width: newWidth,
        height: newHeight,
      },
      interval,
      running: true,
      snake,
      direction: Direction.RIGHT,
      lastDirection: Direction.RIGHT,
      food: null,
      score: 0,
      gameOver: false,
    }

    this.runGameLoop(interval)

    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
    if (this.gameLoop) {
      this.gameLoop.stop()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this
    if (nextProps.speed !== props.speed) {
      const interval = 1000 / props.speed
      this.setState({
        interval,
      })
      if (this.gameLoop) {
        this.gameLoop.interval = interval
      }
      return
    }
    if (isShallowEqual(props, nextProps)) {
      return
    }
    this.reset(nextProps)
  }

  reset(props) {
    if (this.gameLoop) {
      this.gameLoop.stop()
    }
    // TODO
  }

  componentDidUpdate() {
    const { state } = this
    if (state.gameOver) {
      if (this.gameLoop) {
        this.gameLoop.stop()
      }
    } else if (!state.running || state.food) {
      return
    }
    this.setState({
      food: this.makeFood(),
    })
  }

  private onKeyDown = (e: KeyboardEvent) => {
    const { lastDirection } = this.state
    const dir = directionByKeyCode(e.keyCode)
    if (dir < 0 || dir === lastDirection || directionsAreOpposite(lastDirection, dir)) {
      return
    }
    this.setState({
      direction: dir,
    })
  }

  private runGameLoop(interval: number) {
    this.gameLoop = new GameLoop(interval, (numFrames) => {
      const { props } = this
      const {
        snake,
        direction,
        food,
        score,
      } = this.state
      const oldTail = snake.pop()
      const oldHead = snake[0]
      const offset = offsetByDirection(direction)
      const newHead = oldHead.add(offset)

      const eaten = food && newHead.equals(food)
      const died = !eaten && snake.some(p => p.equals(newHead))
        || newHead.x < 0
        || newHead.y < 0
        || newHead.x >= props.width
        || newHead.y >= props.height

      const newSnake = [newHead, ...snake]
      if (eaten && oldTail) {
        newSnake.push(oldTail)
      }

      this.setState({
        snake: newSnake,
        food: eaten ? null : food,
        lastDirection: direction,
        score: eaten ? score + 1 : score,
        gameOver: died,
      })
    }).start()
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
      width,
      height,
    } = this.props

    const {
      svgDimensions,
      snake,
      food,
    } = this.state

    return (
      <Board
        xmlns="http://www.w3.org/2000/svg"
        width={svgDimensions.width}
        height={svgDimensions.height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          border: '1px gray solid',
        }}
      >
        {snake.map(p => (
          <Square
            coordinates={p}
            fill="red"
            stroke="black"
            strokeWidth={0.1}
          />
        ))}
        {food &&
          <Square
            coordinates={food}
            fill="blue"
            stroke="black"
            strokeWidth={0.1}
          />
        }
      </Board>
    )
  }
}

export default Game

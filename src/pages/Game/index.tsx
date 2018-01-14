import React, { PureComponent } from 'react'
import { range, random } from 'lodash'

import Square from 'components/Square'

import Point from 'utils/Point'
import Direction from 'utils/Direction'
import directionByKeyCode from 'utils/directionByKeyCode'
import offsetByDirection from 'utils/offsetByDirection'

import GameLoop from './GameLoop'

const START_X = 2
const MAX_SVG_WIDTH = 700
const MAX_SVG_HEIGHT = 400

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
  snake: Point[],
  direction: Direction,
  food: Point | null,
  score: number,
}

class Game extends PureComponent<Props, State> {
  gameLoop: GameLoop | null = null

  constructor(props) {
    super(props)

    const interval = 1000 / props.speed
    const snake = range(START_X, START_X + props.initialLength).map(x => new Point(
      x,
      props.height >> 1,
    ))

    const rX = MAX_SVG_WIDTH / props.width
    const rY = MAX_SVG_HEIGHT / props.height
    const min = Math.min(rX, rY)
    const [newWidth, newHeight] = [props.width, props.height].map(i => i * min)

    this.setState({
      svgDimensions: {
        width: newWidth,
        height: newHeight,
      },
      interval,
      snake,
      direction: Direction.RIGHT,
      food: null,
      score: 0,
    }, () => {
      this.setState({
        food: this.makeFood(),
      })
    })

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
    this.reset(nextProps)
  }

  reset(props) {
    if (this.gameLoop) {
      this.gameLoop.stop()
    }
    // TODO
  }

  private onKeyDown = (e: KeyboardEvent) => {
    this.setState({
      direction: directionByKeyCode(e.keyCode),
    })
  }

  private runGameLoop(interval: number) {
    this.gameLoop = new GameLoop(interval, () => {
      const { props } = this
      const {
        snake,
        direction,
        food,
        score,
      } = this.state
      snake.pop()
      const oldHead = snake[0]
      const offset = offsetByDirection(direction)
      const newHead = oldHead.add(offset)
      const newSnake = [newHead, ...snake]

      const eaten = food && newHead.equals(food)
      const newScore = eaten ? score + 1 : score
      if (eaten) {
        props.onScoreChange(newScore)
      }

      this.setState({
        snake: newSnake,
        food: eaten ? null : food,
        score: newScore,
      }, () => {
        if (this.state.food) {
          return
        }
        this.setState({
          food: this.makeFood(),
        })
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={svgDimensions.width}
        height={svgDimensions.height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {snake.map(p => (
          <Square
            coordinates={p}
            color="red"
          />
        ))}
        {food &&
          <Square
            coordinates={food}
            color="blue"
          />
        }
      </svg>
    )
  }
}

export default Game

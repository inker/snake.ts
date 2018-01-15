import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { range, random } from 'lodash'

import Square from 'components/Square'
import GameOver from 'components/GameOver'

import Point from 'utils/Point'
import Direction from 'utils/Direction'
import directionByKeyCode from 'utils/directionByKeyCode'
import directionsAreOpposite from 'utils/directionsAreOpposite'
import offsetByDirection from 'utils/offsetByDirection'

import GameLoop from './GameLoop'

const START_X = 2
const MAX_SVG_WIDTH = 700
const MAX_SVG_HEIGHT = 500

const makeInitialSnake = (props: Props) =>
  range(START_X + props.initialLength, START_X).map(x => new Point(
    x,
    props.height >> 1,
  ))

function getDimensions(props: Props) {
  const rX = MAX_SVG_WIDTH / props.width
  const rY = MAX_SVG_HEIGHT / props.height
  const min = Math.min(rX, rY)
  const [width, height] = [props.width, props.height].map(i => i * min)
  return {
    width,
    height,
  }
}

const Root = styled.div`
  border: 1px solid #999;
  // @ts-ignore
  width: ${props => props.width ? `${props.width}px` : '100%'};
  // @ts-ignore
  height: ${props => props.height ? `${props.height}px` : '100%'};
`

interface Props {
  gameId: string,
  running: boolean,
  width: number,
  height: number,
  speed: number,
  initialLength: number,
  onScoreChange?: (score: number) => void,
  onGameOVer?: () => void,
}

interface State {
  svgDimensions: {
    width: number,
    height: number,
  },
  interval: number,
  snake: Point[],
  direction: Direction,
  lastDirection: Direction,
  food: Point | null,
  score: number,
  gameOver: boolean,
}

class Game extends PureComponent<Props, State> {
  private gameLoop: GameLoop

  constructor(props) {
    super(props)

    const interval = 1000 / props.speed
    const snake = makeInitialSnake(props)

    this.state = {
      svgDimensions: getDimensions(props),
      interval,
      snake,
      direction: Direction.RIGHT,
      lastDirection: Direction.RIGHT,
      food: this.makeFood(snake),
      score: 0,
      gameOver: false,
    }

    this.runGameLoop(interval)
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
    this.gameLoop.stop()
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this
    if (nextProps.gameId !== props.gameId) {
      this.reset(nextProps)
      return
    }
    if (nextProps.speed !== props.speed) {
      const interval = 1000 / nextProps.speed
      this.setState({
        interval,
      })
      this.gameLoop.interval = interval
      return
    }
    if (nextProps.running !== props.running) {
      this.gameLoop[nextProps.running ? 'start' : 'stop']()
      return
    }
    if (nextProps.height !== props.height || nextProps.width !== props.width) {
      this.setState({
        svgDimensions: getDimensions(nextProps),
      })
      return
    }
  }

  componentDidUpdate() {
    const { state } = this
    if (state.gameOver) {
      this.gameLoop.stop()
    }
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
      const oldTail = snake.pop() as Point
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
      const newScore = eaten ? score + 1 : score
      if (eaten) {
        newSnake.push(oldTail)
        if (props.onScoreChange) {
          props.onScoreChange(newScore)
        }
      }

      if (died && props.onGameOVer) {
        props.onGameOVer()
      }

      this.setState({
        snake: newSnake,
        food: eaten ? this.makeFood(newSnake) : food,
        lastDirection: direction,
        score: newScore,
        gameOver: died,
      })
    }).start()
  }

  private reset(props) {
    const { gameLoop } = this
    gameLoop.stop()
    const snake = makeInitialSnake(props)
    this.setState({
      snake,
      direction: Direction.RIGHT,
      lastDirection: Direction.RIGHT,
      food: this.makeFood(snake),
      score: 0,
      gameOver: false,
    })
    gameLoop.start()
  }

  private makeFood(snake: Point[]): Point {
    const { width, height } = this.props
    const food = new Point(random(0, width - 1), random(0, height - 1))
    return snake.some(p => p.equals(food))
      ? this.makeFood(snake)
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
      gameOver,
      score,
    } = this.state

    return (
      <Root
        // @ts-ignore
        width={svgDimensions.width}
        height={svgDimensions.height}
      >
        {gameOver ? <GameOver score={score} /> :
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={svgDimensions.width}
            height={svgDimensions.height}
            viewBox={`0 0 ${width} ${height}`}
          >
            {snake.map(p => (
              <Square
                key={`${p.x},${p.y}`}
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
          </svg>
        }
      </Root>
    )
  }
}

export default Game

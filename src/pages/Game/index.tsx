import React, { PureComponent } from 'react'
import {
  identity,
  initial,
  range,
  random,
} from 'lodash'

import Square from 'components/Square'
import GameOver from 'components/GameOver'

import Point from 'utils/Point'
import Direction from 'utils/Direction'
import directionByKeyCode from 'utils/directionByKeyCode'
import directionsAreOpposite from 'utils/directionsAreOpposite'
import offsetByDirection from 'utils/offsetByDirection'

import Board from './Board'
import GameLoop from './GameLoop'

const START_X = 2

const makeInitialSnake = (props: Props) =>
  range(START_X + props.initialLength, START_X).map(x => new Point(
    x,
    props.height >> 1,
  ))

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
      interval,
      snake,
      direction: Direction.RIGHT,
      lastDirection: Direction.RIGHT,
      food: this.makeFood(snake),
      score: 0,
      gameOver: false,
    }
  }

  componentDidMount() {
    this.runGameLoop(this.state.interval)
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentDidUpdate(prevProps: Props) {
    const { props } = this

    if (props.gameId !== prevProps.gameId) {
      this.reset()
    }

    if (props.running !== prevProps.running) {
      this.gameLoop[props.running ? 'start' : 'stop']()
    }

    if (props.speed !== prevProps.speed) {
      const interval = 1000 / props.speed
      this.setState({
        interval,
      })
      this.gameLoop.interval = interval
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
    this.gameLoop.stop()
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (!this.props.running) {
      return
    }
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
      const oldHead = snake[0]
      const offset = offsetByDirection(direction)
      const newHead = oldHead.add(offset)

      const eaten = food && newHead.equals(food)
      const died = !eaten && snake.some(p => p.equals(newHead))
        || newHead.x < 0
        || newHead.y < 0
        || newHead.x >= props.width
        || newHead.y >= props.height

      const newTail = (eaten ? identity : initial)(snake)
      const newSnake = [newHead, ...newTail]
      const newScore = eaten ? score + 1 : score

      if (eaten && props.onScoreChange) {
        props.onScoreChange(newScore)
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

  private reset() {
    const {
      props,
      gameLoop,
    } = this

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
      snake,
      food,
      gameOver,
      score,
    } = this.state

    return (
      <>
        <Board
          width={width}
          height={height}
          popup={gameOver ? <GameOver score={score} /> : null}
        >
          {snake.map(p => (
            <Square
              key={`${p.x},${p.y}`}
              coordinates={p}
              fill="blue"
            />
          ))}
          {food &&
            <Square
              coordinates={food}
              fill="red"
            />
          }
        </Board>
      </>
    )
  }
}

export default Game

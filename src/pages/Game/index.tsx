import React, { PureComponent } from 'react'
import {
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

function makeFood(width: number, height: number, snake: Point[]) {
  const food = new Point(random(0, width - 1), random(0, height - 1))
  return snake.some(p => p.equals(food))
    ? makeFood(width, height, snake)
    : food
}

function getInitialState(props: Props): State {
  const interval = 1000 / props.speed
  const snake = makeInitialSnake(props)

  return {
    interval,
    snake,
    direction: Direction.RIGHT,
    lastDirection: Direction.RIGHT,
    food: makeFood(props.width, props.height, snake),
    score: 0,
    gameOver: false,
  }
}

interface Props {
  gameId: string,
  running: boolean,
  width: number,
  height: number,
  speed: number,
  initialLength: number,
  onScoreChange?: (score: number) => void,
  onGameOver?: () => void,
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

  constructor(props: Props) {
    super(props)
    this.state = getInitialState(props)
    this.gameLoop = new GameLoop(this.state.interval, this.onLoopUpdate)
  }

  componentDidMount() {
    this.gameLoop.start()
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

  private reset() {
    this.setState(getInitialState(this.props))
    this.gameLoop.start()
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

  private onLoopUpdate = () => {
    const {
      width,
      height,
      onScoreChange,
      onGameOver,
    } = this.props

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
      || newHead.x >= width
      || newHead.y >= height

    const newTail = eaten ? snake : initial(snake)
    const newSnake = [newHead, ...newTail]
    const newScore = eaten ? score + 1 : score

    if (eaten && onScoreChange) {
      onScoreChange(newScore)
    }
    if (died && onGameOver) {
      onGameOver()
    }

    this.setState({
      snake: newSnake,
      food: eaten ? makeFood(width, height, newSnake) : food,
      lastDirection: direction,
      score: newScore,
      gameOver: died,
    })
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
          {food && (
            <Square
              coordinates={food}
              fill="red"
            />
          )}
        </Board>
      </>
    )
  }
}

export default Game

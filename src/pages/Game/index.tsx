import React, {
  useRef,
  useState,
  useEffect,
  memo,
} from 'react'
import {
  initial,
  range,
  random,
  uniqBy,
} from 'lodash'

import Square from 'components/Square'
import GameOver from 'components/GameOver'

import Point from 'utils/Point'
import Direction from 'utils/Direction'
import offsetByDirection from 'utils/offsetByDirection'

import useSnakeDirection from 'utils/hooks/useSnakeDirection'

import Board from './Board'
import GameLoop from './GameLoop'

const START_X = 2

const pointToString = (p: Point) =>
  `${p.x},${p.y}`

function makeInitialSnake(initialLength: number, boardHeight: number) {
  const y = random(0, boardHeight - 1)
  return range(START_X + initialLength, START_X)
    .map(x => new Point(x, y))
}

function makeFood(boardWidth: number, boardHeight: number, snake: Point[]) {
  const food = new Point(random(0, boardWidth - 1), random(0, boardHeight - 1))
  return snake.some(p => p.equals(food))
    ? makeFood(boardWidth, boardHeight, snake)
    : food
}

function getInitialState(props: Props): State {
  const snake = makeInitialSnake(props.initialLength, props.height)
  const food = makeFood(props.width, props.height, snake)

  return {
    snake,
    food,
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
  score: number,
  onScoreChange?: (score: number) => void,
  onGameOver?: () => void,
}

interface State {
  snake: Point[],
  food: Point | null,
  gameOver: boolean,
}

const Game = (props: Props) => {
  const {
    gameId,
    running,
    width,
    height,
    speed,
    score,
    onScoreChange,
    onGameOver,
  } = props

  const [state, setState] = useState<State>(getInitialState(props))
  const [interval, setInterval] = useState(1000 / speed)
  const [direction, syncDirection, resetDirection] = useSnakeDirection(Direction.RIGHT)

  const {
    snake,
    food,
    gameOver,
  } = state

  const onLoopUpdate = () => {
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

    syncDirection()

    setState({
      snake: newSnake,
      food: eaten ? makeFood(width, height, newSnake) : food,
      gameOver: died,
    })
  }

  const { current: gameLoop } = useRef(new GameLoop(interval, onLoopUpdate))
  gameLoop.onUpdate = onLoopUpdate

  useEffect(() => {
    gameLoop.start()
    return () => {
      gameLoop.stop()
    }
  }, [])

  useEffect(() => {
    resetDirection()
    setState(getInitialState(props))
    gameLoop.start()
  }, [gameId])

  useEffect(() => {
    gameLoop[running ? 'start' : 'stop']()
  }, [running])

  useEffect(() => {
    const newInterval = 1000 / speed
    setInterval(newInterval)
    gameLoop.interval = newInterval
  }, [speed, setInterval])

  return (
    <>
      <Board
        width={width}
        height={height}
        popup={gameOver ? <GameOver score={score} /> : null}
      >
        {uniqBy(snake, pointToString).map(p => (
          <Square
            key={pointToString(p)}
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

export default memo(Game)

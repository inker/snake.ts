import React, {
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
import Start from 'components/Start'
import GameOver from 'components/GameOver'

import Point from 'utils/Point'
import Direction from 'utils/Direction'
import offsetByDirection from 'utils/offsetByDirection'

import Board from './Board'
import useGameLoop from './useGameLoop'
import useSnakeDirection from './useSnakeDirection'

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

function getInitialState(
  boardWith: number,
  boardHeight: number,
  initialSnakeLength: number,
): State {
  const snake = makeInitialSnake(initialSnakeLength, boardHeight)
  const food = makeFood(boardWith, boardHeight, snake)

  return {
    snake,
    food,
  }
}

interface Props {
  gameId: string,
  isRunning: boolean,
  score: number,
  isGameOver: boolean,
  isStart: boolean,
  width: number,
  height: number,
  speed: number,
  initialLength: number,
  onScoreChange: (score: number) => void,
  onGameOver: () => void,
}

interface State {
  snake: Point[],
  food: Point | null,
}

const Game = ({
  gameId,
  isRunning,
  width,
  height,
  speed,
  score,
  isGameOver,
  isStart,
  initialLength,
  onScoreChange,
  onGameOver,
}: Props) => {
  const initialState = getInitialState(width, height, initialLength)

  const [state, setState] = useState<State>(initialState)
  const [direction, syncDirection, resetDirection] = useSnakeDirection(Direction.RIGHT)

  const {
    snake,
    food,
  } = state

  useEffect(() => {
    resetDirection()
    setState(initialState)
  }, [gameId])

  useGameLoop(
    isRunning && !isGameOver && !isStart,
    1000 / speed,
    () => {
      syncDirection()

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

      if (eaten) {
        onScoreChange(score + 1)
      }

      if (died) {
        onGameOver()
      }

      setState({
        snake: newSnake,
        food: eaten ? makeFood(width, height, newSnake) : food,
      })
    },
  )

  const popup = isStart
    ? <Start />
    : isGameOver
      ? <GameOver score={score} />
      : null

  return (
    <>
      <Board
        width={width}
        height={height}
        popup={popup}
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

import React, {
  useRef,
  useEffect,
  useCallback,
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
import directionByKeyCode from 'utils/directionByKeyCode'
import directionsAreOpposite from 'utils/directionsAreOpposite'
import offsetByDirection from 'utils/offsetByDirection'
import usePartialState from 'utils/hooks/usePartialState'
import useEvent from 'utils/hooks/useEvent'

import Board from './Board'
import GameLoop from './GameLoop'

const START_X = 2

const pointToString = (p: Point) =>
  `${p.x},${p.y}`

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
  interval: number,
  snake: Point[],
  direction: Direction,
  lastDirection: Direction,
  food: Point | null,
  gameOver: boolean,
}

const Game = (props: Props) => {
  const [state, setState] = usePartialState<State>(getInitialState(props))

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

  const {
    interval,
    snake,
    direction,
    food,
    gameOver,
    lastDirection,
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

    setState({
      snake: newSnake,
      food: eaten ? makeFood(width, height, newSnake) : food,
      lastDirection: direction,
      gameOver: died,
    })
  }

  const { current: gameLoop } = useRef(new GameLoop(interval, onLoopUpdate))
  gameLoop.onUpdate = onLoopUpdate

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (!running) {
      return
    }
    const dir = directionByKeyCode(e.keyCode)
    if (dir < 0 || dir === lastDirection || directionsAreOpposite(lastDirection, dir)) {
      return
    }
    setState({
      direction: dir,
    })
  }, [running, lastDirection, setState])

  useEvent('keydown', onKeyDown)

  useEffect(() => {
    gameLoop.start()
    return () => {
      gameLoop.stop()
    }
  }, [])

  const reset = () => {
    setState(getInitialState(props))
    gameLoop.start()
  }

  useEffect(() => {
    reset()
  }, [gameId])

  useEffect(() => {
    gameLoop[running ? 'start' : 'stop']()
  }, [running])

  useEffect(() => {
    const newInterval = 1000 / props.speed
    setState({
      interval: newInterval,
    })
    gameLoop.interval = newInterval
  }, [speed])

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

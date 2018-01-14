import Direction from './Direction'

export default (dir1: Direction, dir2: Direction) =>
  dir1 === Direction.UP && dir2 === Direction.DOWN
    || dir1 === Direction.DOWN && dir2 === Direction.UP
    || dir1 === Direction.RIGHT && dir2 === Direction.LEFT
    || dir1 === Direction.LEFT && dir2 === Direction.RIGHT

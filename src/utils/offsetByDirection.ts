import Direction from './Direction'
import Point from './Point'

export default (dir: Direction) => new Point(
  dir === Direction.LEFT ? -1 : dir === Direction.RIGHT ? 1 : 0,
  dir === Direction.UP ? -1 : dir === Direction.DOWN ? 1 : 0,
)

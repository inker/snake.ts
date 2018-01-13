import Direction from './Direction'

export default (keyCode: number) => {
  switch (keyCode) {
    case 38:
      return Direction.UP

    case 39:
      return Direction.RIGHT

    case 37:
      return Direction.LEFT

    case 40:
      return Direction.DOWN

    default:
      return -1
  }
}

import Direction from './Direction'

export default (keyCode: number) => {
  switch (keyCode) {
    case 38:
    case 87:
      return Direction.UP

    case 39:
    case 68:
      return Direction.RIGHT

    case 37:
    case 65:
      return Direction.LEFT

    case 40:
    case 83:
      return Direction.DOWN

    default:
      return -1
  }
}

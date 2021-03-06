interface PointLike {
  x: number,
  y: number,
}

export default class Point implements PointLike {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(p: PointLike) {
    return new Point(this.x + p.x, this.y + p.y)
  }

  subtract(p: PointLike) {
    return new Point(this.x - p.x, this.y - p.y)
  }

  equals(p: PointLike) {
    return this.x === p.x && this.y === p.y
  }
}

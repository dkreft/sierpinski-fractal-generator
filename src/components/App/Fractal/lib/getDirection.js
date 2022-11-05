const R2D = 180 / Math.PI


export default function getDirection(from, to) {
  const dY = to.y - from.y
  const dX = to.x - from .x

  const slope = dY / dX

  const angle = atan(slope)

  if ( dX < 0 ) {
    if ( dY < 0 ) {
      return angle - 180
    }

    return angle + 180
  }

  return angle
}

function atan(slope) {
  return r2d(Math.atan(slope))
}

function r2d(rad) {
  return rad * R2D
}

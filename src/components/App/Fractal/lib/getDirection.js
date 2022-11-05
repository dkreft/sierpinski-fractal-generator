const R2D = 180 / Math.PI


export default function getDirection(from, to) {
  if ( !from || !to ) {
    return
  }

  const dY = to.y - from.y
  const dX = to.x - from .x
  
  const slope = dY / dX

  return atan(slope)
}

function atan(slope) {
  return r2d(Math.atan(slope))
}

function r2d(rad) {
  return rad * R2D
}

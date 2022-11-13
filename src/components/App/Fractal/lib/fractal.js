import getDirection from './getDirection'

const D2R = Math.PI / 180

const CANVAS_BACKGROUND_COLOR = '#fff'
const MIN_SIDE_LENGTH = 1.5
const SHAPE_FILL_COLOR = 'rgba(0, 0, 0, 0.15)'
const STROKE_COLOR = '#000'


export default function drawFractal(canvas, opts = {}) {
  const ratio = Math.min(0.999, opts.ratio)

  const ctx = makeContext(canvas)

  ctx.translate(canvas.width * 0.5,
                canvas.height * 0.5)

  const lengths = new Set()

  const shapesToDraw = [
    buildShape({
      length: opts.length,
      startX: -(opts.length / 2),
      startY: (opts.length / 3),
    })
  ]

  while ( shapesToDraw.length ) {
    const shape = shapesToDraw.shift()

    lengths.add(shape.length)

    drawPolygon(ctx, shape, STROKE_COLOR)

    if ( lengths.size >= opts.limit ) {
      continue
    }

    const {
      length,
      points,
    } = shape

    const newLength = length * ratio

    if ( newLength < MIN_SIDE_LENGTH ) {
      console.warn('new Length too small to render')
      continue
    }

    for ( let j = 0; j < points.length; ++j ) {
      const p1 = points[j]
      const p2 = points[j + 1] || points[0]

      const direction = getDirection(p1, p2) - opts.shiftAngle

      const child = buildShape({
        direction,
        length: newLength,
        startX: p1.x,
        startY: p1.y,
      })

      shapesToDraw.push(child)
    }
  }
}

function makeContext(canvas) {
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = CANVAS_BACKGROUND_COLOR
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return ctx
}

function drawPolygon(ctx, { direction, length, points }, strokeColor) {
  const [start, ...others] = points

  ctx.strokeStyle = strokeColor
  ctx.fillStyle = SHAPE_FILL_COLOR

  ctx.beginPath()
  ctx.moveTo(start.x, start.y)

  others.forEach(({ x, y }) => {
    ctx.lineTo(x, y)
    ctx.stroke()
  })

  ctx.closePath()

  ctx.fill()
  ctx.stroke()
}

function buildShape({ direction = 0, length, startX, startY }) {
  const points = [
    {
      x: startX,
      y: startY,
    },
    getNextPoint({
      angle: direction,
      length,
      x: startX,
      y: startY,
    }),
    getNextPoint({
      angle: direction - 60,
      length,
      x: startX,
      y: startY,
    })
  ]

  return {
    length,
    points,
  }
}

function getNextPoint({ angle, length, x, y }) {
  return {
    x: x + length * cos(angle),
    y: y + length * sin(angle),
  }
}

function cos(deg) {
  return Math.cos(d2r(deg))
}

function sin(deg) {
  return Math.sin(d2r(deg))
}

function d2r(degrees) {
  return degrees * D2R
}

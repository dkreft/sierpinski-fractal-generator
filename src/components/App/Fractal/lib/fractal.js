import getDirection from './getDirection'

const D2R = Math.PI / 180

const COLORS = ['black'] //, 'red', 'orange', 'yellow', 'green', 'cyan', 'violet', 'cyan', 'violet']
const MIN_SIDE_LEGNTH = 1.5


export default function drawFractal(canvas, opts = {}) {
  const colors = colorGenerator()

  const ratio = Math.min(0.999, opts.ratio)

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff' //'#242424'
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.translate(canvas.width * 0.5,
                canvas.height * 0.5)

  const root = buildShape({
    direction: opts.direction,
    length: opts.length,
    startX: -(opts.length / 2),
    startY: (opts.length / 3),
  })

  const shapesToDraw = [root]

  const lengthColorMap = new Map()

  while ( shapesToDraw.length ) {
    const shape = shapesToDraw.shift()

    const color = (function() {
      if ( !lengthColorMap.has(shape.length) ) {
        lengthColorMap.set(shape.length, colors.next().value)
      }

      return lengthColorMap.get(shape.length)
    })()

    ctx.strokeStyle = color

    drawPolygon(ctx, shape)

    const {
      length,
      points,
    } = shape

    const newLength = length * ratio

    if ( newLength < MIN_SIDE_LENGTH ) {
      console.warn('new Length too small to render')
      break
    }

    if ( lengthColorMap.size >= opts.limit ) {
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

function drawPolygon(ctx, { direction, length, points }) {
  const [start, ...others] = points

  ctx.beginPath()
  ctx.fillStyle = `rgba(0, 0, 0, 0.15)`
  ctx.moveTo(start.x, start.y)

  others.forEach(({ x, y }, i) => {
    ctx.lineTo(x, y)
    ctx.stroke()
  })

  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

function* colorGenerator() {
  let idx = 0
  while ( 1 ) {
    yield COLORS[idx]

    ++idx

    if ( idx > COLORS.length - 1 ) {
      idx = 0
    }
  }
}

function buildShape({ direction, length, startX, startY }) {
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

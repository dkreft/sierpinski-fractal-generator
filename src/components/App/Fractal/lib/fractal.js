import getDirection from './getDirection'

const D2R = Math.PI / 180

const COLORS = ['#fff', '#f00', '#0f0', '#00f', 'pink', 'cyan', 'violet']


export default function drawFractal(canvas, opts = {}) {
  const colors = colorGenerator()

  const ctx = canvas.getContext('2d')

  ctx.translate(canvas.width * 0.5,
                canvas.height * 0.5)

  const root = buildShape({
    direction: opts.direction,
    length: opts.length,
    startX: -(opts.length / 2),
    startY: (opts.length / 3),
  })

  const shapesToDraw = [root]

  let i = 0

  do {
    ctx.strokeStyle = colors.next().value

    const shape = shapesToDraw.shift()

    drawPolygon(ctx, shape)

    const {
      length,
      points,
    } = shape

    const newLength = length / 2
    if ( newLength < 2 ) {
      console.warn('new Length too small to render')
      break
    }

    ++i

    for ( let j = 0; j < points.length; ++j ) {
      const p1 = points[j]
      const p2 = points[j + 1] || points[0]

      const direction = getDirection(p1, p2) - 60

      const child = buildShape({
        direction,
        length: newLength,
        startX: p1.x,
        startY: p1.y,
      })

      shapesToDraw.push(child)
    }
  } while ( i < opts.limit )
}

function drawPolygon(ctx, { direction, length, points }) {
  const [start, ...others] = points

  ctx.beginPath()

  ctx.moveTo(start.x, start.y)

  //  ctx.strokeText(`(${ start.x }, ${ start.y })`, start.x + 20, start.y + 10)

  others.forEach(({ x, y }, i) => {
    ctx.lineTo(x, y)
    //ctx.strokeText(`(${ x }, ${ y })`, x + 20, y + 10)
    ctx.stroke()
  })

  ctx.lineTo(start.x, start.y)

  ctx.stroke()
  ctx.closePath()
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

import getDirection from './getDirection'

const COS60 = 0.5
const SIN60 = Math.sqrt(3) / 2
const D2R = Math.PI / 180

const COLORS = ['#fff', '#f00', '#0f0', '#00f', 'pink', 'cyan', 'violet']
const LIMIT = 4 //Math.pow(2, 5)

const LENGTH = 400


export default function drawFractal(canvas) {
  const DIRECTION = 110

  //const canvas = document.getElementById('canvas')
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  let pointNum = 0

  const colors = colorGenerator()

  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = '#000'
  ctx.font = '14px monospace'
  ctx.translate(canvas.width * 0.3,
                canvas.height * 0.6)

  const root = buildShape({
    bounds: {
      x: [-canvas.width * 0.5, canvas.width * 0.5],
      y: [-canvas.width * 0.5, canvas.height * 0.5],
    },
    startX: 0,
    startY: 0,
    length: LENGTH,
    direction: DIRECTION,
  })

  console.log('root: %o', root)

  const shapesToDraw = [root]

  let i = 0

  do {
    ++i

    ctx.strokeStyle = colors.next().value

    const shape = shapesToDraw.shift()

    console.group('SHAPE (%o): %o', ctx.strokeStyle, shape)

    drawPolygon(shape)
    
    const length = shape.length / 2
    if ( length < 1 ) {
      console.warn('new Length too small to render')
      break
    }
    
    const {
      bounds,
      points,
    } = shape

    for ( let j = 0; j < points.length; ++j ) {
      const p1 = points[j]
      const p2 = points[j + 1] || points[0]

      const direction = getDirection(p2, p1)

      const child = buildShape({
        bounds,
        direction,
        length,
        startX: p1.x,
        startY: p1.y,
      })

      shapesToDraw.push(child)
    }

    console.groupEnd()
  } while ( i < LIMIT && i <= shapesToDraw.length )


  //
  // Functions
  //

  function buildShape({ bounds, direction, length, startX, startY }) {
    console.group('buildShape(%o)', { bounds })

    console.log('DIRECTION: %o', direction)
    const p1 = {
      x: startX,
      y: startY,
    }

    // const p2 = getNextPoint({
    //   angle: direction,
    //   length,
    //   x: startX,
    //   y: startY,
    // })

    // const p3 = getNextPoint({
    //   angle: direction - 60,
    //   length,
    //   x: startX,
    //   y: startY,
    // })
    
    const p2 = getPointWithinBounds({
      angle: direction,
      bounds,
      length,
      startX,
      startY,
    })
    
    const p3 = getPointWithinBounds({
      angle: direction - 60,
      bounds,
      length,
      startX,
      startY,
    })

    const points = [
      p1,
      p2,
      p3,
    ]
    console.log('points: %o', points)
    const shape = {
      length,
      direction,
      bounds: getBounds(points),
      points,
    }

    console.log('shape: %o', shape)
    console.groupEnd()
    return shape
  }

  function getNextPoint({ angle, length, x, y }) {
    return {
      angle,
      x: x + length * cos(angle),
      y: y + length * sin(angle),
    }
  }

  function getPointWithinBounds({ angle, bounds, length, startX, startY }) {
    const x = getCoordValue({
      bounds: bounds.x,
      length: length * cos(angle),
      start: startX,
    })
    
    const y = getCoordValue({
      bounds: bounds.y,
      length: length * sin(angle),
      start: startY,
    })
    
    return { x, y }
  }

  function getCoordValue({ bounds, length, start }) {
    const finalValue = start + length

    console.log('getCoordValue: %o < %o || %o > %o',
                finalValue,
                bounds[0],
                finalValue,
                bounds[1])
    
    if ( finalValue < bounds[0] || finalValue > bounds[1] ) {
      console.log('subtracting %o - %o', start, length)
      return start - length
    }

    return finalValue
  }

  function getBounds(points) {
    const xValues = points.map(({ x }) => x)
    const yValues = points.map(({ y }) => y)

    return {
      x: [
        Math.min(...xValues),
        Math.max(...xValues),
      ],
      y: [
        Math.min(...yValues),
        Math.max(...yValues),
      ],
    }
  }

  function drawPolygon({ direction, length, points }) {
    console.group('drawPolygon(%o)', { direction, length, points })
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

    console.groupEnd()
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
}

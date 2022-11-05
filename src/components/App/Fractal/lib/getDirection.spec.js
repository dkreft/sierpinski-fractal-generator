import getDirection from './getDirection'

import { runTestSuite } from 'test/helpers/bdd-helpers'


describe('getDirection()', () => {
  def('from', () => ({
    x: 0,
    y: 0,
  }))
  def('to', () => ({
    x: $x,
    y: $y,
  }))
  def('x', () => void 0)
  def('y', () => void 0)

  subject(() => getDirection($from, $to))

  const tests = new Map([
    [{ x: 1, y: 0 }, 0],
    [{ x: 1, y: 1 }, 45],
    [{ x: 0, y: 1 }, 90],
    [{ x: -1, y: 1 }, 135],
    [{ x: -1, y: 0 }, 180],
    [{ x: -1, y: -1 }, -135],
    [{ x: 0, y: -1 }, -90],
    [{ x: 1, y: -1 }, -45],
  ])

  runTestSuite(tests, ({ expected }) => {
    it(() => is.expected.toEqual(expected))
  })
})

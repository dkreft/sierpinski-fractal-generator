import getDirection from './getDirection'


describe('getDirection()', () => {
  def('from', () => void 0)
  def('to', () => void 0)

  subject(() => getDirection($from, $to))

  it(() => is.expected.toBeUndefined())
})

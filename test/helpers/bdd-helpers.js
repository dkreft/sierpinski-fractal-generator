/* eslint-env jest */


/**
 * @param {Map,Array} rows
 * @param {Function} test
 */
export function runTestSuite(rows, test) {
  if ( rows instanceof Map ) {
    return runMapTestSuite(rows, test)
  }

  if ( rows instanceof Array ) {
    return runArrayTestSuite(rows, test)
  }

  throw new Error(`Unrecognized rows argument: ${ rows }`)
}

/**
 * @param {Map} rows
 * @param {Function} test
 */
function runMapTestSuite(rows, test) {
  rows.forEach((expected, variables) => {
    buildContextForRow(test, variables)({ expected })
  })
}

/**
 * @param {Array} rows
 * @param {Function} test
 */
function runArrayTestSuite(rows, test) {
  rows.forEach((variables) => {
    buildContextForRow(test, variables)()
  })
}

/**
 * @param {Function} test
 * @param {Array{Array}} rows
 */
function buildContextForRow(test, variables) {
  return Object
    .entries(variables)
    .reduceRight(buildContext, test)
}

function buildContext(test, [key, value], index, array) {
  const variables = Object.fromEntries(array)

  return ({ expected } = {}) => {
    context(`when \`${ key }\` is ${ JSON.stringify(value) }`, () => {
      // eslint-disable-next-line no-undef
      def(key, () => value)

      test({
        expected,
        variables,
      })
    })
  }
}

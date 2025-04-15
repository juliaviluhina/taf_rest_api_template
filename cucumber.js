module.exports = {
  default: {
    features: [
      'src/features/**/*.feature'
    ],
    require: [
      'src/stepDefinitions/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ['progress-bar'],
    parallel: 2
  }
}
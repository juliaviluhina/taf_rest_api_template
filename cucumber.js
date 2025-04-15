module.exports = {
  default: {
    format: ['progress-bar', 'html:cucumber-report.html'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    requireModule: ['ts-node/register'],
    require: [
      'src/stepDefinitions/**/*.ts'
    ],
    import: [
      'src/features/**/*.feature'
    ]
  }
}
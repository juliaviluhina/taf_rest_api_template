module.exports = {
    compiler: 'ts:ts-node/register',
    requireModule: ['ts-node/register'],
    require: [
      'src/stepDefinitions/**/*.ts'
    ],
    format: [
      'progress-bar', 
      'html:cucumber-report.html'
    ]
  }
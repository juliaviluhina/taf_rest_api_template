module.exports = {
  default: {
    paths: ['src/features/**/*.feature'], 
    require: ['src/stepDefinitions/**/*.ts', 'src/support/world.ts'],
    requireModule: ['ts-node/register'],
    format: ['summary', 'json:./reports/cucumber_report.json']
  }
}



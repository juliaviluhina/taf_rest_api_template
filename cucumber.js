module.exports = {
  default: {
    tags: 'not @skip',
    format: ['progress', 'html:reports/cucumber-report.html'],
    publishQuiet: true,
    requireModule: ['ts-node/register'],
    require: ['src/features/**/*.steps.ts'],
    import: ['src/features/**/*.feature']
  }
};

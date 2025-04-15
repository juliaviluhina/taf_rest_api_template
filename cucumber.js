module.exports = {
  default: {
    // Explicitly specify feature file paths
    features: [
      'src/features/**/*.feature'
    ],
    // Specify step definition paths
    require: [
      'src/stepDefinitions/**/*.ts'
    ],
    // Ensure module loading
    requireModule: ['ts-node/register'],
    // Output formats
    format: [
      'progress-bar', 
      'html:cucumber-report.html'
    ],
    // Parallel execution
    parallel: 2,
    // Tags for filtering scenarios
    tags: 'not @ignore'
  }
}
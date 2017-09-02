/* eslint-env node */
let execSync = require('child_process').execSync;
//var RSVP = require('rsvp');

// For details on each option run `ember help release`
module.exports = {
  // local: true,
  // remote: 'some_remote',
  // annotation: "Release %@",
  // message: "Bumped version to %@",
  manifest: [ 'package.json', 'bower.json', 'yuidoc.json' ],
  // strategy: 'date',
  // format: 'YYYY-MM-DD',
  // timezone: 'America/Los_Angeles',

  beforeCommit(project, versions) {
  }
};

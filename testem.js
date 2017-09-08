/* eslint-env node */
module.exports = {
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "query_params": {
    "dockcontainer": true
  },
  "launch_in_ci": [
    "PhantomJS"
  ],
  "launch_in_dev": [
  ]
};

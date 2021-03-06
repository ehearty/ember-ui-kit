/* eslint-env node */
/* global require, module */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

const Config = {
  'ember-cli-babel': {
    includePolyfill: true
  },
  snippetSearchPaths: ['tests/dummy/app'],
  snippetRegexes: {
    begin: /{{#(?:docs-snippet|demo.example|demo.live-example)\sname=(?:\"|\')(\S+)(?:\"|\')/,
    end: /{{\/(?:docs-snippet|demo.example|demo.live-example)}}/,
  }
};

module.exports = function(defaults) {
  let appTree = new EmberAddon(defaults, Config).toTree();

  return new MergeTrees([
    appTree,
    new Funnel(appTree, {
      files: [ 'index.html' ],
      getDestinationPath() {
        return '404.html';
      }
    })
  ]);
};

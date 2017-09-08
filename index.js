/* jshint node: true */
'use strict';

const Merge = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const stew = require('broccoli-stew');

const path = require('path');

const SVGSpriter = require('./lib/svg-spriter');

module.exports = {
  name: 'ember-ui-kit',

  files: [
    // from `node_modules/`
    'element-resize-detector/dist/element-resize-detector.js',
    'jquery-mousewheel/jquery.mousewheel.js',
    'jquery-ui/ui/data.js',
    'jquery-ui/ui/version.js',
    'jquery-ui/ui/position.js',
    'jquery-ui/ui/ie.js',
    'jquery-ui/ui/scroll-parent.js',
    'jquery-ui/ui/disable-selection.js',
    'jquery-ui/ui/plugin.js',
    'jquery-ui/ui/widget.js',
    'jquery-ui/ui/widgets/mouse.js',
    'jquery-ui/themes/base/sortable.css',
    'jquery-ui/ui/widgets/sortable.js',
    'jquery-ui/themes/base/resizable.css',
    'jquery-ui/ui/widgets/resizable.js',
    'jquery-ui/themes/base/draggable.css',
    'jquery-ui/ui/widgets/draggable.js',
    'jquery-ui/ui/safe-active-element.js',
    'jquery-ui/ui/safe-blur.js',
    'perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js',
    'perfect-scrollbar/dist/css/perfect-scrollbar.css',

    'jquery-ui-touch-punch/jquery.ui.touch-punch.js',

    'perfect-scrollbar/dist/css/perfect-scrollbar.css',
    'perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js',

    // from `vendor/`
    //'ember-ui-kit/ui-table.css',
    //'ember-ui-kit/ui-scrollable.css',
    //'ember-ui-kit/ui-backdrop.css',
    //'ember-ui-kit/ui-position.css'
  ],

  treeForVendor(tree) {
    return new Merge([].concat(tree || [], [
      this.treeForNodeModule('jquery-ui'),
      this.treeForNodeModule('jquery-mousewheel'),
      this.treeForNodeModule('perfect-scrollbar'),
      this.treeForNodeModule('jquery-ui-touch-punch'),
      this.treeForNodeModule('element-resize-detector')
    ]));
  },

  treeForAddon(tree) {
    return new Funnel(this._super(tree), {
      srcDir: '/',
      destDir: '/',
      exclude: ['**/page-object.js']
    });
  },

  treeForNodeModule(module) {
    let fullPath = require.resolve(module);
    let ui = path.join(fullPath.substring(0, fullPath.indexOf(module)), module);

    return new Funnel(ui, {
      destDir: module
    });
  },

  treeForAddonTestSupport: function(tree) {
    let namespacedTree = new Funnel(path.join(__dirname, 'addon'), {
      srcDir: '/',
      destDir: `/${this.moduleName()}`,
      include: ['**/page-object.js'],
      annotation: `Addon#treeForTestSupport (${this.name})`,
    });

    return this.preprocessJs(namespacedTree, '/', this.name, {
      registry: this.registry,
    });
  },

  included: function(parent) {
    this._super.included.apply(this, arguments);

    let addon = this;
    let icon = parent.registry.load('icon')[0];

    this.files
      .map(function(file) {
        return path.join('vendor/', file);
      })
      .forEach(function(path) {
        addon.import(path);
      });

    parent.trees.public = new Merge([
      parent.trees.public,
      icon.toTree(new Funnel(parent.trees.app, {
        srcDir: 'icons',
        destDir: '.',
        include: [ '**/*.svg' ]
      }))
    ]);
  },

  setupPreprocessorRegistry: function(type, registry) {
    registry.add('icon', {
      name: 'ember-ui-kit',
      ext: 'svg',

      toTree(tree) {
        return new SVGSpriter(tree);
      }
    });

    registry.add('htmlbars-ast-plugin', {
      name: 'property-component',
      plugin: require('./lib/htmlbars-ast-plugin'),
      baseDir: function() {
        return __dirname;
      }
    });
  }
};

import Ember from 'ember';
import DS from 'ember-data';
import { module, test } from 'qunit';

import { task } from 'ember-concurrency';

const TreeNode = Ember.ObjectProxy.extend({
  root: null,
  parent: null,
  content: null,

  decendentCount: 0,

  down() {
    Ember.run(this.get('root.down'), 'perform', this);
  },
  up() {
    Ember.run(this.get('root.up'), 'perform', this);
  },
  expand() { },
  collapse() {}
});

const TreeArray = Ember.ArrayProxy.extend({
  childrenKey: 'children',

  tree: null, // tree

  root: Ember.computed('tree', function() {
    let tree = this.get('tree');

    if (Ember.isArray(tree)) {
      let key = this.get('childrenKey');

      return TreeNode.create({
        content: {
          [ key ]: tree
        };
      });
    }

    return TreeNode.create({
      content: tree
    });
  }).readOnly(),

  content: Ember.computed('root', 'content.@each.isExpanded', function() {
    function flatten(node, accum) {
      node.children.forEach(node => {
        flatten(node, accum);
      })
    }

    flatten(this.get('root'), []);

    return Ember.A(this.get('tree').map(model => {
      return TreeNode.create({
        root: this,
        parent: this,
        content: model
      });
    }));
  }).readOnly(),

  // TODO Use this to track children.[] change
  contentTracker: Ember.computed(function() {
    return new Set();
  }).readOnly(),

  down: task(function *(node) {
    let guid = Ember.guidFor(node);
    let model = Ember.get(node, 'content');
    let tracker = this.get('contentTracker');
    let childrenKey = this.get('childrenKey');

    if (!tracker.has(guid)) {
      let children = Ember.get(model, childrenKey);

      tracker.add(guid);

      if (typeof children === 'function') {
        children = children.call(model);
      }

      children = yield node.set('children', DS.PromiseArray.create({
        promise: Ember.RSVP.resolve(children)
      }));

      this.replace(this.indexOf(node) + 1, 0, children.map(child => {
        return TreeNode.create({
          root: this,
          parent: node,
          content: child
        });
      }));
    }
  }),

  // TODO this is not done yet
  up: task(function *() {
    let guid = Ember.guidFor(node);
    let model = Ember.get(node, 'content');
    let tracker = this.get('contentTracker');
    let childrenKey = this.get('childrenKey');

    if (tracker.has(guid)) {
      let children = Ember.get(model, childrenKey);

      tracker.remove(guid);

      if (typeof children === 'function') {
        children = children.call(model);
      }

      children = yield node.set('children', DS.PromiseArray.create({
        promise: Ember.RSVP.resolve(children)
      }));

      this.replace(this.indexOf(node) + 1, 0, children.map(child => {
        return TreeNode.create({
          root: this,
          content: child
        });
      }));
    }
  }),
});

module('Unit | Computed | tree-buffer', {
  beforeEach() {
    this.tree = Ember.A([
      {
        firstName: 'name1a',
        children: [
          {
            firstName: 'name1b',
          },
          {
            firstName: 'name2b',
            children: [
              {
                firstName: 'name2c',
              },
              {
                firstName: 'name2c',
              },
              {
                firstName: 'name2c',
              },
              {
                firstName: 'name2c',
              }
            ]
          },
          {
            firstName: 'name3b',
          },
          {
            firstName: 'name4b',
          }
        ]
      },
      {
        firstName: 'name2a',
        children: [
          {
            firstName: 'name1b',
          },
          {
            firstName: 'name2b',
          },
          {
            firstName: 'name3b',
          },
          {
            firstName: 'name4b',
          }
        ]
      },
      {
        firstName: 'name3a',
        children: [
          {
            firstName: 'name1b',
          },
          {
            firstName: 'name2b',
          },
          {
            firstName: 'name3b',
          },
          {
            firstName: 'name4b',
          }
        ]
      },
      {
        firstName: 'name4a',
        children: [
          {
            firstName: 'name1b',
          },
          {
            firstName: 'name2b',
          },
          {
            firstName: 'name3b',
          },
          {
            firstName: 'name4b',
          }
        ]
      }
    ]);
  }
})

test('can drill down and roll up synchronously', async function(assert) {
  let tree = TreeArray.create({
    tree: this.tree
  });

  assert.deepEqual(tree.map(item => item.get('content.firstName')), [
    'name1a',
    'name2a',
    'name3a',
    'name4a',
  ]);

  await tree.objectAt(0).down();

  assert.deepEqual(tree.map(item => item.get('content.firstName')), [
    'name1a',
      'name1b',
      'name2b',
      'name3b',
      'name4b',
    'name2a',
    'name3a',
    'name4a',
  ]);

  await tree.objectAt(0).down();

  assert.deepEqual(tree.map(item => item.get('content.firstName')), [
    'name1a',
      'name1b',
      'name2b',
      'name3b',
      'name4b',
    'name2a',
    'name3a',
    'name4a',
  ]);

  await tree.objectAt(2).down();

  assert.deepEqual(tree.map(item => item.get('content.firstName')), [
    'name1a',
      'name1b',
      'name2b',
        'name2c',
        'name2c',
        'name2c',
        'name2c',
      'name3b',
      'name4b',
    'name2a',
    'name3a',
    'name4a',
  ]);

  await tree.objectAt(0).up();

  assert.deepEqual(tree.map(item => item.get('content.firstName')), [
    'name1a',
    'name2a',
    'name3a',
    'name4a',
  ]);

  await tree.objectAt(0).down();

  assert.deepEqual(tree.map(item => item.get('content.firstName')), [
    'name1a',
      'name1b',
      'name2b',
        'name2c',
        'name2c',
        'name2c',
        'name2c',
      'name3b',
      'name4b',
    'name2a',
    'name3a',
    'name4a',
  ]);
});

//test('TreeArray#collapse', function(assert) {
//});

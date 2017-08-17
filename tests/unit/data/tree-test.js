import { module, test } from 'qunit';

class Node {
  constructor(value, children = []) {
    this.value = value;
    this.children = children;
  }

  toArray(filter = function(node) { return node.children; }) {
    return [ this ].concat(filter(this).reduce((accum, child) => {
      return accum.concat(child.toArray(filter));
    }, []));
  }
}

module('Unit | Data | tree');

test('tree make array', function(assert) {
  let root = new Node(1, [
    new Node(2, [
      new Node(3, [
      ]),
      new Node(4, [
        new Node(7, [
        ]),
        new Node(8, [
        ])
      ])
    ]),
    new Node(3, [
      new Node(5, [
      ]),
      new Node(6, [
      ])
    ])
  ]);

  assert.deepEqual(root.toArray().map(node => node.value), [
    1, 2, 3, 4, 7, 8, 3, 5, 6
  ]);
});

test('tree make array can filter', function(assert) {
  let root = new Node(1, [
    new Node(2, [
      new Node(3, [
      ]),
      new Node(4, [
        new Node(7, [
          new Node(7, [
          ]),
          new Node(8, [
          ])
        ]),
        new Node(8, [
        ])
      ])
    ]),
    new Node(3, [
      new Node(5, [
      ]),
      new Node(6, [
      ])
    ])
  ]);

  let arr = root.toArray(node => {
    if (node.value === 4) {
      return [];
    }

    return node.children;
  });

  assert.deepEqual(arr.map(node => node.value), [
    1, 2, 3, 4, 3, 5, 6
  ]);
});

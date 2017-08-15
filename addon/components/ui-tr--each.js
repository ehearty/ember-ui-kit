import Ember from 'ember';
import layout from '../templates/components/ui-tr--each';

export default Ember.Component.extend({
  classNames: 'ui-tr--each',
  layout,

  /**
   * @attribute {} model
   */
  model: null,

  /**
   * @attribute {} key
   */
  key: null,

  // TODO flatten tree model
  modelNormalized: Ember.computed.readOnly('model'),

  rowHeight: Ember.computed(function() {
    return this.$('.ui-tr--measure .ui-tr').outerHeight(true);
  }).readOnly(),

  bufferSize: Ember.computed('rowHeight', function() {
    let screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let rowHeight = this.get('rowHeight');

    return Math.ceil(Math.max(screenWidth, screenHeight) / rowHeight);
  }),
  bufferStart: 0,
  buffer: Ember.computed('bufferSize', function() {
    let size = this.get('bufferSize');

    return Ember.A(Array.from({ length: size }).map(function(fill, index) {
      return Ember.Object.create({
        id: index
      })
    }));
  }).readOnly(),

  bufferContent: Ember.computed('modelNormalized.[]', 'bufferStart', 'bufferSize', function() {
    let model = this.get('modelNormalized');
    let start = this.get('bufferStart');
    let size = this.get('bufferSize');

    return model.slice(start, start + size).map((item, index) => {
      return {
        model: item,
        index: start + index,
        isEven: ((start + index) % 2),
        isOdd: !((start + index) % 2)
      };
    });
  }).readOnly(),

  bufferInPlace: Ember.computed('buffer', 'bufferContent', function() {
    let buffer = this.get('buffer');
    let content = this.get('bufferContent');
    let size = content.length;

    while (size--) {
      buffer.objectAt(size).setProperties(content[size]);
    }

    return buffer;
  }).readOnly(),

  didInsertElement() {
    this._super(...arguments);

    let length = this.get('model.length');
    let rowHeight = this.get('rowHeight');
    let bodyHeight = this.$().height();

    let block = this.$().parentsUntil('.ui-table--v2', '[data-table-block]');

    block.css({
      marginTop: 0,
      height: length * rowHeight
    });

    this.$().parentsUntil('.ui-table--v2', '.ui-tbody').on('scroll', evt => {
      let scrollTop = evt.target.scrollTop;
      let start = Math.floor(scrollTop / rowHeight);

      block.css({
        marginTop: rowHeight * start,
        height: rowHeight * (length - start)
      });

      Ember.run(this, this.set, 'bufferStart', start);
    });
  }

}).reopenClass({
  positionalParams: ['model']
});

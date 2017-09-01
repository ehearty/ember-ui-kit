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

  initialRenderCount: Ember.computed('model.[]', function() {
    return Math.min(2, this.get('model.length'));
  }).readOnly(),

  didInsertElement() {
    this._super(...arguments);

    this.set('rowHeight', this.$('.ui-tr--measure .ui-tr').outerHeight(true));
  },

  //// TODO flatten tree model
  //modelNormalized: Ember.computed.readOnly('model'),

  //rowHeight: Ember.computed(function() {
  //  return this.$('.ui-tr--measure .ui-tr').outerHeight(true);
  //}).readOnly(),

  //bufferSize: Ember.computed('rowHeight', 'modelNormalized.length', function() {
  //  let screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  //  let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  //  let rowHeight = this.get('rowHeight');
  //  let len = this.get('modelNormalized.length');

  //  let computed = Math.ceil(Math.max(screenWidth, screenHeight) / rowHeight);

  //  return Math.min(computed, len);
  //}),
  //bufferStart: 0,
  //buffer: Ember.computed('bufferSize', function() {
  //  let size = this.get('bufferSize');

  //  return Ember.A(Array.from({ length: size }).map(function(fill, index) {
  //    return Ember.Object.create({
  //      id: index
  //    })
  //  }));
  //}).readOnly(),

  //bufferContent: Ember.computed('modelNormalized.[]', 'bufferStart', 'bufferSize', function() {
  //  let model = this.get('modelNormalized');
  //  let start = this.get('bufferStart');
  //  let size = this.get('bufferSize');

  //  return model.slice(start, start + size).map((item, index) => {
  //    return {
  //      model: item,
  //      index: start + index
  //    };
  //  });
  //}).readOnly(),

  //bufferInPlace: Ember.computed('buffer', 'bufferContent', function() {
  //  let buffer = this.get('buffer');
  //  let content = this.get('bufferContent');
  //  let size = content.length;

  //  while (size--) {
  //    buffer.objectAt(size).setProperties(content[size]);
  //  }

  //  return buffer;
  //}).readOnly(),

  block: Ember.computed(function() {
    return this.$().closest('[data-table-block]');
  }).readOnly(),

  //didInsertElement() {
  //  this._super(...arguments);

  //  let rowHeight = this.get('rowHeight');
  //  let ns = this.get('elementId');

  //  this.$().closest('.ui-tbody').on(`scroll.${ns}`, evt => {
  //    Ember.run(this, this.set, 'bufferStart', Math.floor(evt.target.scrollTop / rowHeight));
  //  });
  //},

  //willDestroyElement() {
  //  this._super(...arguments);

  //  let ns = this.get('elementId');

  //  this.$().closest('.ui-tbody').off(`.${ns}`);
  //},

  didRender() {
    this._super(...arguments);

    let length = this.get('model.length');
    let rowHeight = this.get('rowHeight');

    let block = this.get('block');
    //let start = this.get('bufferStart');

    block.css({
      //marginTop: rowHeight * start,
      height: rowHeight * length
    });
  }

}).reopenClass({
  positionalParams: ['model']
});

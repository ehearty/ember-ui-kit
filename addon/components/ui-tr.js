import Ember from 'ember';
import layout from '../templates/components/ui-tr';

export default Ember.Component.extend({
  classNames: 'ui-tr',
  classNameBindings: [
    'isOdd:ui-tr--odd',
    'isEven:ui-tr--even'
  ],
  attributeBindings: [
    'index:data-row-index'
  ],
  layout,

  model: null,
  index: null,

  isOdd: Ember.computed('index', function() {
    return Boolean(this.get('index') % 2);
  }).readOnly(),

  isEven: Ember.computed.not('isOdd').readOnly()
});

import Ember from 'ember';

export default Ember.Controller.extend({
  value: null,

  list: Ember.computed(function() {
    return Ember.A([
      'apple',
      'orange',
      'banana'
    ]);
  }).readOnly()
});

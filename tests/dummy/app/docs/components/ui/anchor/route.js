import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.A(Array.from({ length: 10 }).map((_, index) => `Section ${index}`));
  }
});

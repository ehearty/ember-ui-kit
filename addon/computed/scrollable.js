import Ember from 'ember';

import { task, waitForEvent } from 'ember-concurrency';
import { thenable } from 'ember-ui-kit/utils/raf';

const Scrollable = Ember.Object.extend({
  scrollable: null,
  callback: null,

  sync: task(function *() {
    let { target } = yield waitForEvent(this.get('scrollable'), 'scroll');

    yield this.get('poll').perform(target);

    this.get('sync').perform();
  }).restartable(),

  poll: task(function *(scrollable) {
    let callback = this.get('callback');
    let debounce = 60;

    let last = scrollable.scrollTop;
    let count = 0;
    let cache;

    while (count < debounce) {
      if (scrollable.scrollTop === last) {
        count++;
      }
      else {
        cache = callback.call(this, scrollable.scrollTop, cache);

        count = 0;
      }

      last = scrollable.scrollTop;

      yield thenable();
    }
  }).drop()
});

export default function scrollable(target, callback) {
  return Ember.computed(function() {
    return Scrollable.create({
      scrollable: this.$().closest(target),
      callback: callback.bind(this)
    });
  }).readOnly();
}

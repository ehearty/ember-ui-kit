import Ember from 'ember';
import layout from './template';

import scrollable from 'ember-ui-kit/computed/scrollable';

export default Ember.Component.extend({
  classNames: 'ui-anchor-switch',
  layout,

  /**
   * @public
   * @attribute switch
   */
  switch: null,

  /**
   * @public
   * @attribute behavior
   */
  behavior: 'smooth',

  /**
   * @public
   * @attribute block
   */
  block: 'start',

  scrollable: scrollable('.ui-anchor-switch', function(scrollTop, cache = {}) {
    let page = 0.2;
    let offsetTop = cache.offsetTop || (cache.offsetTop = this.element.offsetTop);
    let offsetHeight = cache.offsetHeight || (cache.offsetHeight = this.element.offsetHeight);
    let cases = cache.cases || (cache.cases = this.$('.ui-anchor-case'));
    let active = cases
      .filter(function() {
        return this.offsetTop - offsetTop - scrollTop >= 0;
      })
      .filter(function() {
        return (this.offsetTop - offsetTop - scrollTop) / offsetHeight < page;
      })
      .first();

    if (active.length) {
      this.$().attr('data-suppress-scroll-into-view', 1);

      Ember.run(this, 'sendAction', 'on-change', active.data('case'));

      this.$().attr('data-suppress-scroll-into-view', '');
    }

    return cache;
  }),

  /**
   * @event on-change
   */
  didRender() {
    this._super(...arguments);

    this.get('scrollable.sync').perform();
  }

}).reopenClass({
  positionalParams: ['switch']
});

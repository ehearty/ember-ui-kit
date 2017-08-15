import Ember from 'ember';
import layout from '../templates/components/ui-tbody';

export default Ember.Component.extend({
  classNames: 'ui-tbody',
  layout,

  didInsertElement() {
    this._super(...arguments);

    this.$()
      .on('mouseenter', '.ui-tr', evt => {
        let index = Ember.$(evt.currentTarget).attr('data-row-index');

        this.$(`[data-row-index=${index}]`).addClass('ui-tr--hover');
      })
      .on('mouseleave', '.ui-tr', evt => {
        let index = Ember.$(evt.currentTarget).attr('data-row-index');

        this.$(`[data-row-index=${index}]`).removeClass('ui-tr--hover');
      });
  },

  willDestroyElement() {
    this._super(...arguments);

    this.$().off();
  }
});

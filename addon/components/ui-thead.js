import Ember from 'ember';
import layout from '../templates/components/ui-thead';

import Styleable from '../mixins/styleable';

import { layout as cssLayout } from '../utils/dom';

/* global elementResizeDetectorMaker */
let detector = elementResizeDetectorMaker({
  strategy: 'scroll'
});

export default Ember.Component.extend(Styleable, {
  classNames: 'ui-thead',
  layout,

  /**
   * @attribute {} breakpoints
   */
  breakpoints: null,

  leafNodes: Ember.computed(function() {
    return this.$('[data-column-children="0"]');
  }).readOnly(),

  leafNodeWidths: Ember.computed('leafNodes', function() {
    return this.get('leafNodes')
      .toArray()
      .map(el => Ember.$(el).attr('data-column-width'));
  }).readOnly(),

  ns: Ember.computed(function() {
    return this.$().closest('.ui-table--v2').attr('id');
  }).readOnly(),

  didInsertElement() {
    this._super(...arguments);

    let leaves = this.get('leafNodes');
    let table = this.$().closest('.ui-table--v2');

    detector.listenTo(this.$('.ui-thead__resizer').get(0), this.rerender = Ember.run.bind(this, this.rerender));

    this.$('.ui-sortable').on('sortupdate', (evt, { item }) => {
      let block = item.parentsUntil('.ui-thead', '[data-table-block]').attr('data-table-block');
      let ordered = item.parentsUntil('.ui-thead').find('.ui-th').filter('[data-column-id]');

      let targets = item.find('.ui-th').addBack().filter('[data-column-id]')
        .map((index, element) => Ember.$(element).attr('data-column-id'))
      let after = Ember.$(ordered[ordered.index(ordered.filter(`[data-column-id="${targets.get(-1)}"]`)) + 1])
        .attr('data-column-id');
      let selector = targets.toArray().map(target => `[data-column-id="${target}"]`).join();

      // `target` is moved to before `after`

      table.find(`[data-table-block=${block}] .ui-tr`).each(function() {
        let tr = Ember.$(this);

        if (typeof after !== 'undefined') {
          tr.find(selector).insertBefore(tr.find(`[data-column-id="${after}"]`));
        }
        else {
          tr.find(selector).appendTo(tr);
        }
      });
    });
    this.$().on('resize', Ember.run.bind(this, function() {
      this.notifyPropertyChange('leafNodeWidths');
      this.rerender();
    }));
  },

  didRender() {
    this._super(...arguments);

    let ns = this.get('ns');
    let widths = this.get('leafNodeWidths');

    // TODO handle breakpoints
    cssLayout(this.$().width(), widths).forEach((width, index) => {
      this.style(`#${ns} [data-column-id="${index}"]`, {
        'width': `${width}px`,
        'min-width': `${width}px`
      });
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    detector.removeListener(this.$('.ui-thead__resizer').get(0), this.rerender);

    this.$().off();
  }
});

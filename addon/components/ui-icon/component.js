import Ember from 'ember';
import layout from './template';

/**
 * The `{{ui-icon}}` component inserts an icon with
 * the option to stack multiple icons.
 *
 * Usage: inline
 *
 * {{ui-icon "chevron-up"}}
 *
 * Usage: inline with class set
 *
 * {{ui-icon
 *   (hash
 *     name="chevron-up"
 *     class="red-icon"
 *   )
 * }}
 *
 * Usage: inline with stacked icon
 *
 * {{ui-icon
 *   (array
 *     (hash
 *       name="chevron-up"
 *       class="red-icon"
 *     )
 *     (hash
 *       name="chevron-down"
 *       class="blue-icon"
 *     )
 *   )
 * }}
 *
 * @class IconComponent
 * @extends Ember.Component
 * @module component
 * @submodule ui
 */
export default Ember.Component.extend({
  tagName: 'svg',
  layout,

  attributeBindings: 'viewBox',
  viewBox: '0 0 452 452',

  classNames: 'ui-icon',

  icon: Ember.inject.service(),

  // attrs {
  icons: null,
  // attrs }

  iconsNormalized: Ember.computed('icons.[]', function() {
    return this.getWithDefault('icons', []).map(icon => {
      if (typeof icon === 'string') {
        return {
          name: icon,
          class: '',
        };
      }

      return icon;
    });
  }).readOnly()

}).reopenClass({
  positionalParams: 'icons'
});

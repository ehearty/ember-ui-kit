import Ember from 'ember';
import { sendEventAction } from 'ember-ui-kit/utils/ddau';

/**
 * @protected
 * @module input
 * @class BaseInputComponent
 * @namespace UI
 */
export default Ember.Component.extend({
  tagName: 'label',

  /**
   * @public
   * @attribute value
   */
  value: null,

  /**
   * @protected
   * @property isFocused
   */
  isFocused: false,

  /**
   * @protected
   * @property isBlurred
   */
  isBlurred: true,

  /**
   * @event on-focus-in
   */
  focusIn() {
    this._super(...arguments);

    this.set('isFocused', true);
    this.set('isBlurred', false);

    this.sendEventAction('on-focus-in');
  },

  /**
   * @event on-focus-out
   */
  focusOut() {
    this._super(...arguments);

    this.set('isFocused', false);
    this.set('isBlurred', true);

    this.sendEventAction('on-focus-out');
  },

  /**
   * @event on-change
   */
  change() {
    this._super(...arguments);

    this.sendEventAction('on-change');
  },

  sendEventAction(actionName, updatedValue) {
    sendEventAction(this, actionName, 'value', updatedValue);
  }
}).reopenClass({
  positionalParams: ['value']
});

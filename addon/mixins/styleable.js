import Ember from 'ember';

function prepareRule(sheet, selector) {
  let rule = Array.from(sheet.cssRules).reverse().find(rule => {
    return rule.selectorText === selector;
  });

  if (rule) {
    return rule;
  }

  sheet.insertRule(`${selector} {}`, sheet.cssRules.length);

  return prepareRule(sheet, selector);
}

export default Ember.Mixin.create({
  sheet: Ember.computed(function() {
    return Ember.$('<style>').appendTo(document.head).prop('sheet');
  }).readOnly(),

  style(selector, properties) {
    let sheet = this.get('sheet');
    let rule = prepareRule(sheet, selector);

    Object.keys(properties).forEach(key => {
      let value = properties[key];

      if (typeof value === 'function') {
        value = value.call(this);
      }

      if (value === null) {
        rule.style.removeProperty(key);
      }
      else {
        rule.style.setProperty(key, value);
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    Ember.$(this.get('sheet.ownerNode')).remove();
  }
});

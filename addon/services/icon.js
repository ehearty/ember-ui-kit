import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Service.extend({
  rootURL: '/',

  icons: Ember.computed('rootURL', function() {
    return DS.PromiseArray.create({
      promise: Ember.$.get(`${this.get('rootURL')}assets/images/icons.svg`).then(svg => {
        let root = svg.querySelector('svg');
        let icons = Array.from(root.querySelectorAll('svg'));

        root.id = 'icons';

        icons.forEach(icon => {
          icon.id = `icon-${icon.id}`;
        });

        document.body.appendChild(root);

        return icons.map(icon => {
          return {
            id: icon.id,
            name: icon.id.replace('icon-', '')
          };
        });
      })
    });
  }).readOnly()
});

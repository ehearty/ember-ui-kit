import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('docs', function() {
    this.route('components', function() {
      this.route('ui');
      this.route('form');
      this.route('input');
      this.route('utility');
    });
  });
});

export default Router;

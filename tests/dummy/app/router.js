import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('docs', function() {
    this.route('components');

    this.route('components/ui');
    this.route('components/ui/backdrop');
    this.route('components/ui/position');
    this.route('components/ui/anchor');
    this.route('components/ui/draggable');
    this.route('components/ui/resizable');
    this.route('components/ui/sortable');
    this.route('components/ui/table');

    this.route('components/in');
    this.route('components/fm');
    this.route('components/x');
  });
});

export default Router;

import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('docs', function() {
    this.route('architecture');
    this.route('architecture/component');
    this.route('architecture/css');
    this.route('architecture/z-index');

    this.route('cookbook');
    this.route('cookbook/modal');
    this.route('cookbook/dialog');
    this.route('cookbook/popover');
    this.route('cookbook/tooltip');
    this.route('cookbook/table');
    this.route('cookbook/table/sortable-column');

    this.route('components');

    this.route('components/ui');
    this.route('components/ui/backdrop');
    this.route('components/ui/position');
    this.route('components/ui/anchor');
    this.route('components/ui/button');
    this.route('components/ui/draggable');
    this.route('components/ui/resizable');
    this.route('components/ui/sortable');
    this.route('components/ui/table');

    this.route('components/in');
    this.route('components/in/text');
    this.route('components/in/toggle');
    this.route('components/in/select');

    this.route('components/fm');
    this.route('components/fm/form');
    this.route('components/fm/field');
    this.route('components/fm/fieldset');

    this.route('components/x');
    this.route('components/x/component');
    this.route('components/x/resize');
  });
});

export default Router;

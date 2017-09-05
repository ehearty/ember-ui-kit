# Component Architecture

`ember-ui-kit` is built with an architecture that maximizes customizability by leveraging Ember CLI.

All componenents can be extended by importing the corresponding component class and extend it.

```js
// app/components/ui-button.js
import Button from 'ember-ui-kit/components/ui-button';
import layout from '../templates/ui-button.hbs';

export default Button.extend({
  layout
});
```

All properties marked as `protected` are properties that can be bound to component template.

# CSS Architecture

`ember-ui-kit` follows the CSS as function mantra first introduced
by Erik Bryn. [See his slides here](http://talks.erikbryn.com/taming-css-in-ember-apps-svemberjs/#/).

How this is applied in `ember-ui-kit` is that every component has
its own matching name SASS mixin that allows for customization. Furthermore,
it is recommended to pair this with [ember-functional-css](https://github.com/ming-codes/ember-functional-css).
to further allows targeted CSS.

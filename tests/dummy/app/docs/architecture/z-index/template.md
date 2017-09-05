# Z-Index Architecture

`ember-ui-kit` adopts a zero `z-index` policy. Stacking order
is enforced purely though DOM order. `ember-ui-kit` provides
two primitives to achieve this: `ui-backdrop` and `ui-position`.

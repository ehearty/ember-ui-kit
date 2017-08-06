
Utility components are components meant to be embeded inside component
templates and not to be part of any route template.

# x-component

`x-component` is an component to aid in composability. It
accepts a single argument of either string or closure component
and renders it.

{{#docs-demo as |demo|}}
  {{#demo.example name="docs-components-x-component"}}
    {{x-component "Hello"}}
    {{x-component (component "x-component" "World!")}}
  {{/demo.example}}
{{/docs-demo}}

# x-resize

`x-resize` is a component to help detect element resize. The component
is designed to be transparent to not interfere with any CSS
that you may have.

{{#docs-demo as |demo|}}
  {{#demo.example name="docs-components-x-resize"}}
    {{#x-resize on-resize-x=(action "resized") on-resize-y=(action "resized")}}
      Detect Content Resize
    {{/x-resize}}
  {{/demo.example}}
{{/docs-demo}}

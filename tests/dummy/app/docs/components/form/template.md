
Form components are a collection of components that works
with models and bind the properties along with the appropriate
validations to input components.

You start with `fm-form` component and pass in an model object.
The component will yield contextual `fm-field` components with
value and validations approriately bound.

The `fm-field` component further yields contextual input components
that have value bound.

{{#docs-demo as |demo|}}
  {{#demo.example name="docs-components-x-component"}}
    {{#fm-form model.user as |field|}}
      <div class="row">
        {{#field.firstName as |in|}}
          {{in.text}}
        {{/field.firstName}}
      </div>
    {{/fm-form}}
  {{/demo.example}}
{{/docs-demo}}

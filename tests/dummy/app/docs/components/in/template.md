
Input components broadly boils down to just 3 main types: text, toggle, and select.
UI Kit offers the base class of these 3 categories of components and you are free
to extend them.

# in-text

# in-toggle

# in-select

{{#docs-demo as |demo|}}
  {{#demo.example name="docs-demo-basic"}}
    {{#in-select value from=list as |list|}}
    <button>BTN</button>
      <select>
        {{#each list as |item|}}
          <option value="{{item}}">{{item}}</option>
        {{/each}}
      </select>
    {{/in-select}}
  {{/demo.example}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name="docs-demo-basic"}}
    {{#in-select value from=list as |list|}}
      Select
      {{#each list as |item|}}
        <label>
          <input type="radio" name="list" value="{{item}}"> {{item}}
        </label>
      {{/each}}
    {{/in-select}}
  {{/demo.example}}
{{/docs-demo}}

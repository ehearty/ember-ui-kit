import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import Ember from 'ember';

moduleForComponent('ui-table--v2', 'Integration | Component | ui-table--v2', {
  integration: true
});

test('it renders', function(assert) {
  this.set('data', Array.from({ length: 40 }).map((nil, index) => {
    return Ember.Object.create({
      id: index,
      firstName: 'Mini',
      lastName: 'Me',
      age: index
    });
  }));

  this.render(hbs`
    <style>
      .ui-table--v2 {
        width: 640px;
        max-height: 240px;
      }

      .ui-table__thead,
      .ui-table__tbody  {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        padding: 0 15px;
      }

      .ui-tr {
        height: 56px;
      }
    </style>

    {{#ui-table--v2}}
      {{#ui-thead}}
        {{#ui-th width="83px" column=0 children=0}}ID{{/ui-th}}
      {{else}}
        {{#ui-sortable}}
          {{#ui-th children=2}}
            <div>Name</div>
            {{#ui-th width="15%" column=1 children=0}}First Name{{/ui-th}}
            {{#ui-th width="15%" column=2 children=0}}Last Name{{/ui-th}}
          {{/ui-th}}
          {{#ui-th width="1fr" column=3 children=0}}
            {{#ui-resizable}}
              Nick Name
            {{/ui-resizable}}
          {{/ui-th}}
          {{#ui-th width="10%" column=4 children=0}}Age{{/ui-th}}
          {{#ui-th width="10%" column=5 children=0}}SSN{{/ui-th}}
          {{#ui-th width="20%" column=6 children=0}}Password{{/ui-th}}
        {{/ui-sortable}}
      {{/ui-thead}}

      {{#ui-tbody}}
        {{#ui-tr--each data key="id" as |item|}}
          {{#ui-td column=0}}{{item.id}}{{/ui-td}}
        {{/ui-tr--each}}
      {{else}}
        {{#ui-tr--each data key="id" as |item index row|}}
          {{#fm-form item as |field|}}
            {{#ui-td column=1}}
              {{#field.firstName as |in|}}
                {{in.text}}
              {{/field.firstName}}
            {{/ui-td}}
            {{#ui-td column=2}}
              {{#field.lastName as |in|}}
                {{in.text}}
              {{/field.lastName}}
            {{/ui-td}}
            {{#ui-td column=3}}{{item.nickName}}{{/ui-td}}
            {{#ui-td column=4}}{{item.age}}{{/ui-td}}
            {{#ui-td column=5}}XXX-XX-XXXX{{/ui-td}}
            {{#ui-td column=6}}********{{/ui-td}}
          {{/fm-form}}
        {{/ui-tr--each}}
      {{/ui-tbody}}

      {{#ui-tfoot}}
        {{#ui-tr}}
          {{#ui-td column="0"}}ID{{/ui-td}}
        {{/ui-tr}}
      {{else}}
        {{#ui-tr}}
          {{#ui-td column=1}}First Name{{/ui-td}}
          {{#ui-td column=2}}Last Name{{/ui-td}}
          {{#ui-td column=3}}Nick Name{{/ui-td}}
          {{#ui-td column=4}}Age{{/ui-td}}
          {{#ui-td column=5}}SSN{{/ui-td}}
          {{#ui-td column=6}}Password{{/ui-td}}
        {{/ui-tr}}
      {{/ui-tfoot}}
    {{/ui-table--v2}}
  `);

  assert.equal(this.$('.ui-table--v2').length, 1);
  assert.equal(this.$('.ui-thead').length, 1);
  assert.equal(this.$('.ui-tbody').length, 1);
  assert.equal(this.$('.ui-tfoot').length, 1);
  assert.equal(this.$('.ui-tr--each').length, 2);
  assert.equal(this.$('.ui-tr').length, 8);
  assert.equal(this.$('.ui-td').length, 21);
});

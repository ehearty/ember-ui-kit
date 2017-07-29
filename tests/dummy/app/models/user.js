import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  nickName: DS.attr('string'),
  ssn: DS.attr('string'),
  age: DS.attr('number'),

  posts: DS.hasMany('post')
});

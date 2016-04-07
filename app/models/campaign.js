import DS from 'ember-data';
import {
  validator, buildValidations
}
from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  actions: validator('has-many')
});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  actions: DS.hasMany('action')
});

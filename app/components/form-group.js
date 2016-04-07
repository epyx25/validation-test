import Ember from 'ember';
const {computed, defineProperty} = Ember;
export default Ember.Component.extend({
  classNames: ['form-group'],
  classNameBindings: ['showErrorClass:has-error', 'showMessage:has-error'],

  label: true,
  init: function() {
    this._super(...arguments);
    var valuePath = this.get('property');
    defineProperty(this, 'validation', computed.oneWay(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));    
  },  
  labelText: Ember.computed('property', function(){
    if (this.get('label')) {
      return this.get('property').classify();
    }
  }),

  notValidating: computed.not('validation.isValidating'),
  didValidate: computed.oneWay('model.didValidate'),
  hasContent: computed('value', function(){
    let value = this.get('value');
    // probably a promis for a select
    if (typeof value === 'object') {
      value = value.get('content');
    }
    return value;
  }),
  isValid: computed.and('hasContent', 'validation.isValid', 'notValidating'),
  isInvalid: computed.oneWay('validation.isInvalid'),
  showErrorClass: computed.and('notValidating', 'showMessage', 'hasContent', 'validation'),
  showMessage: computed('validation.isDirty', 'isInvalid', 'didValidate', function() {
    return (this.get('validation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  }),

  form: Ember.computed.alias('parentView'),
  model: Ember.computed.alias('parentView.model'),
});

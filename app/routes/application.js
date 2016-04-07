import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var store = this.store;
    return Ember.RSVP.hash({
      campaign: store.createRecord('campaign'),
      contents: store.findAll('content')
    }); 
  }
});

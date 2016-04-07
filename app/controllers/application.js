import Ember from 'ember';
const {computed} = Ember;
export default Ember.Controller.extend({
  campaign: computed.alias('model.campaign'),
  contents: computed.alias('model.contents'),
  actions: {
    addAction(campaign) {
      let emptyAction = this.store.createRecord('action');
      campaign.get('actions').pushObject(emptyAction);
    },
    save(campaign) {
      campaign.validate().then(({model, validations}) => {
        if (validations.get('isValid')) {
          console.log('valid ;)');
        } else {
          console.log('invalid');
        }
        model.set('didValidate', true);

        campaign.get('actions').then(function(actions){
          actions.forEach(function(action) {

            action.set('didValidate', true);

          });
        });

      });
    }
  }
});

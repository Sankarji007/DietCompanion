import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  init() {
    this._super(...arguments);
    this.result = this.result || "";
    this.callcard = this.viewcards || "";
    this.calories;
    this.send('modcalories', this.result.recipe.calories);
    this.isdelete = this.isdelete || false;
    this.email = this.email || null;
    this.reload = this.reload || null;
    this.uselocal = this.uselocal || null;
    this.imageLink = null;
    this.send('getImageId');
  },
  actions: {
    getImageId() {
      const uri = this.result.recipe.uri;
      const myArray = uri.split("#");
      const query = myArray[1];
      this.set('imageLink', `http://localhost:8543/Recipemanagement/GetImage/${query}`);
      (this.imageLink);
      (this.uselocal);

    },
    redirectToDetails(url) {
      const myArray = url.split("#");
      const query = myArray[1];
      this.callcard(query);
    },
    modcalories(amt) {

      this.calories = amt.toFixed(2);
      this.send('getImageId');

    },
    submit(uri) {
      let email = this.email;
      (email);
      (uri);
      const myArray = uri.split("#");
      const query = myArray[1];
      Ember.$.ajax({
        url: 'http://localhost:8543/Recipemanagement/deleteSavedRecipe',
        type: 'POST',
        dataType: 'json',
        data: {
          email: email,
          recipe_id: query
        }
      }).then((response) => {
        (response);
        this.reload(email);
      })
    }

  }
});

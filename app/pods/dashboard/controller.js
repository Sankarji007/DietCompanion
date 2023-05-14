import Controller from '@ember/controller';

import Ember from 'ember';
import ENV from 'college-project/config/environment';
import {inject as service} from '@ember/service';

export default Controller.extend({
  cookies: service(),
  resultset: null,
  emailaddress: null,
  init() {
    this._super(...arguments);
    this.recipes;
    this.queried = "noodles";
    // let obj={};
    // obj.type='public';
    // obj.app_id=ENV.APP_ID;
    // obj.app_key=ENV.APP_KEY;
    // obj["nutrients[CA]"]=30;
    this.load = true;
    this.pageNo = 1;
    this.previouslinks = [];
    Ember.$.ajax({
      url: 'https://api.edamam.com/api/recipes/v2',
      type: 'GET',
      dataType: 'json',
      data: {
        type: 'public',
        q: 'noodles',
        app_id: ENV.APP_ID,
        app_key: ENV.APP_KEY

      }

    }).then((response) => {

      this.send('store', response);
      this.set('load', false);

    });


  },

  actions: {

    store(myrecp) {
      this.recipes = myrecp;
      this.set('resultset', this.recipes);

      // (this.anrf);
    },
    callfromsearch(recipes) {
      this.set('load', true);
      this.set('queried', recipes);
      Ember.$.ajax({
        url: 'https://api.edamam.com/api/recipes/v2',
        type: 'GET',
        dataType: 'json',
        data: {
          type: 'public',
          q: recipes,
          app_id: ENV.APP_ID,
          app_key: ENV.APP_KEY

        }

      }).then((response) => {

        this.send('store', response);
        this.set('load', false);

      });
    },
    viewcards(cardId) {
      this.transitionToRoute('recipedetails', {queryParams: {recipeId: cardId}})
    },
    redirctToSavedRecipe() {
      ("hello");
      this.transitionToRoute('savedrecipe');
    },
    applyfilter(obj) {
      this.set('load', true);
      Ember.$.ajax({
        url: 'https://api.edamam.com/api/recipes/v2',
        type: 'GET',
        dataType: 'json',
        data: obj

      }).then((response) => {

        this.send('store', response);
        this.set('load', false);

      });

    },
    callplaylist() {
      ("play list called");
      this.transitionToRoute('playlist');
    },
    nextpage() {
      const link = this.resultset._links.next.href;

      this.previouslinks.push(this.resultset);

      this.set('load', true);

      Ember.$.ajax({
        url: link,
        type: 'GET',
        dataType: 'json',


      }).then((response) => {

        this.send('store', response);
        this.set('load', false);

      });
    },
    prevpage() {
      if (this.previouslinks.length > 0) {

        this.set('load', true);
        const val = this.previouslinks.pop();
        const self = this;
        setTimeout(function () {

          self.set('resultset', val);
          self.set('load', false);

        }, 3000)


      }
    }


  }
});

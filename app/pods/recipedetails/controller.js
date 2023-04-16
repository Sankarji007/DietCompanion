import Controller from '@ember/controller';
import Ember from 'ember';
import ENV from 'college-project/config/environment';
// import SocialShare from 'social-share.js'; 
export default Controller.extend({
    queryParams: ['recipeId'],
    resultset: null,
    load: true,

    init() {
        this._super(...arguments);
        this.nutrician;
        this.emailaddress;
        this.recipeid;
        this.html;
    },
    callrecipe(recipeId) {

        Ember.$.ajax({
            url: `https://api.edamam.com/api/recipes/v2/${recipeId}/`,
            type: 'GET',
            dataType: 'json',
            data: {

                type: 'public',

                app_id: ENV.APP_ID,
                app_key: ENV.APP_KEY

            }

        }).then((response) => {
            console.log(response);
            this.send('store', response);

        });

    },
    actions: {
        store(value) {
            this.set('resultset', value);
            this.html = "'"+value.recipe.label+"' "+" Hi, I have request you prepare this meal by  using this Ingredients this will maintain my diet ->   ";
            let k=0;
            let ingredient=value.recipe.ingredientLines.map(item=>{
                k++;
                return (`\n(${k})`)+item;
            });
            this.html +="\n"+ingredient;
            this.set('load', false);
            this.send('parse');

        },
        backbutton() {
            this.transitionToRoute('dashboard');
        },
        saveRecipe() {
            var mail = this.emailaddress;
            var recipe = this.recipeid;
            var card = this.get('resultset');
            const myJSON = JSON.stringify(card);
            Ember.$.ajax({
                url: 'http://localhost:8543/backend/SaveRecipe',
                type: 'POST',
                dataType: 'json',
                data: {
                    carddata: myJSON,
                    email: mail,
                    recipe_id: recipe,
                    url:card.recipe.image

                }

            }).then((response) => {

                alert(response.success);

            });
            
        },
        parse() {

            var self = this;

            var kk = [];
            var obj = self.resultset.recipe.totalNutrients;
            for (var i in obj) {
                kk.push(obj[i]);
            }
            self.set('nutrician', kk);
            

        },
        savedcolletion() {
            this.transitionToRoute('savedrecipe');
        },
        HomePage()
        {
            this.transitionToRoute('dashboard');
        }
    }


});

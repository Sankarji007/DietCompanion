import Controller from '@ember/controller';

import Ember from 'ember';
import ENV from 'college-project/config/environment';
import { inject as service } from '@ember/service';

export default Controller.extend({
    cookies: service(),
    resultset:null,
    emailaddress:null,
    init() {
        this._super(...arguments);
        this.recipes;
        this.queried="noodles";
        // let obj={};
        // obj.type='public';
        // obj.app_id=ENV.APP_ID;
        // obj.app_key=ENV.APP_KEY;
        // obj["nutrients[CA]"]=30;
        this.load=true;
        Ember.$.ajax({
                url:'https://api.edamam.com/api/recipes/v2',
                type:'GET',
                dataType:'json',
                data:{
                    type:'public',
                    q:'noodles',
                    app_id:ENV.APP_ID,
                    app_key:ENV.APP_KEY
                    
                }
               
            }).then((response)=>{
               
               this.send('store',response);
               this.set('load',false);
             
            });
        
        
        
    },
    
    actions: {
        
        store(myrecp)
        {
            this.recipes=myrecp;
            this.set('resultset',this.recipes);
            
            // console.log(this.anrf);
        },
        callfromsearch(recipes)
        {
            this.set('load',true);
            this.set('queried',recipes);
            Ember.$.ajax({
                url:'https://api.edamam.com/api/recipes/v2',
                type:'GET',
                dataType:'json',
                data:{
                    type:'public',
                    q:recipes,
                    app_id:ENV.APP_ID,
                    app_key:ENV.APP_KEY
                    
                }
               
            }).then((response)=>{
                
               this.send('store',response);
               this.set('load',false);

            });
        },
        viewcards(cardId)
        {
            this.transitionToRoute('recipedetails',{queryParams:{recipeId:cardId}})
        },
        redirctToSavedRecipe()
        {
            console.log("hello");
            this.transitionToRoute('savedrecipe');
        },
        applyfilter(obj)
        {
            this.set('load',true);
            Ember.$.ajax({
                url:'https://api.edamam.com/api/recipes/v2',
                type:'GET',
                dataType:'json',
                data:obj
               
            }).then((response)=>{
                
               this.send('store',response);
               this.set('load',false);

            });
            
        },
        callplaylist()
        {
            console.log("play list called");
            this.transitionToRoute('playlist');
        }


    }
});

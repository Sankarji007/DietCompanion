import Component from '@ember/component';
import Ember from 'ember';
export default Component.extend({
    init() {
        this._super(...arguments);
        this.result=this.result||"";
        this.callcard=this.viewcards||"";
        this.calories;
        this.send('modcalories',this.result.recipe.calories);
        this.isdelete=this.isdelete||false;
        this.email=this.email||null;
        this.reload=this.reload||null;
    },
    actions: {
        redirectToDetails(url)
        {
            const myArray = url.split("#");
            const query=myArray[1];
            this.callcard(query);
        },
        modcalories(amt)
        {
            
            this.calories=amt.toFixed(2);
        },
        submit(uri)
        {
            let email=this.email;
            console.log(email);
            console.log(uri);
            const myArray = uri.split("#");
            const query=myArray[1];
            Ember.$.ajax({
                url:'http://localhost:8543/Recipemanagement/deleteSavedRecipe',
                type:'POST',
                dataType:'json',
                data:{
                    email:email,
                    recipe_id:query
                }
            }).then((response)=>{
                console.log(response);
                this.reload(email);
            })
        }

    }
});

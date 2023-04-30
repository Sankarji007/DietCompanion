import Controller from '@ember/controller';
import Ember from 'ember';
export default Controller.extend({
    init()
    {
        this._super(...arguments);
        this.emailaddress;
        this.result;
       
    },
    actions:
    {
        savedcolletion() {
            this.transitionToRoute('savedrecipe');
        },
        HomePage()
        {
            this.transitionToRoute('dashboard');
        },
        GetDetailedResponse()
        {
            Ember.$.ajax({
                url:'http://localhost:8543/Recipemanagement/getPlayList',
                type:'POST',
                dataType:'json',
               
               
            }).then((response)=>{
               
                this.send('store',response);
             
            });
            
        },
        store(response)
        {
            this.set('result',response);
            let local=this.result;
            (local);
        },
        viewcards(cardId)
        {
            this.transitionToRoute('recipedetails',{queryParams:{recipeId:cardId}})
        }
    }
});

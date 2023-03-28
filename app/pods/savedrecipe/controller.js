import Controller from '@ember/controller';
import Ember from 'ember';
import ENV from 'college-project/config/environment';
export default Controller.extend({
    resultset:null,
    
    init() {
        this._super(...arguments);
        this.emailaddress;
        this.carddetails;
        this.shownothing;
    },
    actions: {
        getSavedRecipe(email)
        {
            console.log(email);
           
            if(email)
            {
                Ember.$.ajax({
                    url:'http://localhost:8543/backend/getSavedRecipe',
                    type:'POST',
                    dataType:'json',
                    data:{
                        email:email
                    }
                }).then((Response)=>
                {
                    //this.resultset=Response;
                    this.send('myfunc',Response);
                });
               
            }
            
        },
        myfunc(Response)
        {
            this.set('resultset',Response);
            if(Response.ResultSet.length==0)
            {
                this.set('shownothing',true);
            }
            // console.log(this.get('resultset'));
            // const res=Response;
            // this.send('getcards');
            
        },
        viewcards(cardId)
        {
            this.transitionToRoute('recipedetails',{queryParams:{recipeId:cardId}})
        },
        HomePage()
        {
            this.transitionToRoute('dashboard');
        }
    }
});

import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    actions: {
        submit()
        {
            let username=document.getElementById('form3Example1c').value;
            let email=document.getElementById('form3Example3c').value;
            let pass=document.getElementById('form3Example4c').value;
            let confirmpass=document.getElementById('form3Example4cd').value;
            if(pass===confirmpass)
            {
                Ember.$.ajax({
                    url:'http://localhost:8543/backend/signup',
                    type:'POST',
                    dataType:'json',
                    data:{
                        username:username,
                        email:email,
                        password:pass,

                    }
                }).then((response)=>{
                   
                  alert(response.success);
                });

            }
            else{
                alert('password and confirm password must be same ');
            }
            
        },
        gotosignin()
        {
            this.transitionToRoute('index');
        }
    }
});
//app id:939601ad;
//secret key:fa974454e824554d39df4ebe0bde8086
//https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=939601ad&app_key=%20fa974454e824554d39df4ebe0bde8086
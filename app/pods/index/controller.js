import Controller from '@ember/controller';
// import Cookies from 'js-cookie';
import Ember from 'ember';
import { inject as service } from '@ember/service';
export default Controller.extend({
    cookies: service(),
    email: null,
    session: { login: null },
    actions:
    {
        submit() {

            this.email = document.getElementById('form1Example1').value;
            let pass = document.getElementById('form1Example2').value;


            Ember.$.ajax({
                url: 'http://localhost:8543/backend/SignIn',
                type: 'POST',
                dataType: 'json',
                data: {
                    email: this.get('email'),
                    password: pass
                }
             }).then((response) => {

                if (response.success === "login successfully") {
                    
                    // Cookies.set('login',this.email);
                    
                    let cookieService = this.get('cookies');
                    cookieService.write('login', this.email);

                    let cookies = cookieService.read();
                    console.log(cookies);
                    this.transitionToRoute('dashboard');
                    // this.set('session.login', this.email);
                }
                else {
                    alert(response.success);
                }
            });




        },
        callsignup() {
            this.transitionToRoute('signup');
        }
    }
});

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
    cookies: service(),
    email:null,
    beforeModel(transition,controller) {
        let cookieService = this.get('cookies');
        let cookies = cookieService.read();
        this.set('email',cookies.login);
        if(this.email==null)
        {
            this.transitionTo('index');
        }
        
    },
    setupController(controller, model) {
       
        controller.set('emailaddress', this.email);
        controller.send('getSavedRecipe',this.email);
      }
});

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
        else
        {
            this.transitionTo('dashboard');
        }
        
    },
    setupController(controller, model) {
        // Call _super for default behavior
        this._super(controller, model);
    
        // Set a variable on controller
        controller.set('emailaddress', this.email);
      }
    
    
});

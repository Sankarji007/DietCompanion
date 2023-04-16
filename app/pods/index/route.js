import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
    cookies: service(),
    email:null,
    beforeModel(transition, controller) {
        let cookieService = this.get('cookies');
        let cookies = cookieService.read();
        console.log(cookies);
        this.set('email',cookies.login);
        if(this.email!=null)
        {
            this.transitionTo('dashboard');
        }

    }
});

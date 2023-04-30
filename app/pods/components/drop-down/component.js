import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    cookies: service(),
    init() {
        this._super(...arguments);
        this.email=this.email||"";
        this.callsave=this.callsave||"";
    },
    actions: {
        callme()
        {
            ("hello");
            this.callsave();
        },
        logout()
        {
            let cookieService = this.get('cookies');
            cookieService.clear('login');
            window.location.reload();
        }
    }
});

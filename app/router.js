import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('signup',{path:'/signup'});
  this.route('dashboard',{path:'/dashboard'});
  this.route('recipedetails',{path:'/recipedetails'});
  this.route('savedrecipe',{path:'/savedrecipe'});
  this.route('playlist');
});

export default Router;

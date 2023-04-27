import Component from '@ember/component';
import Ember from 'ember'
import ENV from 'college-project/config/environment';

export default Component.extend({
    
    init() {
        this._super(...arguments);
        this.callmethod=this.callit||null;
        this.email=this.email||"";
        this.callsave=this.callsave||"";
        this.searchTerm="noodles"
        this.suggesionlist;
        this.homepage=this.homepage||null;
   
    },
    actions:
    {
        callthesearch()
        {
            let searchtext=document.getElementById('searchtext').value;
            this.callmethod(searchtext);
        },
        print()
        {
            
            let searchtext=document.getElementById('searchtext').value;
            Ember.$.ajax({
               url:`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchtext}`,
               type:'GET',
                dataType:'json', 
            }).then((response)=>{
               this.send('store',response);
             });
        },
        setterm(value)
        {
            this.set('searchTerm',value)
        },
        store(value)
        {
            this.set('suggesionlist',value);
            console.log(this.suggesionlist);
        },
        filter()
        {   let searchtext=document.getElementById('searchtext').value;
            let Calories=document.getElementById('Calories').value;
            let Cooking=document.getElementById('Cooking').value;
            let diet=document.getElementById('diet').value;
            let dishtype=document.getElementById('dishtype').value;
            let calcium=document.getElementById('calcium').value;
            let Carbohydrate=document.getElementById('Carbohydrate').value;
            let Cholesterol=document.getElementById('Cholesterol').value;
            let Energy=document.getElementById('Energy').value;
            let Iron=document.getElementById('Iron').value;
            let Fiber=document.getElementById('Fiber').value;
            let Folic=document.getElementById('Folic').value;
            let Potassium=document.getElementById('Potassium').value;
            let Magnesium=document.getElementById('Magnesium').value;
            let Protein=document.getElementById('Protein').value;
            let obj={};
            if(searchtext)
            {
                obj.q=searchtext;
                
            }
            obj.type='public';
            obj.app_id=ENV.APP_ID;
            obj.app_key=ENV.APP_KEY;
            if(Calories)
                obj.calories=Calories;
            if(isNaN(Cooking))
                obj.time=Cooking;
            if(diet)
                obj.diet=diet;
            if(dishtype)
                obj.dishType=dishtype;
            if(isNaN(calcium))
                obj["nutrients[CA]"]=calcium;
            if(isNaN(Carbohydrate))
                obj["nutrients[CHOCDF]"]=Carbohydrate;
            if(isNaN(Cholesterol))
                obj["nutrients[CHOLE]"]=Cholesterol;
            if(isNaN(Energy))
                obj["nutrients[ENERC_KCAL]"]=Energy;
            if(isNaN(Iron))
                obj["nutrients[FE]"]=Iron;
            if(isNaN(Fiber))
                obj["nutrients[FIBTG]"]=Fiber;
            if(isNaN(Folic))
                obj["nutrients[FOLAC]"]=Folic;
            if(isNaN(Potassium))
                obj["nutrients[K]"]=Potassium;
            if(isNaN(Magnesium))
                obj["nutrients[MG]"]=Magnesium;
            if(isNaN(Protein))
                obj["nutrients[PROCNT]"]=Protein;
            this.applyfilter(obj);
        },
        CallHomePage()
        {
            if(this.homepage!=null)
            {
                console.log("hello")
            this.homepage();
            }
            
        },
        CallPlaylist()
        {
            this.sendAction('playlist');
           
        }
    }
});

import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    resultset: null,
    selectedValues: [],
    init() {
        this._super(...arguments);
        this.emailaddress;
        this.carddetails;
        this.shownothing;
        this.checkbox = false;

    },

    actions: {
        getSavedRecipe(email) {
            (email);

            if (email != null) {
                Ember.$.ajax({
                    url: 'http://localhost:8543/Recipemanagement/getSavedRecipe',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        email: email
                    }
                }).then((Response) => {
                    //this.resultset=Response;
                    this.send('myfunc', Response);
                });

            }

        },
        myfunc(Response) {
            this.set('resultset', Response);
            if (Response.ResultSet.length == 0) {
                this.set('shownothing', true);
            }
            // (this.get('resultset'));
            // const res=Response;
            // this.send('getcards');

        },
        viewcards(cardId) {
            this.transitionToRoute('recipedetails', { queryParams: { recipeId: cardId } })
        },
        HomePage() {
            this.transitionToRoute('dashboard');
        },
        showcheckbox() {
            this.set('checkbox', true);
            (this.checkbox);

        },
        getPlaylistIds() {
            var selectedColors = []; // Create an empty array to store selected values
            var checkboxes = document.getElementsByName("Checkbox"); // Get all checkboxes with the name "color"
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) { // If checkbox is checked
                    let spliter = checkboxes[i].value;
                    let arr = spliter.split("#");
                    selectedColors.push(arr[1]); // Add the value to the array
                }
            }
            (selectedColors);
            const result = selectedColors.join(",");
            let email = this.emailaddress;
            
            const userInput = window.prompt('Please enter your Playlist Name:', '');
            
            Ember.$.ajax({
                url: 'http://localhost:8543/Recipemanagement/SavePlayList',
                type: 'POST',
                dataType: 'json',
                data: {
                    email: email,
                    recipeId: result,
                    playlistname: userInput
                }
            }).then((Response) => {
                (Response);
            });
            this.set('checkbox', false);

        },
        callplaylist()
        {
            ("play list called");
            this.transitionToRoute('playlist');
        }

    }
});

import { LightningElement, track } from 'lwc';
import getRandomUser from '@salesforce/apex/PokemonController.getRandomUser';

export default class Pokimoncontroller extends LightningElement {
     @track user;

    connectedCallback() {
        this.loadUser();
    }

    loadUser() {
        getRandomUser()
            .then((data) => {
                this.user = data.results[0]; // API returns an array
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }
}
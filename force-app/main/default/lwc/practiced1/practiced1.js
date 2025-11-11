import { LightningElement } from 'lwc';


export default class Practiced1 extends LightningElement {
      firstName = '';
    lastName = '';
    email = '';
    phone = '';

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }
    
    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleSubmit() {
        console.log('First Name: ' + this.firstName);
        console.log('Last Name: ' + this.lastName);
        console.log('Email: ' + this.email);
        console.log('Phone: ' + this.phone);
    }

}
import { LightningElement } from 'lwc';
import createAccountRecord from '@salesforce/apex/AccountFormController.createAccountRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Task2 extends LightningElement {
      accountName = '';
    accountNumber = '';
    billingAddress = '';
    description = '';

    handleAccountNameChange(event) { this.accountName = event.target.value; }
    handleAccountNumberChange(event) { this.accountNumber = event.target.value; }
    handleBillingAddressChange(event) { this.billingAddress = event.target.value; }
    handleDescriptionChange(event) { this.description = event.target.value; }

    handleSubmit() {
        createAccountRecord({
            accountName: this.accountName,
            accountNumber: this.accountNumber,
            billingAddress: this.billingAddress,
            description: this.description
        })
        .then(result => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Account created successfully! Record Id: ' + result,
                variant: 'success'
            }));
        })
        .catch(error => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
            }));
        });
    }
}
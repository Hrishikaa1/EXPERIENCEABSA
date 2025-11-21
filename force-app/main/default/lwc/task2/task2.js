import { LightningElement, track } from 'lwc';
import insertAccount from '@salesforce/apex/AccountController.insertAccount';
import updateAccount from '@salesforce/apex/AccountController.updateAccount';

export default class Task2 extends LightningElement {
    @track accountName = '';
    @track accountNumber = '';
    @track billingAddress = '';
    @track description = '';
    @track message = '';
    @track messageClass = '';
    @track accountId = null;

    handleNameChange(event) {
        this.accountName = event.target.value;
    }

    handleNumberChange(event) {
        this.accountNumber = event.target.value;
    }

    handleAddressChange(event) {
        this.billingAddress = event.target.value;
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }

    handleSubmit() {
        // Validation
        if (!this.accountName || this.accountName.length < 4 || this.accountName.length > 15) {
            this.showMessage('Account Name must be between 4 and 15 characters', 'error');
            return;
        }

        if (this.accountNumber && this.accountNumber.toString().length > 5) {
            this.showMessage('Account Number cannot exceed 5 digits', 'error');
            return;
        }

        const accountData = {
            Name: this.accountName,
            AccountNumber: this.accountNumber,
            BillingStreet: this.billingAddress,
            Description: this.description
        };

        if (this.accountId) {
            accountData.Id = this.accountId;
            this.updateAccountRecord(accountData);
        } else {
            this.insertAccountRecord(accountData);
        }
    }

    insertAccountRecord(accountData) {
        insertAccount({ accData: accountData })
            .then(result => {
                this.accountId = result;
                this.showMessage('Account created successfully!', 'success');
            })
            .catch(error => {
                this.showMessage('Error creating account: ' + error.body.message, 'error');
            });
    }

    updateAccountRecord(accountData) {
        updateAccount({ accData: accountData })
            .then(() => {
                this.showMessage('Account updated successfully!', 'success');
            })
            .catch(error => {
                this.showMessage('Error updating account: ' + error.body.message, 'error');
            });
    }

    handleClear() {
        this.accountName = '';
        this.accountNumber = '';
        this.billingAddress = '';
        this.description = '';
        this.message = '';
        this.accountId = null;
    }

    showMessage(msg, type) {
        this.message = msg;
        this.messageClass = type === 'success' ? 'slds-text-color_success' : 'slds-text-color_error';
    }
}